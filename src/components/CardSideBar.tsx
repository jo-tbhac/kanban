import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardSideBarDeleteButton from './CardSideBarDeleteButton';

const CardDetailSideBar = () => (
  <div className="cardSideBar">
    <div className="cardSideBarRow">
      <FontAwesomeIcon icon={['fas', 'paperclip']} className="cardSideBarRow__icon" />
      <div className="cardSideBarRow__label">添付ファイルを追加</div>
    </div>
    <div className="cardSideBarRow">
      <FontAwesomeIcon icon={['fas', 'arrow-right']} className="cardSideBarRow__icon" />
      <div className="cardSideBarRow__label">移動</div>
    </div>
    <CardSideBarDeleteButton />
  </div>
);

export default CardDetailSideBar;
