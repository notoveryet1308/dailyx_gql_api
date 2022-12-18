import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import path from 'path'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import cors from 'cors';

import { resolvers } from './resolvers';
import { connectToMongoDB } from './utils/mongo';

dotenv.config();

const whitelist =[
  'https://notoveryet1308-sturdy-space-spoon-x99pwp6j4jq369v6.github.dev',
  'https://dailyxtool.netlify.app'
]

async function init() {
  const schema = await buildSchema({
    resolvers
    // authChecker,
  });

  const app = express();

  app.use(cookieParser());

  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      console.log(ctx);
    },
    plugins: [ ApolloServerPluginLandingPageGraphQLPlayground()]
  });

  await server.start();
  server.applyMiddleware({ app });
  
 

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin:  whitelist
    }),
    express.json()
  );

  app.use('/',(req, res)=>{
    res.sendFile(path.join(__dirname, './index.html'))
  })

  app.listen({ port: process.env.PORT }, () => {
    console.log(`App is listening on https://localhost:${process.env.PORT}`);
  });

  connectToMongoDB();
}

init();
