import React, { useState, Dispatch, SetStateAction } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import FlexTextArea from './FlexTextArea';
import * as cardActions from '../store/card/actions';
import { createButtonText, cancelButtonText } from '../utils/text';

const mapDispatchToProps = {
  updateCard: cardActions.updateCard,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardDescriptionFormProps = PropsFromRedux & {
  cardID: number
  initialCardDescription: string
  setCardDescriptionFormVisible: Dispatch<SetStateAction<boolean>>
}

const CardDescriptionForm = (props: CardDescriptionFormProps) => {
  const {
    cardID,
    initialCardDescription,
    setCardDescriptionFormVisible,
    updateCard,
  } = props;

  const [cardDescription, setCardDescription] = useState(initialCardDescription);

  const onClickSubmit = () => {
    if (cardDescription !== initialCardDescription) {
      updateCard(cardID, { description: cardDescription });
    }
    setCardDescriptionFormVisible(false);
  };

  return (
    <div className="cardDescriptionForm">
      <FlexTextArea
        value={cardDescription}
        onChange={(event) => setCardDescription(event.target.value)}
      />
      <div className="cardDescriptionFormButton">
        <button
          type="button"
          onClick={() => setCardDescriptionFormVisible(false)}
          className="cardDescriptionFormButton__cancel"
        >
          {cancelButtonText}
        </button>
        <button
          type="button"
          onClick={onClickSubmit}
          disabled={cardDescription === ''}
          className="cardDescriptionFormButton__submit"
        >
          {createButtonText}
        </button>
      </div>
    </div>
  );
};

export default connector(CardDescriptionForm);
