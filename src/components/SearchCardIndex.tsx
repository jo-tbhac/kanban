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

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const SearchCardIndex = (props: PropsFromRedux) => {
  const { cardIds, keyword } = props;

  return (
    <div data-testid="searchCardIndex" className="searchCardIndex">
      {cardIds.length === 0 && keyword !== '' && <SearchCardInfo />}
      {cardIds.map((cardId) => (
        <SearchCard key={cardId} cardId={cardId} />
      ))}
    </div>
  );
};

export default connector(SearchCardIndex);
