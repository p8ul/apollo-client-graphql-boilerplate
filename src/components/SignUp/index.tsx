import React from 'react';
import gql from "graphql-tag";
import toastr from 'toastr';
import { Mutation, MutationFunc } from "react-apollo";
import Input from '../Common/Input';
import Store from '../../utils/storage';
import { TOKEN } from '../../constants/keys'

const SIGN_UP = gql`

  mutation SignUp($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

interface data  {
  variables: {
    name: string,
    email: string,
    password: string,
  }
}

interface Idata {
  data: {register: {token: string}}
}

interface Props {
    history: {
      push: (name: string) => any
    }
}
const store = new Store(TOKEN);

class SignUp extends React.Component<Props> {
  state = {
    name: '',
    email: '', 
    password: '',
    loading: false,
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event: React.FormEvent, signUp: (data:data)=> any) => {
    event.preventDefault();
    this.setState({loading: true});
    const { name, email, password } = this.state;
    const { history: { push } } = this.props;    
    
    try {
      
      let data: Idata;
      data = await signUp({ variables: { name, email, password } });
      
      store.insert(data.data.register, () => push('/'))
      
      toastr.success('Signed up successfully', "Success")
    } catch (error) {
      this.setState({ loading: false });
    }
    

  }

  render() {
    const { name, email, password, loading } = this.state;
    const inputs = [
      {
        name: 'name',
        value: name,
        id: 'name',
        type: 'text',
        placeholder: 'Username',
        onChange: this.onChange,
        required: 'required',
        icon: 'user outline',
      },
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
      <Mutation mutation={SIGN_UP}>
        {(signUP: MutationFunc) => (
          <div className="ui raised very padded center aligned text container segment container-main animated fadeIn auth-form bg-image_">
            <div className="bg-image__cover_" />
            <h1 className="ui header animated zoomIn delay-1s">Sign Up</h1>
            <br />
            <form
              className={loading ? " ui form loading": ""}
              onSubmit={e => {
                e.preventDefault();
                this.onSubmit(e, signUP)
              }}
            >
             
              {inputs.map(input => {
                return <Input key={input.name} {...input} />
              })}
              <button className="ui button redish block rounded square animated zoomIn delay-2s" type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
  
};

export default SignUp;