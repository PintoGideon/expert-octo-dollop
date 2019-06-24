import { EventEmitter } from 'events';
import { users } from '../../public/default-state.json';

class UserStore extends EventEmitter {
  users = users;

  createUser = user => {
    const newUser = {
      id: Date.now().toString(),
      name: user.name,
      email: user.email,
    };

    this.users = { ...this.users, newUser };
    this.emit('change', this.users);
  };

  updateUser = ({ updatedUser }) => {
    this.users = this.users.map(user => {
      return user.id === updatedUser.id ? updatedUser : user;
    });
    this.emit('change', this.users);
  };
}

export default new UserStore();
