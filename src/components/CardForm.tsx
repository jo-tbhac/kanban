import React, {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

import { connect, ConnectedProps } from 'react-redux';

import * as cardActions from '../store/card/actions';
import { cardNameFormPlaceholder, createButtonText, cancelButtonText } from '../utils/text';

const mapDispatchToProps = {
  createCard: cardActions.createCard,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardFormProps = PropsFromRedux&{
  listId: number
  setCardFormVisible: Dispatch<SetStateAction<boolean>>
}

export const CardForm = (props: CardFormProps) => {
  const { listId, setCardFormVisible, createCard } = props;

  const [isComposition, setComposition] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const submit = () => {
    if (cardTitle !== '') {
      createCard(listId, { title: cardTitle });
    }
    setCardFormVisible(false);
  };

  const keyPressEvent = useCallback((event: KeyboardEvent) => {
    if (!isComposition && event.key === 'Enter') {
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardTitle]);

  useEffect(() => {
    window.addEventListener('keypress', keyPressEvent);
    return () => {
      window.removeEventListener('keypress', keyPressEvent);
    };
  }, [keyPressEvent]);

  return (
    <div data-testid="cardForm" className="cardForm">
      <textarea
        data-testid="cardFormTextArea"
        rows={3}
        maxLength={50}
        value={cardTitle}
        onChange={(event) => setCardTitle(event.target.value)}
        onCompositionStart={() => setComposition(true)}
        onCompositionEnd={() => setComposition(false)}
        placeholder={cardNameFormPlaceholder}
        className="cardForm__textField"
      />
      <div className="cardFormButton">
        <button
          data-testid="cardFormCancelButton"
          type="button"
          onClick={() => setCardFormVisible(false)}
          className="cardFormButton__cancel"
        >
          {cancelButtonText}
        </button>
        <button
          data-testid="cardFormSubmitButton"
          type="button"
          onClick={submit}
          disabled={cardTitle === ''}
          className="cardFormButton__submit"
        >
          {createButtonText}
        </button>
      </div>
    </div>
  );
};

export default connector(CardForm);
