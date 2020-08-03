import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardSideBarDeleteButton from './CardSideBarDeleteButton';
import CardSideBarCheckListButton from './CardSideBarCheckListButton';
import CardSideBarFileButton from './CardSideBarFileButton';

const CardDetailSideBar = () => (
  <div className="cardSideBar">
    <div className="cardSideBarRow">
      <FontAwesomeIcon icon={['fas', 'arrow-right']} className="cardSideBarRow__icon" />
      <div className="cardSideBarRow__label">移動</div>
    </div>
    <CardSideBarFileButton />
    <CardSideBarCheckListButton />
    <CardSideBarDeleteButton />
  </div>
);

export default CardDetailSideBar;
