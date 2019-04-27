import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import PostCard from "./PostCard";
import Loader from "../Common/Loader";

type Props = {
  posts: Array<post>;
  subscribeToNewPosts: () => any;
  onLoadMore: () => void;
  loading: boolean;
  error: boolean;
  endCursor: number;
};

interface post {
  title: string;
  body: string;
  file: string;
  createdAt: string;
}

export default class PostList extends React.Component<Props> {
  state = {};

  componentDidMount() {
    const { subscribeToNewPosts } = this.props;
    subscribeToNewPosts();
  }

  render() {
    const { posts, onLoadMore, loading, error, endCursor } = this.props;
    return (
      <div className="main-content posts ">
        <Grid columns={3} stackable>
          <Grid.Row>
            {posts.map((post: post, index: number) => (
              // eslint-disable-next-line
              <Grid.Column key={index}>
                <PostCard {...post} />
              </Grid.Column>
            ))}
            {!loading && posts.length < 1 && (
              <div className="ui center aligned fs-23 mt-15">
                No content found &nbsp;
                <a
                  className="ui underlined  grey rounded mt-15 fs-23"
                  href="/post"
                >
                  <Icon name="plus circle" />
                  Add post
                </a>
              </div>
            )}
          </Grid.Row>
        </Grid>
        {!loading && endCursor > 0 && (
          <button
            type="button"
            className="ui button primary"
            onClick={() => onLoadMore()}
          >
            Load More
          </button>
        )}
        {loading && posts.length > 0 && <Loader />}
        {error && <p>Error :(</p>}
      </div>
    );
  }
}
