import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import SearchCardForm from '../search/SearchForm';
import DeleteBoardButton from '../board/DeleteBoardButton';
import EditLabelButton from '../label/EditLabelButton';

const Header = () => (
  <div className="header">
    <div className="headerIcon">
      <Link to="/" className="headerIcon__toIndex">
        <FontAwesomeIcon icon={['fas', 'home']} data-testid="homeIcon" />
      </Link>
    </div>

    <SearchCardForm />
    <DeleteBoardButton />
    <EditLabelButton />
  </div>
);

export default Header;
