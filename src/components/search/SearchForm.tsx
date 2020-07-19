import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import SearchCardTextField from './SearchCardTextField';
import SearchCardIndex from './SearchCardIndex';
import SearchBoardTextField from './SearchBoardTextField';
import SearchBoardIndex from './SearchBoardIndex';

const SearchCardForm = () => {
  const match = useRouteMatch('/board/:boardId');

  return (
    <div className="searchForm">
      {match ? (
        <>
          <SearchCardTextField />
          <SearchCardIndex />
        </>
      ) : (
        <>
          <SearchBoardTextField />
          <SearchBoardIndex />
        </>
      )}
    </div>
  );
};

export default SearchCardForm;
