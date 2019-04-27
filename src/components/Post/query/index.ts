import gql from 'graphql-tag';

export const FETCH_POSTS = gql`
  query Posts($cursor: String){
    posts(cursor: $cursor) {
      endCursor
      edges {
        id
        title
        body
        file
        createdAt
        user {
          name
          id
        }
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($title: String!, $body: String!, $file: String) {
    addPost(title: $title, body: $body, file: $file) {
      title
      id
      body
      file
    }
  }
`;

export const POST_ADDED = gql`
subscription {
  posts {
    edges {
      id
      title
      body
      file
      createdAt
      user {
        name
        id
      }
    }
    endCursor
  }
}

`;