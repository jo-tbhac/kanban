import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from './Card';
import CardForm from './CardForm';
import ListName from './ListName';
import ListMenuButton from './ListMenuButton';
import * as types from '../store/list/types';
import * as cardTypes from '../store/card/types';
import { newCardButtonText } from '../utils/text';

export const CardContext = React.createContext<cardTypes.Card | null>(null);

type ListProps = {
  list: types.List
}

const List = (props: ListProps) => {
  const { list } = props;

  const [isCardFormVisible, setCardFormVisible] = useState(false);

  return (
    <div className="listContainer">
      <div className="listHeader">
        <ListName initialListName={list.name} listId={list.id} />
        <ListMenuButton listId={list.id} />
      </div>

      <div className="cardIndexContainer">
        {list.cards?.map((card) => (
          <CardContext.Provider key={String(card.id)} value={card}>
            <Card />
          </CardContext.Provider>
        ))}
        {isCardFormVisible && <CardForm listId={list.id} setCardFormVisible={setCardFormVisible} />}
      </div>

      <div
        data-testid="addCardButton"
        role="button"
        tabIndex={0}
        onClick={() => setCardFormVisible(true)}
        onKeyPress={() => setCardFormVisible(true)}
        className="addCardButton"
      >
        <FontAwesomeIcon icon={['fas', 'plus']} className="addCardButton__icon" />
        <div className="addCardButton__text">{newCardButtonText}</div>
      </div>
    </div>
  );
};

export default List;
