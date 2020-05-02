import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => (
  <div className="header">
    <div className="headerIcon">
      <FontAwesomeIcon icon={['fas', 'bars']} className="headerIcon__icon" />
    </div>
  </div>
);

export default Header;
