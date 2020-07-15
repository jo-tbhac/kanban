import React, { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '../store';
import * as searchAction from '../store/search/actions';
import { searchCardFormPlaceholder } from '../utils/text';

const WAIT_INTERVAL = 1000;

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return {
    keyword: search.keyword,
  };
};

const mapDispatchToProps = {
  searchCard: searchAction.searchCard,
  clearSearchCardPool: searchAction.clearSearchCardPool,
  onChangeSearchCardKeyword: searchAction.onChangeSearchCardKeyword,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const SearchCardTextField = (props: PropsFromRedux) => {
  const {
    keyword,
    searchCard,
    clearSearchCardPool,
    onChangeSearchCardKeyword,
  } = props;

  const { boardId } = useParams();
  // const match = useRouteMatch('/board/:boardId');

  const timer: { current: undefined | NodeJS.Timeout } = useRef();

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
    <div className="searchCardTextField">
      <input
        type="text"
        value={keyword}
        onChange={(event) => onChangeSearchCardKeyword(event.target.value)}
        placeholder={searchCardFormPlaceholder}
        className="searchCardTextField__input"
      />
      {keyword === ''
        ? <FontAwesomeIcon icon={['fas', 'search']} className="searchCardTextField__search" />
        : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => onChangeSearchCardKeyword('')}
            onKeyPress={() => onChangeSearchCardKeyword('')}
            className="searchCardTextField__clear"
          >
            <FontAwesomeIcon icon={['far', 'times-circle']} />
          </div>
        )}
    </div>
  );
};

export default connector(SearchCardTextField);
