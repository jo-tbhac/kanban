import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as cardActions from '../store/card/actions';

const mapDispatchToProps = {
  updateCard: cardActions.updateCard,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardTitleProps = PropsFromRedux & {
  initialCardTitle: string
  cardID: number
}

const CardTitle = (props: CardTitleProps) => {
  const { initialCardTitle, cardID, updateCard } = props;

  const [cardTitle, setCardTitle] = useState(initialCardTitle);
  const [isCardTitleFormVisible, setCardTitleFormVisible] = useState(false);

  const onBlur = () => {
    if (cardTitle === '' || cardTitle === initialCardTitle) {
      setCardTitle(initialCardTitle);
      setCardTitleFormVisible(false);
      return;
    }
    updateCard(cardID, { title: cardTitle });
    setCardTitleFormVisible(false);
  };

  return (
    isCardTitleFormVisible ? (
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        type="text"
        maxLength={50}
        value={cardTitle}
        onChange={(event) => setCardTitle(event.target.value)}
        onBlur={onBlur}
        className="cardTitleTextField"
      />
    ) : (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setCardTitleFormVisible(true)}
        onKeyPress={() => setCardTitleFormVisible(true)}
        className="cardTitle__text"
      >
        {initialCardTitle}
      </div>
    )
  );
};

export default connector(CardTitle);
