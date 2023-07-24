import { Profile } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { Context, User } from '../types/types.js';

export const getProfileByID = async (
  parent: unknown,
  args: { id: string },
  { fastify }: Context,
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
  { fastify }: Context,
): Promise<Profile[]> => {
  return await fastify.prisma.profile.findMany();
};

export const getProfileFromUser = async (
  parent: User,
  args: unknown,
  { dataLoaders: DataLoaders }: Context,
) => {
  const id: string = parent['id'];
  return await DataLoaders.profileLoader.load(id);
};
