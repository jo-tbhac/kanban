import React, { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import * as searchAction from '../../store/search/actions';
import { searchBoardFormPlaceholder } from '../../utils/text';
import SearchTextField from './SearchTextField';

const WAIT_INTERVAL = 1000;

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return {
    keyword: search.boardKeyword,
  };
};

const mapDispatchToProps = {
  searchBoard: searchAction.searchBoard,
  clearSearchBoardPool: searchAction.clearSearchBoardPool,
  onChangeSearchBoardKeyword: searchAction.onChangeSearchBoardKeyword,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const SearchBoardTextField = (props: PropsFromRedux) => {
  const {
    keyword,
    searchBoard,
    clearSearchBoardPool,
    onChangeSearchBoardKeyword,
  } = props;

  const timer: { current: undefined | NodeJS.Timeout } = useRef();

  useEffect(() => (
    () => {
      onChangeSearchBoardKeyword('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), []);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (keyword === '') {
      clearSearchBoardPool();
      return;
    }
    timer.current = setTimeout(() => {
      searchBoard(keyword);
    }, WAIT_INTERVAL);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <SearchTextField
      keyword={keyword}
      onChangeSearchKeyword={onChangeSearchBoardKeyword}
      placeholder={searchBoardFormPlaceholder}
    />
  );
};

export default connector(SearchBoardTextField);
