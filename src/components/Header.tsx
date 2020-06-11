import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <div className="headerIcon">
      <Link to="/" className="headerIcon__toIndex">
        <FontAwesomeIcon icon={['fas', 'home']} data-testid="homeIcon" />
      </Link>
    </div>
  </div>
);

export default Header;
