import {types} from './Types';
import {Mutation}     from './Mutations';
import {Query}        from './Querys';

export const resolvers = {
  Mutation,
  Query,
  ...types
};