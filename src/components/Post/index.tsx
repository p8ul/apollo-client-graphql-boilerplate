import React from "react";
// eslint-disable-next-line
import { Query, QueryResult, OperationVariables } from "react-apollo";
import PostList from "./PostList";
import { FETCH_POSTS, POST_ADDED } from "./query";
// eslint-disable-next-line
import { Props } from "./interfaces";

interface iResult {
  edges: Array<any>;
  endCursor: number;
}
export default class Post extends React.PureComponent<Props> {
  state = { cursor: "" };

  setCursor = (cursor: string) => {
    this.setState({ cursor });
  };

  render() {
    const { cursor } = this.state;
    return (
      <Query
        query={FETCH_POSTS}
        variables={{ cursor }}
        fetchPolicy="cache-and-network"
      >
        {({
          loading,
          error,
          data,
          subscribeToMore,
          fetchMore,
          ...rest
        }: QueryResult<any, OperationVariables>) => {
          let posts = data ? data.posts : {};
          posts = posts ? posts.edges : [];
          const endCursor = data.posts ? data.posts.endCursor : 0;
          return (
            <div className="">
              <PostList
                error={!!error}
                loading={loading}
                endCursor={endCursor}
                onLoadMore={() => {
                  return fetchMore({
                    variables: {
                      cursor: data.posts.endCursor.toString()
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      const edges = [
                        ...prev.posts.edges,
                        ...fetchMoreResult.posts.edges
                      ];

                      const newData: { posts: any } = {
                        ...prev
                      };
                      newData.posts.edges = edges;
                      newData.posts.endCursor = fetchMoreResult.posts.endCursor;
                      return newData;
                    }
                  });
                }}
                subscribeToNewPosts={() =>
                  subscribeToMore({
                    document: POST_ADDED,
                    variables: {},
                    updateQuery: (
                      prev: { posts: iResult },
                      { subscriptionData }
                    ) => {
                      if (!subscriptionData.data) return prev;
                      const newFeedItem = subscriptionData.data.posts;
                      const edges = [...newFeedItem.edges, ...prev.posts.edges];
                      const newData: { posts: any } = {
                        ...prev
                      };
                      newData.posts.edges = edges;
                      return newData;
                    }
                  })
                }
                {...rest}
                posts={posts || []}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
