import { MemberTypeType, memberTypeId } from "../types/types.graphql.js";
import { getMemberType, getMemberTypes } from "../resolvers/member-types.resolvers.js";
import { GraphQLObjectType } from "graphql";

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: MemberTypeType,
      resolve: getMemberTypes,
    },
    memberType: {
      type: MemberTypeType,
      args: {
        id: { type: memberTypeId },
      },
      resolve: getMemberType,
    },
  }
});