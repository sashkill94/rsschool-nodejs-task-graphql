import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './schemas/schema.js'
import { memberTypeLoader, postsLoader, profileLoader, userLoader } from './dataloaders.js';
import depthLimit from 'graphql-depth-limit';

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

    async preHandler(req, res) {
      const errors = validate(schema, parse(req.body.query), [depthLimit(5)]);
      if (errors.length > 0) {
        await res.send({ errors });
      }
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
