import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '../../store';
import { searchingText } from '../../utils/text';

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return {
    isSearching: search.isSearching,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type SearchInfoProps = PropsFromRedux & {
  notFoundText: string
}

export const SearchInfo = (props: SearchInfoProps) => {
  const { isSearching, notFoundText } = props;

  return (
    <div data-testid="searchInfo" className="searchInfo">
      {isSearching ? (
        <>
          <FontAwesomeIcon icon="spinner" spin className="searchInfo__icon" />
          <div className="searchInfo__searching">{searchingText}</div>
        </>
      ) : (
        <div className="searchInfo__empty">{notFoundText}</div>
      )}
    </div>
  );
};

export default connector(SearchInfo);
