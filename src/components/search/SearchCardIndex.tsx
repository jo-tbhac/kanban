import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { searchCardNotFound } from '../../utils/text';
import SearchCard from './SearchCard';
import SearchInfo from './SearchInfo';

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return {
    cardIds: search.cardIds,
    keyword: search.cardKeyword,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const SearchCardIndex = (props: PropsFromRedux) => {
  const { cardIds, keyword } = props;

  return (
    <div data-testid="searchCardIndex" className="searchCardIndex">
      {cardIds.length === 0 && keyword !== '' && (
        <SearchInfo notFoundText={searchCardNotFound} />
      )}
      {cardIds.map((cardId) => (
        <SearchCard key={cardId} cardId={cardId} />
      ))}
    </div>
  );
};

export default connector(SearchCardIndex);
