import fetch from 'node-fetch';
import ogs from 'open-graph-scraper';
import { ApolloError } from 'apollo-server';
import {
  BookmarkModel,
  UpdateBookmarkInput,
  GenerateLinkPreviewData,
  GenerateLinkData
} from '../schema/bookmark.schema';
import { ContextType } from '../type/context';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

export const securedUrlRegex = (value: string) => {
  const regex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  return regex.test(value);
};

const mapOpenGraphResultToMetaData = (
  document: Document,
  url: string
): GenerateLinkData => {
  let ogUrl = url,
    ogTitle = null,
    ogDescription = null,
    ogType = null,
    ogSiteName = null,
    ogIcon = null,
    ogImg = null;

  ogDescription = document.querySelector('meta[property="og:description"]');
  ogTitle = document.querySelector('meta[property="og:title"]');
  ogType = document.querySelector('meta[property="og:type"]');
  ogSiteName = document.querySelector('meta[property="og:site_name"]');
  ogImg = document.querySelector('meta[property="og:image"]');
  ogIcon = document.querySelector('link[rel="icon"]');

  ogDescription = ogDescription && ogDescription.getAttribute('content');
  ogTitle = ogTitle && ogTitle.getAttribute('content');
  ogType = ogType && ogType.getAttribute('content');
  ogSiteName = ogSiteName && ogSiteName.getAttribute('content');
  ogImg = ogImg && ogImg.getAttribute('content');
  ogIcon = ogIcon && ogIcon.getAttribute('href');

  if (!ogTitle && document.querySelector('meta[name="title"]')) {
    ogTitle = document
      .querySelector('meta[name="title"]')
      .getAttribute('content');
  }
  if (!ogTitle && document.querySelector('title')) {
    ogTitle = document.querySelector('title').textContent;
  }
  if (!ogDescription && document.querySelector('meta[name="description"]')) {
    ogDescription = document
      .querySelector('meta[name="description"]')
      .getAttribute('content');
  }
  if (!ogDescription && document.querySelector('description')) {
    ogDescription = document.querySelector('description').textContent;
  }

  if (ogImg && !securedUrlRegex(ogImg)) {
    const newUrl = new URL(ogUrl);
    ogImg = `${newUrl.protocol}//${newUrl.hostname}${ogImg}`;
  }

  if (ogIcon && !securedUrlRegex(ogIcon)) {
    const newUrl = new URL(ogUrl);
    ogIcon = `${newUrl.protocol}//${newUrl.hostname}${ogIcon}`;
  }

  return { ogImg, ogUrl, ogTitle, ogDescription, ogType, ogSiteName, ogIcon };
};

const isPreviewAvailable = (data: GenerateLinkData): boolean => {
  let isAvailable = true;

  if (!data.ogDescription && !data.ogTitle) {
    isAvailable = false;
  }
  return isAvailable;
};

const getPreviewData = async (url) => {
  return await fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const dom = new JSDOM(html);
      const previewData = mapOpenGraphResultToMetaData(
        dom.window.document,
        url
      );

      return previewData;
    })
    .catch((error) => {
      console.error('Error fetching the URL:', error);
    });
};

class LinkPreviewDataService {
  async generateLinkPreviewData(
    input: GenerateLinkPreviewData,
    context: ContextType
  ) {
    const user = context.user;
    const previewData = await getPreviewData(input.url);
    const isPreviewDataAvailable = isPreviewAvailable(previewData);
    try {
      if (!user) {
        throw new ApolloError('Action not allowed!!');
      }

      const ogdata = await ogs({ url: input.url });

      const linkPreviewData = await BookmarkModel.create({
        ...previewData,
        ogUrl: input.url,
        id: input.id,
        isPreviewAvailable: isPreviewDataAvailable,
        userId: user._id,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      console.log({ ogdata });

      return linkPreviewData;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  async getLinkPreviewData(context: ContextType) {
    try {
      const user = context.user;
      if (!user) {
        throw new ApolloError('Action not allowed!!');
      }
      const allBookmark = await BookmarkModel.find({ userId: user._id }).sort({
        updatedAt: -1
      });
      return allBookmark;
    } catch (e) {
      throw new ApolloError('Error in getting note data');
    }
  }

  async updateBookmark(bookmark: UpdateBookmarkInput, context: ContextType) {
    const user = context.user;
    try {
      if (!bookmark) {
        return;
      }

      if (!user) {
        throw new ApolloError('Action not allowed');
      }

      let updatedBookmark = await BookmarkModel.findOneAndUpdate(
        { id: bookmark.id },
        { ...bookmark, isPreviewAvailable: true }
      );
      updatedBookmark = await BookmarkModel.findOne({ id: bookmark.id });
      return updatedBookmark;
    } catch (error) {
      throw new ApolloError('Error in updating bookmark data');
    }
  }

  async deleteBookmark(id: string, context: ContextType) {
    try {
      const user = context.user;
      if (!user) {
        throw new ApolloError('Action not allowed!!');
      }
      const deletedBookmark = await BookmarkModel.deleteOne({ id: id });

      return !!deletedBookmark.deletedCount;
    } catch (error) {
      throw new ApolloError('Error in deleting bookmark');
    }
  }
}

export default LinkPreviewDataService;
