import React, { useState, useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { CardContext } from './CardIndexContainer';
import ButtonSubmit from '../common/ButtonSubmit';
import ButtonCancel from '../common/ButtonCancel';
import FlexTextArea from '../common/FlexTextArea';
import * as cardActions from '../../store/card/actions';
import { saveButtonText } from '../../utils/text';

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
        <ButtonCancel onClick={closeCardDescriptionForm} />
        <ButtonSubmit onClick={onClickSubmit} buttonText={saveButtonText} />
      </div>
    </div>
  );
};

export default connector(CardDescriptionForm);
