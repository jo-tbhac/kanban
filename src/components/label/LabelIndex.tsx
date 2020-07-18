import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../store';
import * as labelActions from '../../store/label/actions';
import Label from './Label';

const mapStateToProps = (state: RootState) => {
  const { label } = state;
  return {
    labels: label.labels,
  };
};

const mapDispatchToProps = {
  fetchAllLabel: labelActions.fetchAllLabel,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const LabelIndex = (props: PropsFromRedux) => {
  const { labels, fetchAllLabel } = props;

  const { boardId } = useParams();

  useEffect(() => {
    const castedBoardId = Number(boardId);
    if (castedBoardId) {
      fetchAllLabel(castedBoardId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="labelIndex">
      {labels.map((label) => <Label key={label.id} label={label} />)}
    </div>
  );
};

export default connector(LabelIndex);
