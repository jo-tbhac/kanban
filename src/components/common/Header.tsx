import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import SearchCardForm from '../search/SearchForm';
import DeleteBoardButton from '../board/DeleteBoardButton';
import LabelEdit from '../label/LabelEdit';
import { editLabelButtonText } from '../../utils/text';

const Header = () => {
  const [isLabelEditVisible, setLabelEditVisible] = useState(false);

  return (
    <div className="header">
      <div className="headerIcon">
        <Link to="/" className="headerIcon__toIndex">
          <FontAwesomeIcon icon={['fas', 'home']} data-testid="homeIcon" />
        </Link>
      </div>

      <SearchCardForm />

      <DeleteBoardButton />

      <div
        data-testid="openLabelEditButton"
        role="button"
        tabIndex={0}
        onClick={() => setLabelEditVisible(true)}
        onKeyPress={() => setLabelEditVisible(true)}
        className="openLabelEditButton"
      >
        <FontAwesomeIcon icon={['fas', 'pen']} />
        <div className="openLabelEditButton__text">{editLabelButtonText}</div>
      </div>
      {isLabelEditVisible && <LabelEdit setLabelEditVisible={setLabelEditVisible} />}
    </div>
  );
};

export default Header;
