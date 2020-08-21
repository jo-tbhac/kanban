import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { Card } from '../../store/card/types';
import { List } from '../../store/list/types';
import * as cardDetailActions from '../../store/card_detail/actions';
import CardLabelSmall from '../card/CardLabelSmall';
import CardStatusIndex from '../card/CardStatusIndex';
import Cover from '../cover/Cover';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    lists: board.selectedBoard.lists,
  };
};

const mapDispatchToProps = {
  openCardDetail: cardDetailActions.openCardDetail,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>

type SearchCardProps = PropsFormRedux & {
  cardId: number
}

export const SearchCard = (props: SearchCardProps) => {
  const { lists, cardId, openCardDetail } = props;

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
    <div className="searchCardRow">
      <div className="searchCardRow__label">{list?.name}</div>
      <div
        data-testid={`searchCard-${searchedCard.id}`}
        role="button"
        tabIndex={0}
        onClick={() => openCardDetail({ cardId, listId: searchedCard.listId })}
        onKeyPress={() => openCardDetail({ cardId, listId: searchedCard.listId })}
        className="searchCard"
      >
        {searchedCard.cover && <Cover card={searchedCard} />}

        <div className="searchCardLabelWrapper">
          {searchedCard.labels?.map((label) => (
            <CardLabelSmall key={`${searchedCard.id}-${label.id}`} label={label} />
          ))}
        </div>

        <div className="searchCard__title">{searchedCard.title}</div>

        <CardStatusIndex card={searchedCard} />
      </div>
    </div>
  );
};

export default connector(SearchCard);
