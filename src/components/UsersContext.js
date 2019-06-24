import React, { Component, createContext } from 'react';
import { users } from '../../public/default-state.json';

export const UserContext = createContext();

export class UsersProvider extends Component {
  state = {
    users,
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
    const { onUpdateUser, onCreateUser } = this;

    const users = this.state;

    return (
      <UserContext.Provider value={(users, onCreateUser, onUpdateUser)}>
        >{this.props.children}
      </UserContext.Provider>
    );
  }
}
