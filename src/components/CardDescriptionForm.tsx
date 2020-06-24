import React, { useState } from 'react';
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
  closeCardDescriptionForm: () => void
}

export const CardDescriptionForm = (props: CardDescriptionFormProps) => {
  const {
    cardID,
    initialCardDescription,
    closeCardDescriptionForm,
    updateCard,
  } = props;

  const [cardDescription, setCardDescription] = useState(initialCardDescription);

  const onClickSubmit = () => {
    if (cardDescription !== initialCardDescription) {
      updateCard(cardID, { description: cardDescription });
    }
    closeCardDescriptionForm();
  };

  return (
    <div className="cardDescriptionForm">
      <FlexTextArea
        value={cardDescription}
        onChange={(event) => setCardDescription(event.target.value)}
      />
      <div className="cardDescriptionFormButton">
        <button
          data-testid="cardDescriptionFormCancelButton"
          type="button"
          onClick={closeCardDescriptionForm}
          className="cardDescriptionFormButton__cancel"
        >
          {cancelButtonText}
        </button>
        <button
          data-testid="cardDescriptionFormSubmitButton"
          type="button"
          onClick={onClickSubmit}
          className="cardDescriptionFormButton__submit"
        >
          {createButtonText}
        </button>
      </div>
    </div>
  );
};

export default connector(CardDescriptionForm);
