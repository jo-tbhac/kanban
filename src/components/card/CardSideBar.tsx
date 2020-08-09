import React from 'react';

import CardSideBarDeleteButton from './CardSideBarDeleteButton';
import CardSideBarCheckListButton from './CardSideBarCheckListButton';
import CardSideBarFileButton from './CardSideBarFileButton';

const CardDetailSideBar = () => (
  <div className="cardSideBar">
    <CardSideBarFileButton />
    <CardSideBarCheckListButton />
    <CardSideBarDeleteButton />
  </div>
);

export default CardDetailSideBar;
