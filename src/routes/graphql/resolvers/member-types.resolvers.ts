import { MemberType, Profile } from "@prisma/client";
import { Context } from "../types/types.js";

export const getMemberTypes = async (
  parent: unknown,
  args: unknown,
  { fastify }: Context,
): Promise<MemberType[]> => {
  const types =  await fastify.prisma.memberType.findMany();
  console.log(types)
  return await fastify.prisma.memberType.findMany();
};

export const getMemberType = async (parent: unknown,
  args: { id: string },
  { fastify }: Context,
): Promise<MemberType | null> => {
  const { id } = args;
  return await fastify.prisma.memberType.findUnique({
    where: {
      id,
    },
  });
};

export const findMemberTypeByProfile =  async (
  parent: Profile,
  args: unknown,
  { dataLoaders }: Context,
) => {
  const id: string = parent.memberTypeId;
  return await dataLoaders.memberTypeLoader.load(id);
}