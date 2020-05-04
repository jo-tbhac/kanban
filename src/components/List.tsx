import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from './Card';

const List = () => (
  <div className="listContainer">
    <div className="listHeader">
      <div className="listHeader__title">list_1</div>
      <FontAwesomeIcon icon={['fas', 'ellipsis-h']} className="listHeader__icon" />
    </div>

    <div className="cardIndexContainer">
      <Card />
    </div>

    <div className="addCardButton">
      <FontAwesomeIcon icon={['fas', 'plus']} className="addCardButton__icon" />
      <div className="addCardButton__text">Add card</div>
    </div>
  </div>
);

export default List;
