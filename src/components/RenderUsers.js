import React, { Component } from 'react';
import { users } from '../../public/default-state.json';

class RenderUsers extends Component {
  state = { users };

  onCreateUser = user => {
    let { users } = this.state;

    const newUser = {
      id: Date.now().toString(),
      name: user.name,
      email: user.email,
    };

    this.setState({ users: [...users, newUser] });
  };

  onUpdateUser = ({ updatedUser }) => {
    this.setState(({ users }) => {
      return {
        users: users.map(user => {
          return user.id === updatedUser.id ? updatedUser : user;
        }),
      };
    });
  };

  render() {
    const { onCreateUser, onUpdateUser } = this;
    const { users } = this.state;

    return <>{this.props.children({ users, onCreateUser, onUpdateUser })}</>;
  }
}

export default RenderUsers;
