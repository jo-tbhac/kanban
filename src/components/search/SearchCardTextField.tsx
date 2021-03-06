import React, { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../store';
import * as searchAction from '../../store/search/actions';
import { searchCardFormPlaceholder } from '../../utils/text';
import SearchTextField from './SearchTextField';

const WAIT_INTERVAL = 1000;

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return {
    keyword: search.cardKeyword,
  };
};

const mapDispatchToProps = {
  searchCard: searchAction.searchCard,
  clearSearchCardPool: searchAction.clearSearchCardPool,
  onChangeSearchCardKeyword: searchAction.onChangeSearchCardKeyword,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const SearchCardTextField = (props: PropsFromRedux) => {
  const {
    keyword,
    searchCard,
    clearSearchCardPool,
    onChangeSearchCardKeyword,
  } = props;

  const { boardId } = useParams();

  const timer: { current: undefined | NodeJS.Timeout } = useRef();

  useEffect(() => (
    () => {
      onChangeSearchCardKeyword('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), []);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (keyword === '') {
      clearSearchCardPool();
      return;
    }
    if (boardId) {
      timer.current = setTimeout(() => {
        searchCard({ title: keyword, boardId: Number(boardId) });
      }, WAIT_INTERVAL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <SearchTextField
      keyword={keyword}
      onChangeSearchKeyword={onChangeSearchCardKeyword}
      placeholder={searchCardFormPlaceholder}
    />
  );
};

export default connector(SearchCardTextField);
