import React from 'react'
import {
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react'
import IsloggedIn, { signOut } from '../../utils/auth'

export interface Idata {
    visible: boolean;
}

const VerticalSidebar = ({ visible }: Idata) => (
  <Sidebar
    as={Menu}
    animation='slide along'
    direction='left'
    icon='labeled'
    vertical
    visible={visible}
    width='thin'
  >
    <Menu.Item as='div'>
      <a href='/'>
        <Icon name='home' />
      Home
      </a>
    </Menu.Item>
    {!IsloggedIn && (
    <React.Fragment>
      <Menu.Item as='div'>
        <a href='/signin'>
          <Icon name='user' />
              Sign in
        </a>
      </Menu.Item>
      <Menu.Item as='div'>
        <a href='/signup'>
          <Icon name='user plus' />
              Sign Up
        </a>
      </Menu.Item>
    </React.Fragment>
      ) 
      
      }
    
    <Menu.Item as='div'>
      <a href='/post'>
        <Icon name='newspaper outline' />
        Post
      </a>
    </Menu.Item>
    {IsloggedIn && (
    <Menu.Item className="cursor pointing" as='div' onClick={() => { signOut(window.location.reload())}}>
      <Icon name='sign-out alternate' />
        Log Out
    </Menu.Item>
    )}
  </Sidebar>
)

export default VerticalSidebar;