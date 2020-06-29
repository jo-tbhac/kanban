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

type CardLabelProps = PropsFromRedux & {
  label: { id: number }
}

const CardLabel = (props: CardLabelProps) => {
  const { label, labels } = props;

  const targetLabel = labels.find((l) => l.id === label.id);

  return (
    <div style={{ backgroundColor: targetLabel?.color }} className="cardLabel">
      {targetLabel?.name}
    </div>
  );
};

export default connector(CardLabel);
