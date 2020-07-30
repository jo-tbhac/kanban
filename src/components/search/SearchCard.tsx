import React, { useState, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { Card } from '../../store/card/types';
import { List } from '../../store/list/types';
import CardDetail from '../card/CardDetail';
import CardLabelSmall from '../card/CardLabelSmall';
import CardStatusIndex from '../card/CardStatusIndex';
import { CardContext } from '../card/CardIndexContainer';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    lists: board.selectedBoard.lists,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>

type SearchCardProps = PropsFormRedux & {
  cardId: number
}

export const SearchCard = (props: SearchCardProps) => {
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
          data-testid={`searchCard-${searchedCard.id}`}
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

          <CardStatusIndex />

        </div>
        {isCardDetailVisible
          && <CardDetail setCardDetailVisible={setCardDetailVisible} />}
      </div>
    </CardContext.Provider>
  );
};

export default connector(SearchCard);
