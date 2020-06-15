import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

import { RootState } from '../store';
import * as labelActions from '../store/label/actions';
import Label from './Label';
import LabelEdit from './LabelEdit';
import { editLabelButtonText } from '../utils/text';

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

  const [isLabelEditVisible, setLabelEditVisible] = useState(false);
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
        {labels.map((label) => <Label key={label.id} label={label} />)}
      </div>
      <div
        data-testid="addLabelButton"
        role="button"
        tabIndex={0}
        onClick={() => setLabelEditVisible(true)}
        onKeyPress={() => setLabelEditVisible(true)}
        className="addLabelButton"
      >
        <FontAwesomeIcon icon={['fas', 'plus']} className="addLabelButton__icon" />
        <div className="addLabelButton__text">{editLabelButtonText}</div>
      </div>
      {isLabelEditVisible && <LabelEdit setLabelEditVisible={setLabelEditVisible} />}
    </>
  );
};

export default connector(LabelIndex);
