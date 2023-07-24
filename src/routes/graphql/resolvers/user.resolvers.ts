import { GraphQLResolveInfo } from 'graphql';
import {
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
  ResolveTree,
} from 'graphql-parse-resolve-info';
import { Context, User } from '../types/types.js';

export const getUser = async (
  parent: unknown,
  args: User,
  { dataLoaders: dataLoaders }: Context,
): Promise<unknown> => {
  const { id } = args;
  return await dataLoaders.userLoader.load(id);
};

export const getUsers = async (
  parent: unknown,
  args: unknown,
  { fastify, dataLoaders: loaders }: Context,
  info: GraphQLResolveInfo,
): Promise<User[]> => {
  const parsedInfo = parseResolveInfo(info);
  const { fields } = simplifyParsedResolveInfoFragmentWithType(
    parsedInfo as ResolveTree,
    info.returnType,
  );
  const users = await fastify.prisma.user.findMany({
    include: {
      userSubscribedTo: 'userSubscribedTo' in fields,
      subscribedToUser: 'subscribedToUser' in fields,
    },
  });
  console.log('GET USERS', loaders);

  users.forEach((user) => {
    loaders.userLoader.prime(user.id, user);
    console.log(user);
  });

  return users;
};

export const getSubscribedToUser = async (
  parent: User,
  args: unknown,
  { dataLoaders }: Context,
  info: GraphQLResolveInfo,
) => {
  const { userSubscribedTo } = parent;
  if (Array.isArray(userSubscribedTo) && userSubscribedTo.length > 0) {
    return await dataLoaders.userLoader.loadMany(
      userSubscribedTo.map((user) => user.authorId),
    );
  }
  return [];
};

export const getUserSubscribedTo = async (
  parent: User,
  args: unknown,
  { dataLoaders }: Context,
  info: GraphQLResolveInfo,
) => {
  const { subscribedToUser } = parent;
  if (Array.isArray(subscribedToUser) && subscribedToUser.length > 0) {
    return await dataLoaders.userLoader.loadMany(
      subscribedToUser.map((user) => user.subscriberId),
    );
  }
  return [];
};
