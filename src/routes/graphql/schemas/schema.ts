import { GraphQLSchema } from "graphql";
import { query } from "../query/query.js";

export const schema = new GraphQLSchema({
  query
});