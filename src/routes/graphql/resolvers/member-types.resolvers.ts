import { MemberType } from "@prisma/client";
import { FastifyInstance } from "fastify";

export const getMemberTypes = async (
  parent: unknown,
  args: unknown,
  fastify: FastifyInstance,
): Promise<MemberType[]> => {
  const types =  await fastify.prisma.memberType.findMany();
  console.log(types)
  return await fastify.prisma.memberType.findMany();
};

export const getMemberType = async (parent: unknown,
  args: { id: string },
  fastify: FastifyInstance,
): Promise<MemberType | null> => {
  const { id } = args;
  return await fastify.prisma.memberType.findUnique({
    where: {
      id,
    },
  });
};