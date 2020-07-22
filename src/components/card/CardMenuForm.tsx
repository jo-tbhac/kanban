import React, { ReactElement, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ButtonSubmit from '../common/ButtonSubmit';

type CardMenuFormProps = {
  component: ReactElement
  targetClassName: string
  headerText: string
  buttonText: string
  buttonDisabled: boolean
  onSubmit: () => void
  onClickClose: () => void
}

const CardMenuForm = (props: CardMenuFormProps) => {
  const {
    component,
    targetClassName,
    headerText,
    buttonText,
    buttonDisabled,
    onSubmit,
    onClickClose,
  } = props;

  const closeCardMenu = useCallback(({ target }) => {
    if (typeof target.className !== 'string') {
      return;
    }
    if (!target.className.includes('cardMenuForm') && !target.className.includes(targetClassName)) {
      onClickClose();
    }
  }, [onClickClose, targetClassName]);

  useEffect(() => {
    window.addEventListener('click', closeCardMenu);
    window.addEventListener('keypress', closeCardMenu);
    return () => {
      window.removeEventListener('click', closeCardMenu);
      window.removeEventListener('keypress', closeCardMenu);
    };
  }, [closeCardMenu]);

  return (
    <div className="cardMenuForm">
      <div className="cardMenuFormHeader">
        <div className="cardMenuFormHeader__text">{headerText}</div>
        <div
          role="button"
          tabIndex={0}
          onClick={onClickClose}
          onKeyPress={onClickClose}
          className="cardMenuFormHeader__close"
        >
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>
      </div>
      {component}
      <div className="cardMenuFormFooter">
        <ButtonSubmit buttonText={buttonText} onClick={onSubmit} disabled={buttonDisabled} />
      </div>
    </div>
  );
};

export default CardMenuForm;
