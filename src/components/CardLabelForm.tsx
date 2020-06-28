import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';
import CardLabelFormRow from './CardLabelFormRow';
import { addLabelText } from '../utils/text';

const mapStateToProps = (state: RootState) => {
  const { label } = state;
  return {
    labels: label.labels,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardLabelFormProps = PropsFromRedux & {
  closeCardLabelForm: () => void
}

const CardLabelForm = (props: CardLabelFormProps) => {
  const { labels, closeCardLabelForm } = props;

  return (
    <div className="cardLabelForm">
      <div className="cardLabelFormHeader">
        <div className="cardLabelFormHeader__text">{addLabelText}</div>
        <div
          role="button"
          tabIndex={0}
          onClick={closeCardLabelForm}
          onKeyPress={closeCardLabelForm}
          className="cardLabelFormHeader__closeButton"
        >
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>
      </div>

      <div className="cardLabelFormList">
        {labels.map((label) => (
          <CardLabelFormRow key={label.id} label={label} />
        ))}
      </div>
    </div>
  );
};

export default connector(CardLabelForm);
