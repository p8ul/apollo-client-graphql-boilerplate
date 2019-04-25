import React from 'react';
import { Mutation, MutationFunc } from 'react-apollo';
import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import toastr from 'toastr';
import { Grid } from 'semantic-ui-react';
import Input from '../Common/Input';
import ImageUpload from '../Common/Input/ImageUpload';

import upload from '../../utils/upload';

toastr.options = {
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
}

type Props = {
    history: {
        push: (name: string) => any
      }
}

const ADD_POST = gql`
mutation AddPost($title: String!, $body: String!, $file: String) {
    addPost(title: $title, body: $body, file: $file) {
      title, id, body, file
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

export default class PostForm extends React.Component<Props> {
    state = {
        title: '',
        body: '',
        id: null,
        file: '',
        loading: false,
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    onImageChange = async (file: any) => {
       this.setState({file}); 
    }

    onSubmit = async (event: React.FormEvent, addPost: (data: any) => any) => {
        event.preventDefault();
        const { title, body, file } = this.state;
        const { history: { push } } = this.props;
        const variables = {title, body, file}
        if (body === '') {
            toastr.info('Please add a post body!');
            return false;
        }
        this.setState({ loading: true });
        
        if (file) {
            try {
                const uploadResults = await upload(file);
                variables.file = uploadResults.secure_url; 
            } catch (error) {
                console.error(error);
            }
            
        }
        try {
            await addPost({variables});  
            this.setState({ loading: false});
            toastr.info('Post added successfully');
            push('/');
        } catch (error) {
            this.setState({ loading: false})
            toastr.error('Error occurred while adding a post!')
        }
        

    }

    render() {
        const { title, body, loading } = this.state;
        const postInputs = [
            {
                name: 'title',
                value: title,
                id: 'title',
                type: 'text',
                placeholder: 'Please enter title',
                onChange: this.onChange,
                required: 'required',
                icon: 'write'
            },
        ]
        return (
            <Mutation mutation={ADD_POST}>
                {(addPost: MutationFunc, data: any ) => (
                    <div className="ui raised very padded centr aligned text container segment container-main animated fadeIn post-form bg-image_">
                    <div className="bg-image__cover_"></div>
                    <h1 className="ui header">Add Post</h1>
                    <br />
                    <form
                      className={loading ? " ui form loading center aligned": "ui form center aligned"}
                      onSubmit={e => {
                        e.preventDefault();
                        this.onSubmit(e, addPost)
                      }}
                    >
                     <Grid columns={2} stackable>
                         <Grid.Row>
                             <Grid.Column>
                                {postInputs.map(input => {
                                    return <Input key={input.name} {...input} />
                                })}                                
                                <textarea name="body" style={{ minHeight: 100 }} className="" placeholder="A cool post description..." value={body} onChange={this.onTextChange} />
  
                             </Grid.Column>
                             <Grid.Column>
                                <ImageUpload onImageChange={this.onImageChange} />
                             </Grid.Column>
                         </Grid.Row>
                     </Grid>
                      
                      <button className="ui center aligned button redish block rounded square animated zoomIn delayed-2s" type="submit">Submit</button>
                    </form>
                  </div>
                )}
            </Mutation>
        )
    }


}