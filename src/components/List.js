import React, { Component } from 'react';

import CreateCard from './CreateCard';
import Card from './Card';

class List extends Component {
  state = { showOptions: false };

  toggleOptions = () => {
    this.setState(state => ({ showOptions: !state.showOptions }));
  };

  removeList = () => {
    this.props.onRemoveList(this.props.list.id);
  };

  removeCard = () => {};

  render() {
    const {
      list,
      users,
      lists,
      onRemoveCard,
      onCreateCard,
      onListChange,
      onAssignCard,
    } = this.props;
    const { showOptions } = this.state;

    return (
      <article className="List">
        <h2>{list.title}</h2>
        {showOptions && (
          <div className="List-options">
            <CreateCard onCreateCard={onCreateCard} list={list.id} />
            <button className="List-remove danger" onClick={this.removeList}>
              Remove List
            </button>
          </div>
        )}
        <button
          className="List-toggle toggle-options"
          onClick={this.toggleOptions}
        >
          Toggle Options
        </button>

        <div>
          {list.cards.map(card => (
            <Card
              key={card.id}
              card={card}
              users={users}
              onRemoveCard={onRemoveCard}
              onListChange={onListChange}
              onAssignCard={onAssignCard}
              listId={list.id}
              lists={lists}
            />
          ))}
        </div>
      </article>
    );
  }
}

export default List;
