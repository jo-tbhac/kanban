import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';
import { Card } from '../store/card/types';
import { List } from '../store/list/types';
import CardDetail from './CardDetail';
import CardLabelSmall from './CardLabelSmall';
import { CardContext } from './CardIndexContainer';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    lists: board.selectedBoard.lists,
  };
};

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>

type SearchCardProps = PropsFormRedux & {
  cardId: number
}

const SearchCard = (props: SearchCardProps) => {
  const { lists, cardId } = props;

  const [isCardDetailVisible, setCardDetailVisible] = useState(false);

  const searchedCard = useMemo(() => {
    const cards = lists.reduce(
      (previousCards: Card[], list: List) => [...previousCards, ...list.cards],
      [],
    );
    return cards.find((c) => c.id === cardId);
  }, [lists, cardId]);

  if (!searchedCard) {
    return null;
  }

  const list = lists.find((l) => l.id === searchedCard.listId);

  return (
    <CardContext.Provider value={searchedCard}>
      <div className="searchCardRow">
        <div className="searchCardRow__label">{list?.name}</div>
        <div
          data-testid={`card-${searchedCard.id}`}
          role="button"
          tabIndex={0}
          onClick={() => setCardDetailVisible(true)}
          onKeyPress={() => setCardDetailVisible(true)}
          className="searchCard"
        >
          <div className="searchCardLabelWrapper">
            {searchedCard.labels?.map((label) => (
              <CardLabelSmall key={`${searchedCard.id}-${label.id}`} label={label} />
            ))}
          </div>

          <div className="searchCard__title">{searchedCard.title}</div>

          <div className="searchCardStatusContainer">
            <div className="searchCardStatus">
              <FontAwesomeIcon icon={['fas', 'paperclip']} className="searchCardStatus__icon" />
              <div className="searchCardStatus__count">1</div>
            </div>
          </div>
        </div>
        {isCardDetailVisible
          && <CardDetail setCardDetailVisible={setCardDetailVisible} />}
      </div>
    </CardContext.Provider>
  );
};

export default connector(SearchCard);
