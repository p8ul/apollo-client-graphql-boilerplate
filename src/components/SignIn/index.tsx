import React from 'react';
import gql from "graphql-tag";
import toastr from 'toastr';
import { Mutation, MutationFunc } from "react-apollo";
import Input from '../Common/Input';
import Store from '../../utils/storage';
import { TOKEN } from '../../constants/keys'

const LOGIN = gql`

  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface data  {
  variables: {
    email: string,
    password: string,
  }
}

interface Idata {
  data: {login: {token: string}}
}

interface Props {
    history: {
      push: (name: string) => any
    }
}
const store = new Store(TOKEN);

class SignIn extends React.Component<Props> {
  state = {
    email: '', 
    password: '',
    loading: false,
    errors: {}
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event: React.FormEvent, signIn: (data:data)=> any) => {
    event.preventDefault();
    this.setState({loading: true});
    const { email, password } = this.state;
    const { history: { push } } = this.props;    
    
    try {
      
      let data: Idata;
      data = await signIn({ variables: { email, password } });
      
      store.insert(data.data.login, () => push('/'))
      
      toastr.success('Logged in successfully', "Success")
    } catch (error) {
      this.setState({ loading: false });
    }
    

  }

  render() {
    const { email, password, loading } = this.state;
    const loginInputs = [
      {
        name: 'email',
        value: email,
        id: 'email',
        type: 'email',
        placeholder: 'Email',
        onChange: this.onChange,
        required: 'required',
        icon: 'mail outline',
      },
      {
        name: 'password',
        value: password,
        id: 'password',
        type: 'password',
        placeholder: 'Password',
        onChange: this.onChange,
        required: 'required',
        icon: 'lock'
      },
    ];
    return (
      <Mutation mutation={LOGIN}>
        {(signIn: MutationFunc, data: any) => (
          <div className="ui raised very padded center aligned text container segment container-main animated fadeIn auth-form bg-image_">
            <div className="bg-image__cover_" />
            <h1 className="ui header animated fadeIn delay-1s">Sign In</h1>
            <br />
            <form
              className={loading ? " ui form loading": ""}
              onSubmit={e => {
                e.preventDefault();
                this.onSubmit(e, signIn)
              }}
            >
             
              {loginInputs.map(input => {
                return <Input key={input.name} {...input} />
              })}
              <button className="ui button redish block rounded square animated zoomIn delay-2s" type="submit">Sign In</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
  
};

export default SignIn;