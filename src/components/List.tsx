import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from './Card';
import ListNameForm from './ListNameForm';
import ListMenu from './ListMenu';
import * as types from '../store/list/types';
import { newCardButtonText } from '../utils/text';

type ListProps = {
  list: types.List
}

const List = (props: ListProps) => {
  const { list } = props;

  const [isListFormVisible, setListFormVisible] = useState(false);
  const [isListMenuVisible, setListMenuVisible] = useState(false);

  return (
    <div className="listContainer">
      <div className="listHeader">
        {isListFormVisible ? (
          <ListNameForm
            initialListName={list.name}
            listID={list.id}
            setListFormVisible={setListFormVisible}
          />
        ) : (
          <div
            data-testid="listName"
            role="button"
            tabIndex={0}
            onClick={() => setListFormVisible(true)}
            onKeyPress={() => setListFormVisible(true)}
            className="listHeader__title"
          >
            {list.name}
          </div>
        )}
        <div
          data-testid="listMenuButton"
          role="button"
          tabIndex={0}
          onClick={() => setListMenuVisible(true)}
          onKeyPress={() => setListMenuVisible(true)}
          className="listHeader__icon"
        >
          <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
        </div>
        {isListMenuVisible && <ListMenu listID={list.id} setListMenuVisible={setListMenuVisible} />}
      </div>

      <div className="cardIndexContainer">
        {list.cards?.map((card) => <Card key={String(card.id)} card={card} />)}
      </div>

      <div className="addCardButton">
        <FontAwesomeIcon icon={['fas', 'plus']} className="addCardButton__icon" />
        <div className="addCardButton__text">{newCardButtonText}</div>
      </div>
    </div>
  );
};

export default List;
