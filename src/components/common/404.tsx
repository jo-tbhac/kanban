import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/404.png';
import { moveToHomeText, pageNotFoundTitle } from '../../utils/text';

const NotFound = () => (
  <div className="notFoundScreen">
    <div className="notFoundScreen__title">{pageNotFoundTitle}</div>
    <img src={logo} alt="Logo" className="notFoundScreen__image" />
    <Link to="/" className="notFoundScreen__link">{moveToHomeText}</Link>
  </div>
);

export default NotFound;
