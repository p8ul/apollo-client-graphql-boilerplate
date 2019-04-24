import React from 'react';
import {  Card, Icon, Image } from 'semantic-ui-react';

interface Props {
    title: string;
    body: string;
    createdAt: string;
}

const PostCard: React.FunctionComponent<Props> =({title, body, createdAt}) => (
    <Card className="posts__card">
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
        <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
            <span className='date'>{createdAt}</span>
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
        <a>
            <Icon name='user' />
            22 Friends
        </a>
        </Card.Content>
    </Card>
)
export default PostCard;