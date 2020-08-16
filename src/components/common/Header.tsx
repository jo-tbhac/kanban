import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import UserProfileButton from '../session/UserProfileButton';
import SearchCardForm from '../search/SearchForm';
import BoardMenuButton from '../board/BoardMenuButton';
import EditLabelButton from '../label/EditLabelButton';

const Header = () => (
  <div className="header">
    <div className="headerIcon">
      <Link to="/" className="headerIcon__toIndex">
        <FontAwesomeIcon icon={['fas', 'home']} data-testid="homeIcon" />
      </Link>
    </div>
    <UserProfileButton />

    <SearchCardForm />
    <BoardMenuButton />
    <EditLabelButton />
  </div>
);

export default Header;
