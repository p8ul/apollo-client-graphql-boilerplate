import React from 'react';
import {  Card, Icon, Image } from 'semantic-ui-react';

interface Props {
    title: string;
    body: string;
    file: string;
    createdAt: string;
}

const PostCard: React.FunctionComponent<Props> =({title, body, file, createdAt}) => (
    <Card className="posts__card animated fadeIn">
        <div className='posts__card__image animated fadeIn  delayed-2s'>
            <Image src={file || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'} />        
        </div>
        <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
            <span className='date'>{createdAt}</span>
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
        </Card.Content>
    </Card>
)
export default PostCard;