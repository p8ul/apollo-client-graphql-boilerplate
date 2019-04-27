// eslint-disable-next-line
import { ApolloError } from "apollo-client";

export type Props = {
    history: {
      push: (name: string) => any;
    };
  };

export interface data {
  posts: Array<post>;
}

export interface post {
  title: string;
  body: string;
  file: string;
  createdAt: string;
}

export interface results {
  data: data;
  error?: ApolloError;
  loading: boolean;
  subscribeToMore?: ()=> any
}