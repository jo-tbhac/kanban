import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store';

const mapStateToProps = (state: RootState) => {
  const { label } = state;
  return {
    labels: label.labels,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardLabelSmallProps = PropsFromRedux & {
  label: { id: number }
}

const CardLabelSmall = (props: CardLabelSmallProps) => {
  const { label, labels } = props;

  const targetLabel = labels.find((l) => l.id === label.id);

  return (
    <div style={{ backgroundColor: targetLabel?.color }} className="cardLabelSmall" />
  );
};

export default connector(CardLabelSmall);
