import React, { useState } from 'react';

type CardTitleProps = {
  initialTitle: string
}

const CardTitle = (props: CardTitleProps) => {
  const { initialTitle } = props;

  const [cardTitle, setCardTitle] = useState(initialTitle);
  const [isCardTitleFormVisible, setCardTitleFormVisible] = useState(false);

  const onBlur = () => {
    if (cardTitle === '' || cardTitle === initialTitle) {
      setCardTitleFormVisible(false);
      return;
    }
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
        {initialTitle}
      </div>
    )
  );
};

export default CardTitle;
