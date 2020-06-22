import React, { useState, Dispatch, SetStateAction } from 'react';

import FlexTextArea from './FlexTextArea';
import { createButtonText, cancelButtonText } from '../utils/text';

type CardDescriptionFormProps = {
  cardID: number
  initialCardDescription: string
  setCardDescriptionFormVisible: Dispatch<SetStateAction<boolean>>
}

const CardDescriptionForm = (props: CardDescriptionFormProps) => {
  const { cardID, initialCardDescription, setCardDescriptionFormVisible } = props;

  const [cardDescription, setCardDescription] = useState(initialCardDescription);

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
        <button type="button" className="cardDescriptionFormButton__submit">
          {createButtonText}
        </button>
      </div>
    </div>
  );
};

export default CardDescriptionForm;
