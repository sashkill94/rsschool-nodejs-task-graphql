import { PrismaClient } from "@prisma/client";
import DataLoader from 'dataloader';
import { Loader, MemberType, Post, Profile, User } from "./types/types.js";

export const profileLoader = (prisma: PrismaClient): Loader => {
  return new DataLoader<string, Profile | undefined>(async (ids: readonly string[]) => {
    const result = await prisma.profile.findMany({
      where: { userId: { in: ids as string[] | undefined } },
    });
    return ids.map((id) => result.find((x) => x.userId === id));
  });
};

export const postsLoader = (prisma: PrismaClient): Loader => {
  return new DataLoader<string, Post[] | undefined>(async (ids: readonly string[]) => {
    const postsByIds = await prisma.post.findMany({
      where: { authorId: { in: ids as string[] | undefined } },
    });

    const postsByAuthorId = new Map<string, Post[]>();
    const sortedByIds: Array<Post[] | undefined> = [];

    postsByIds.forEach((post) => {
      const authorPosts = postsByAuthorId.get(post.authorId) || [];
      authorPosts.push(post);
      postsByAuthorId.set(post.authorId, authorPosts);
    });

    ids.forEach((id) => {
      sortedByIds.push(postsByAuthorId.get(id));
    });

    return sortedByIds;
  });
};

export const memberTypeLoader = (prisma: PrismaClient): Loader => {
  return new DataLoader<string, MemberType | undefined>(async (ids: readonly string[]) => {
    const result = await prisma.memberType.findMany({
      where: { id: { in: ids as string[] | undefined } },
    });
    return ids.map((id) => result.find((x) => x.id === id));
  });
};

export const userLoader = (prisma: PrismaClient): Loader => {
  return new DataLoader<string, User | undefined>(async (ids: readonly string[]) => {
    const usersByIds = await prisma.user.findMany({
      where: { id: { in: ids as string[] } },
      include: { userSubscribedTo: true, subscribedToUser: true },
    });

    const usersById = new Map<string, User>();
    const sortedByIds: Array<User | undefined> = [];

    usersByIds.forEach((user) => {
      usersById.set(user.id, user);
    });

    ids.forEach((id) => {
      sortedByIds.push(usersById.get(id));
    });

    return sortedByIds;
  });
};