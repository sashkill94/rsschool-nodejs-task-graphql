import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { schema } from './schemas/schema.js'
import DataLoader from "dataloader";
import { memberTypeLoader, postsLoader, profileLoader, userLoader } from './dataloaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {

  const { prisma } = fastify;
  const dataLoaders = {
    userLoader: userLoader(prisma),
    postsLoader: postsLoader(prisma),
    profileLoader: profileLoader(prisma),
    memberTypeLoader: memberTypeLoader(prisma),
  };

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const result  = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: {
          fastify,
          dataLoaders
        },
      });

      return result;
    },
  });
};

export default plugin;
