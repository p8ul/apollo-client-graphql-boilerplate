import React from 'react';
import { Query } from 'react-apollo';
import { ApolloClient, ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import { async } from 'q';

type Props = {

}

type State = {
    title: string;
    body: string;
    id: number | null
}

const ADD_POST = gql`
mutation AddPost($title: String!, $body: String!) {
    addPost(title: $title, body: $body) {
      title, id, body
    }
  }
`;

interface post {
   title: string,
   body: string, 
   id: number
}

interface results {
    data: post
    error?: ApolloError
    loading: boolean
}

interface data {
    variables: {
        title: string,
        body: string,
        id: number,
    }
}

export default class PostForm extends React.Component<Props, State> {
    state: State = {
        title: '',
        body: '',
        id: null,
    }

    // onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } event.target;
    //     this.setState({ [name]: value})
    // }

    onSubmit = async (event: React.FormEvent, addPost: (data: data) => any) => {

    }
}