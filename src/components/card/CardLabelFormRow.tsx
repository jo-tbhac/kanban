import React, { useContext, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as cardActions from '../../store/card/actions';
import { Label } from '../../store/label/types';
import CardContext from '../../context/CardContext';

const mapDispatchToProps = {
  attachLabel: cardActions.attachLabel,
  detachLabel: cardActions.detachLabel,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardLabelFormRowProps = PropsFromRedux & {
  label: Label
}

export const CardLabelFormRow = (props: CardLabelFormRowProps) => {
  const { label, attachLabel, detachLabel } = props;

  const card = useContext(CardContext);

  const [isAttached, setIsAttached] = useState(() => {
    const labelIds = card?.labels?.map((l) => l.id);
    return labelIds?.includes(label.id);
  });

  const modifire = isAttached ? '--attached' : '';

  const onClickLabel = () => {
    if (card === null) {
      return;
    }

    const payload = { cardId: card.id, listId: card.listId, labelId: label.id };
    if (isAttached) {
      detachLabel(payload);
    } else {
      attachLabel(payload);
    }
    setIsAttached(!isAttached);
  };

  return (
    <div
      data-testid={`cardLabelFormRow-${label.id}`}
      role="button"
      tabIndex={0}
      onClick={onClickLabel}
      onKeyPress={onClickLabel}
      style={{ backgroundColor: label.color }}
      className={`cardLabelFormRow${modifire}`}
    >
      <span className="cardLabelFormRow__name">{label.name}</span>
    </div>
  );
};

export default connector(CardLabelFormRow);
