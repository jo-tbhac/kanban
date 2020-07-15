import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '../store';
import { searchCardNotFound, searchingText } from '../utils/text';

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return {
    isSearching: search.isSearching,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const SearchCardInfo = (props: PropsFromRedux) => {
  const { isSearching } = props;
  return (
    <div className="searchCardInfo">
      {isSearching ? (
        <>
          <FontAwesomeIcon icon="spinner" spin className="searchCardInfo__icon" />
          <div className="searchCardInfo__searching">{searchingText}</div>
        </>
      ) : (
        <div className="searchCardInfo__empty">{searchCardNotFound}</div>
      )}
    </div>
  );
};

export default connector(SearchCardInfo);
