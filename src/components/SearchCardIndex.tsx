import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';
import SearchCard from './SearchCard';
import SearchCardInfo from './SearchCardInfo';

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return {
    cards: search.cards,
    keyword: search.keyword,
  };
};

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>

const SearchCardIndex = (props: PropsFormRedux) => {
  const { cards, keyword } = props;

  return (
    <div className="searchCardIndex">
      {cards.length === 0 && keyword !== '' && <SearchCardInfo />}
      {cards.map((card) => (
        <SearchCard key={card.id} cardId={card.id} />
      ))}
    </div>
  );
};

export default connector(SearchCardIndex);
