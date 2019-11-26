import {Mutation} from './mutations';
import {Query} from './Querys';
import {types} from './Types';

export const resolvers={
	Mutation,
	Query,
	...types
};