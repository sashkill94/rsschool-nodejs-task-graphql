import {
  MemberTypeType,
  memberTypeId,
  PostsType,
  PostType,
  ProfileTypes as ProfilesType,
  ProfileType,
  UsersType,
  UserType,
} from '../types/types.graphql.js';
import { getMemberType, getMemberTypes } from '../resolvers/member-types.resolvers.js';
import { GraphQLList, GraphQLObjectType } from 'graphql';
import { getPostByID, getPosts } from '../resolvers/posts.resolvers.js';
import { UUIDType } from '../types/uuid.js';
import { getProfileByID, getProfiles } from '../resolvers/profile.resolvers.js';
import { getUser as getUserById, getUsers } from '../resolvers/user.resolvers.js';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberTypeType),
      resolve: getMemberTypes,
    },
    memberType: {
      type: MemberTypeType,
      args: {
        id: { type: memberTypeId },
      },
      resolve: getMemberType,
    },
    posts: {
      type: PostsType,
      resolve: getPosts,
    },
    post: {
      type: PostType,
      args: {
        id: { type: UUIDType },
      },
      resolve: getPostByID,
    },
    profiles: {
      type: ProfilesType,
      resolve: getProfiles,
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: UUIDType },
      },
      resolve: getProfileByID,
    },
    users: {
      type: UsersType,
      resolve: getUsers,
    },
    user: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: UserType,
      args: { id: { type: UUIDType } },
      resolve: getUserById,
    },
  },
});
