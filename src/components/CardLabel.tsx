import React, { useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';
import * as cardActions from '../store/card/actions';
import { CardContext } from './CardIndexContainer';

const mapStateToProps = (state: RootState) => {
  const { label } = state;
  return {
    labels: label.labels,
  };
};

const mapDispatchToProps = {
  detachLabel: cardActions.detachLabel,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardLabelProps = PropsFromRedux & {
  label: { id: number }
}

const CardLabel = (props: CardLabelProps) => {
  const { label, labels, detachLabel } = props;

  const card = useContext(CardContext);

  const targetLabel = labels.find((l) => l.id === label.id);

  const onClickLabel = () => {
    if (card) {
      detachLabel({ cardId: card.id, listId: card.listId, labelId: label.id });
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClickLabel}
      onKeyPress={onClickLabel}
      style={{ backgroundColor: targetLabel?.color }}
      className="cardLabel"
    >
      {targetLabel?.name}
    </div>
  );
};

export default connector(CardLabel);
