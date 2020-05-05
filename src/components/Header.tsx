import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import * as boardActions from '../store/board/actions';

const mapDispatchToProps = {
  showBoardIndex: boardActions.showBoardIndex,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const Header = (props: PropsFromRedux) => {
  const { showBoardIndex } = props;

  return (
    <div className="header">
      <div className="headerIcon">
        <FontAwesomeIcon
          icon={['fas', 'home']}
          className="headerIcon__icon"
          onClick={showBoardIndex}
        />
      </div>
    </div>
  );
};

export default connector(Header);
