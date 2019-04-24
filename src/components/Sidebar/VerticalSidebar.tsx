import React from 'react'
import {
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react'

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
      <a href='/' >
      <Icon name='home' />
      Home
      </a>
      </Menu.Item>
    <Menu.Item as='div'>
        <a href='/signin' >
        <Icon name='user' />
        Sign in
        </a>
    </Menu.Item>
    <Menu.Item as='div'>
      <a href='/post' >
        <Icon name='camera' />
        Post
      </a>
    </Menu.Item>
  </Sidebar>
)

export default VerticalSidebar;