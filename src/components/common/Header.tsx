import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useLocation } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import * as loadingActions from '../../store/loading/actions';
import UserProfileButton from '../session/UserProfileButton';
import SearchCardForm from '../search/SearchForm';
import BoardMenuButton from '../board/BoardMenuButton';
import EditLabelButton from '../label/EditLabelButton';

const mapDispatchToProps = {
  loadStart: loadingActions.loadStart,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const Header = (props: PropsFromRedux) => {
  const { loadStart } = props;

  const history = useHistory();
  const location = useLocation();

  const onClick = () => {
    if (location.pathname === '/') {
      return;
    }
    loadStart();
    history.push('/');
  };

  return (
    <div className="header">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyPress={onClick}
        className="toIndexButton"
      >
        <FontAwesomeIcon data-testid="homeIcon" icon={['fas', 'home']} />
      </div>
      <UserProfileButton />

      <SearchCardForm />
      <BoardMenuButton />
      <EditLabelButton />
    </div>
  );
};

export default connector(Header);
