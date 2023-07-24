import { Profile } from "@prisma/client";
import { FastifyInstance } from "fastify";

export const getProfileByID = async (
  parent: unknown,
  args: { id: string },
  fastify: FastifyInstance,
): Promise<Profile | null> => {
  const { id } = args;
  return await fastify.prisma.profile.findUnique({
    where: {
      id,
    },
  });
};

export const getProfiles = async (
  parent: unknown,
  args: unknown,
  fastify: FastifyInstance,
): Promise<Profile[]> => {
  return await fastify.prisma.profile.findMany();
};