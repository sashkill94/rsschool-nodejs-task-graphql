import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { getPostsFromUser } from "../resolvers/posts.resolvers.js";
import { getProfileFromUser } from "../resolvers/profile.resolvers.js";
import { getSubscribedToUser, getUserSubscribedTo } from "../resolvers/user.resolvers.js";
import { UUIDType } from "./uuid.js";

export const memberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: 'basic',
    },
    business: {
      value: 'business',
    },
  },
});

export const MemberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: memberTypeId,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  }),
});

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  }),
})

export const PostsType = new GraphQLList(PostType);

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: memberTypeId
    }
  })
})

export const ProfileTypes = new GraphQLList(ProfileType);

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: ProfileType,
      resolve: getProfileFromUser,
    },
    posts: {
      type: PostsType,
      resolve: getPostsFromUser,
    },
    subscribedToUser: {
      type: UsersType,
      resolve: getSubscribedToUser,
    },
    userSubscribedTo: {
      type: UsersType,
      resolve: getUserSubscribedTo,
    },
  }),
});

export const UsersType = new GraphQLList(UserType);