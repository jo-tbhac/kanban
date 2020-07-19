import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { searchBoardNotFound } from '../../utils/text';
import SearchBoard from './SearchBoard';
import SearchInfo from './SearchInfo';

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return {
    boardIds: search.boardIds,
    keyword: search.boardKeyword,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const SearchBoardIndex = (props: PropsFromRedux) => {
  const { boardIds, keyword } = props;

  return (
    <div data-testid="searchBoardIndex" className="searchBoardIndex">
      {boardIds.length === 0 && keyword !== '' && (
        <SearchInfo notFoundText={searchBoardNotFound} />
      )}
      {boardIds.map((boardId) => <SearchBoard key={boardId} boardId={boardId} />)}
    </div>
  );
};

export default connector(SearchBoardIndex);
