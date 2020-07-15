import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';
import SearchCard from './SearchCard';
import SearchCardInfo from './SearchCardInfo';

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return {
    cardIds: search.cardIds,
    keyword: search.keyword,
  };
};

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>

const SearchCardIndex = (props: PropsFormRedux) => {
  const { cardIds, keyword } = props;

  return (
    <div className="searchCardIndex">
      {cardIds.length === 0 && keyword !== '' && <SearchCardInfo />}
      {cardIds.map((cardId) => (
        <SearchCard key={cardId} cardId={cardId} />
      ))}
    </div>
  );
};

export default connector(SearchCardIndex);
