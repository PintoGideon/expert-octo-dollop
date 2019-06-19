import React, { Component } from 'react';
import CreateList from './CreateList';
import Lists from './Lists';

import defaultState from '../default-state.json';

class Application extends Component {
  state = {
    lists: defaultState.lists,
  };

  createList = ({ title }) => {
    const { lists } = defaultState.lists;

    const list = {
      title,
      id: Date.now().toString(),
      cards: [],
    };

    this.setState({ lists: [...lists, list] });
  };

  removeList = listId => {
    let { lists } = this.state;
    lists = lists.filter(list => list.id !== listId);
    this.setState({ lists });
  };

  createCard = ({ title, description, listId }) => {
    // Create a new card with title,description and id
    let { lists } = this.state;

    const card = {
      id: Date.now().toString(),
      title,
      description,
    };

    lists = lists.map(list => {
      if (list.id === listId) {
        return { ...list, cards: [...list.cards, card] };
      }
      return list;
    });

    this.setState({ lists: lists });
  };

  removeCard = (listId, cardId) => {
    let { lists } = this.state;

    const targetList = lists.find(list => list.id === listId);

    const remainingCards = targetList.cards.filter(card => card.id !== cardId);

    const updatedList = {
      ...targetList,
      cards: remainingCards,
    };

    lists = lists.map(list => {
      return list.id === listId ? updatedList : list;
    });

    this.setState({ lists });
  };

  moveCardToList = (targetListId, targetCard) => {
    let { lists } = this.state;

    lists = lists.map(list => {
      let newCards;
      if (list.id === targetListId) {
        newCards = [...list.cards, targetCard];
      } else {
        newCards = list.cards.filter(card => card.id !== targetCard.id);
      }
      return { ...list, cards: newCards };
    });
    
    this.setState({ lists });
  };

  render() {
    const { lists } = this.state;
    return (
      <main className="Application">
        <div>{/* Users will go here! */}</div>
        <section>
          <CreateList onCreateList={this.createList} />
          <Lists
            lists={lists}
            onCreateCard={this.createCard}
            onRemoveList={this.removeList}
            onRemoveCard={this.removeCard}
            onListChange={this.moveCardToList}
          />
        </section>
      </main>
    );
  }
}

export default Application;
