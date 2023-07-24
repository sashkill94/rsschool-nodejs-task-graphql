import { FastifyInstance } from "fastify";
import DataLoader from 'dataloader';

export type Loader = DataLoader<string, unknown | undefined>;

export interface Loaders {
  userLoader: Loader;
  postsLoader: Loader;
  profileLoader: Loader;
  memberTypeLoader: Loader;
}

export interface Context {
  fastify: FastifyInstance;
  dataLoaders: Loaders;
}

export interface User {
  id: string;
  name: string;
  balance: number;
  userSubscribedTo?: {
    subscriberId: string;
    authorId: string;
  }[];
  subscribedToUser?: {
    subscriberId: string;
    authorId: string;
  }[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export type MemberType = {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
};