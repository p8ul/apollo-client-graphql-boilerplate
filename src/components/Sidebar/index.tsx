import React, { Component } from 'react'
import {
  Sidebar,
} from 'semantic-ui-react'
import VerticalSidebar from './VerticalSidebar';
import MainMenu from '../Menu';

export default class SidebarTransitions extends Component {
  state = {
    direction: 'left',
    dimmed: false,
    visible: false,
  }

  toggleSidbar = (active: boolean) => {
    this.setState({visible: !active});
  }

  render() {
    const { dimmed, visible } = this.state;
    const { children } = this.props;

    return (
      <div>
        <VerticalSidebar visible={visible} />
        <MainMenu toggleSidebar={this.toggleSidbar} sidebarOpen={visible} />

        <Sidebar.Pusher dimmed={dimmed && visible}>
          {children}
        </Sidebar.Pusher>
      </div>
    )
  }
}
