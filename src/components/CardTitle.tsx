import React, { useState, useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { CardContext } from './List';
import * as cardActions from '../store/card/actions';

const mapDispatchToProps = {
  updateCard: cardActions.updateCard,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const CardTitle = (props: PropsFromRedux) => {
  const { updateCard } = props;

  const card = useContext(CardContext);

  const [cardTitle, setCardTitle] = useState(card ? card.title : '');
  const [isCardTitleFormVisible, setCardTitleFormVisible] = useState(false);

  const onBlur = () => {
    if (card === null || cardTitle === '' || cardTitle === card?.title) {
      setCardTitle(card ? card?.title : '');
      setCardTitleFormVisible(false);
      return;
    }
    updateCard(card.id, { title: cardTitle });
    setCardTitleFormVisible(false);
  };

  return (
    isCardTitleFormVisible ? (
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        data-testid="cardTitleTextField"
        type="text"
        maxLength={50}
        value={cardTitle}
        onChange={(event) => setCardTitle(event.target.value)}
        onBlur={onBlur}
        className="cardTitleTextField"
      />
    ) : (
      <div
        data-testid="cardTitleText"
        role="button"
        tabIndex={0}
        onClick={() => setCardTitleFormVisible(true)}
        onKeyPress={() => setCardTitleFormVisible(true)}
        className="cardTitle__text"
      >
        {card?.title}
      </div>
    )
  );
};

export default connector(CardTitle);
