import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

import { RootState } from '../store';
import * as labelActions from '../store/label/actions';
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

const LabelIndex = (props: PropsFromRedux) => {
  const { labels, fetchAllLabel } = props;
  const { boardID } = useParams();

  useEffect(() => {
    const castedBoardID = Number(boardID);
    if (castedBoardID) {
      fetchAllLabel(castedBoardID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="labelContainer">
        {labels.map((label) => <Label label={label} />)}
      </div>
      <div className="addLabelButton">
        <FontAwesomeIcon icon={['fas', 'plus']} className="addLabelButton__icon" />
        <div className="addLabelButton__text">Add label</div>
      </div>
    </>
  );
};

export default connector(LabelIndex);
