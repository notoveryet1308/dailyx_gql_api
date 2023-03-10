import {
    getModelForClass,
    prop,
    pre,
    queryMethod,
    index
  } from '@typegoose/typegoose';
  import { IsEmail, MaxLength, MinLength } from 'class-validator';
  import { Field, InputType, ObjectType, ID } from 'type-graphql';
  import bcrypt from 'bcrypt';
  import { AsQueryMethod, ReturnModelType } from '@typegoose/typegoose/lib/types';
  
  function findByEmail(
    this: ReturnModelType<typeof User, QueryHelpers>,
    email: User['email']
  ) {
    return this.findOne({ email });
  }
  
  interface QueryHelpers {
    findByEmail: AsQueryMethod<typeof findByEmail>;
  }
  
  @pre<User>('save', async function () {
    if (!this.isDirectModified('password')) {
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  })
  @index({ email: 1 })
  @queryMethod(findByEmail)
  @ObjectType()
  export class User {

    @Field(()=> ID)
    _id: string;

    @Field(() => String)
    @prop({ required: true })
    email: string;
  
    @Field(() => String)
    @prop({ required: true })
    password: string;
  
    @Field(() => String, { nullable: true })
    @prop()
    name: string;
  
    @Field(() => String, { nullable: true })
    @prop()
    profession: string;
  
    @Field(() => String, { nullable: true })
    @prop()
    avatar: string;

    @Field(() => [String], { defaultValue:[] })
    @prop()
    teamMember: [string]
  }

  @ObjectType()
  export class AuthPayload {
    @Field(()=> String)
    token: string

    @Field(()=> User)
    user: User
  }
  
  @InputType()
  export class CreateUserInput {

    @IsEmail()
    @Field(() => String)
    email: string;
  
    @MinLength(6, {
      message: 'Password must be at least 6 character long'
    })
    @MaxLength(50, {
      message: 'Password must be not longer than 50 characters'
    })
    @Field(() => String)
    password: string;
  
    @Field(() => String)
    name: string;
  
    @Field(() => String, { nullable: true })
    profession: string;
  
    @Field(() => String, { nullable: true })
    avatar: string;
  }
  
  @InputType()
  export class LoginInput {
    @Field(() => String)
    email: string;
  
    @Field(() => String)
    password: string;
  }
  

  @InputType()
  export class CreateTeamInput {
    @IsEmail()
    @Field(() => String)
    email: string;
  }

  export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);
  