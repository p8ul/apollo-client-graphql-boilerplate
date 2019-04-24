import React, { Component } from 'react';
import { Query } from "react-apollo";
import { ApolloError } from 'apollo-client';
import gql from "graphql-tag";
import logo from './logo.svg';
import './App.css';

interface user {
   name: string;
   id: string;
}
interface data {
  users: 
    Array<{ name: string, id: string }>
  
}
interface results {
  data: data;
  error?: ApolloError;
  loading: boolean;
}
class App extends Component {
  render() {
    return (
      <Query
    query={gql`
    {
      users {
        name
        id
      }
    }
    `}
  >
    {({loading, error, data }: results) => {
      console.warn(data)
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.users.map((user: user ) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ));
    }}
  </Query>
    );
  }
}

export default App;
