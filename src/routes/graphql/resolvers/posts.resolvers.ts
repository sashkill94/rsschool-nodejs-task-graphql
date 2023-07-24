import { Post } from '@prisma/client';
import { Context, User } from '../types/types.js';

export const getPosts = async (
  parent: unknown,
  args: unknown,
  { fastify }: Context,
): Promise<Post[]> => {
  const types = await fastify.prisma.memberType.findMany();
  console.log(types);
  return await fastify.prisma.post.findMany();
};

export const getPostByID = async (
  parent: unknown,
  args: { id: string },
  { fastify }: Context,
): Promise<Post | null> => {
  const { id } = args;
  return await fastify.prisma.post.findUnique({
    where: {
      id,
    },
  });
};

export const getPostsFromUser = async (
  parent: User,
  args: { id: string },
  { dataLoaders }: Context,
) => {
  const { id } = parent;
  return await dataLoaders.postsLoader.load(id);
};
