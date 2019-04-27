import React from "react";
import { Card, Image } from "semantic-ui-react";
// eslint-disable-next-line
import { post } from "./interfaces";

const PostCard: React.FunctionComponent<post> = ({
  title,
  body,
  file,
  createdAt
}) => (
  <Card className="posts__card animated fadeIn">
    <div className="posts__card__image animated fadeIn  delayed-2s">
      <Image
        src={
          file ||
          "https://react.semantic-ui.com/images/avatar/large/matthew.png"
        }
      />
    </div>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>
        <span className="date">{createdAt || "Now"}</span>
      </Card.Meta>
      <Card.Description>{body}</Card.Description>
    </Card.Content>
  </Card>
);
export default PostCard;
