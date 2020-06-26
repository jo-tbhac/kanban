import React, { useState, useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { CardContext } from './List';
import FlexTextArea from './FlexTextArea';
import * as cardActions from '../store/card/actions';
import { createButtonText, cancelButtonText } from '../utils/text';

const mapDispatchToProps = {
  updateCard: cardActions.updateCard,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardDescriptionFormProps = PropsFromRedux & {
  closeCardDescriptionForm: () => void
}

export const CardDescriptionForm = (props: CardDescriptionFormProps) => {
  const { closeCardDescriptionForm, updateCard } = props;

  const card = useContext(CardContext);

  const [cardDescription, setCardDescription] = useState(card ? card.description : '');

  const onClickSubmit = () => {
    if (card === null || cardDescription === card.description) {
      closeCardDescriptionForm();
      return;
    }
    updateCard(card.id, { description: cardDescription });
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
