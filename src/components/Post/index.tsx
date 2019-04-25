import React from 'react';
import { Query } from 'react-apollo';
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import { Grid, Icon } from 'semantic-ui-react';
import PostCard from './Card';
import Loader from '../Common/Loader';
type Props = {

}

type State = {
    title: string
}

const FETCH_POSTS = gql`
{
    posts {
      title
      body
      file
      id
      createdAt
      user {
        email
        name
        id
      }
    }
  }
`;

interface data {
    posts: Array<{title: string, body: string, file: string, createdAt: string}>
}

interface post {
    title: string,
    body: string,
    file: string,
    createdAt: string,
}

interface results {
    data: data;
    error?: ApolloError;
    loading: boolean;
}
export default class Post extends React.Component<Props, State> {
    state: State = {
        title: ''
    }

    render() {
        return (
            <Query query={FETCH_POSTS}>
                {({loading, error, data}: results) => {
                    if (loading) return <div className="ui center aligned loading"><Loader /></div>;
                    if (error) return <p>Error :(</p>;
                    
                    
                    return (
                        <div className="main-content posts ">
                            <Grid  columns={3} stackable>                               
                                <Grid.Row>
                                {data.posts.map((post: post, index: number) => (
                                    <Grid.Column key={post.title + index}>
                                        <PostCard {...post} />
                                    </Grid.Column>                               
                                ))} 
                                {data.posts.length < 1 && (
                                    <div className="ui center aligned fs-23 mt-15">
                                      No content found
                                       &nbsp;<a className="ui underlined  grey rounded mt-15 fs-23" href="/post">
                                      <Icon name='plus circle' /> Add post
                                    </a>
                                    </div>
                                   
                                )}
                                </Grid.Row>
                            </Grid>
                        </div>                        
                    )
                    
                }}
            </Query>
        )
    }
}