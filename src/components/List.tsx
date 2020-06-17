import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from './Card';
import ListNameForm from './ListNameForm';
import * as types from '../store/list/types';

type ListProps = {
  list: types.List
}

const List = (props: ListProps) => {
  const { list } = props;

  const [isListFormVisible, setListFormVisible] = useState(false);

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
            role="button"
            tabIndex={0}
            onClick={() => setListFormVisible(true)}
            onKeyPress={() => setListFormVisible(true)}
            className="listHeader__title"
          >
            {list.name}
          </div>
        )}
        <FontAwesomeIcon icon={['fas', 'ellipsis-h']} className="listHeader__icon" />
      </div>

      <div className="cardIndexContainer">
        {list.cards?.map((card) => <Card key={String(card.id)} card={card} />)}
      </div>

      <div className="addCardButton">
        <FontAwesomeIcon icon={['fas', 'plus']} className="addCardButton__icon" />
        <div className="addCardButton__text">Add card</div>
      </div>
    </div>
  );
};

export default List;
