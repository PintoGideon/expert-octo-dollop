import React, { Component } from 'react';
import { users } from '../../public/default-state.json';

const withUsers = WrappedComponent => {
  return class extends Component {
    state = {
      users: users,
    };

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
      const { users } = this.state;

      return (
        <WrappedComponent
          users={users}
          onCreateUser={this.onCreateUser}
          onUpdateUser={this.onUpdateUser}
          {...this.props}
        />
      );
    }
  };
};

export default withUsers;
