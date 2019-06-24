import React, { Component } from 'react';
import UserStore from './UserStores';

class RenderUsers extends Component {
  state = {
    users: UserStore.users,
  };

  componentDidMount() {
    this.unsubscribe = UserStore.on('change', users =>
      this.setState({
        users,
      }),
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { onCreateUser, onUpdateUser } = UserStore;
    const { users } = this.state;

    return <>{this.props.children({ users, onCreateUser, onUpdateUser })}</>;
  }
}

export default RenderUsers;
