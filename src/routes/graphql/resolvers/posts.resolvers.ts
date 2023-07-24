import { Post } from "@prisma/client";
import { FastifyInstance } from "fastify";

export const getPosts = async (
  parent: unknown,
  args: unknown,
  fastify: FastifyInstance,
): Promise<Post[]> => {
  const types =  await fastify.prisma.memberType.findMany();
  console.log(types)
  return await fastify.prisma.post.findMany();
};

export const getPostByID = async (parent: unknown,
  args: { id: string },
  fastify: FastifyInstance,
): Promise<Post | null> => {
  const { id } = args;
  return await fastify.prisma.post.findUnique({
    where: {
      id,
    },
  });
};