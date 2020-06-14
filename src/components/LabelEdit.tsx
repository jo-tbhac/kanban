import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '../store';
import LabelEditRow from './LabelEditRow';

const mapStateToProps = (state: RootState) => {
  const { label } = state;
  return {
    labels: label.labels,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const LabelEdit = (props: PropsFromRedux) => {
  const { labels } = props;

  return (
    <div className="labelEditContainer">
      <div className="labelEditHeader">
        <div className="labelEditCloseButton">
          <FontAwesomeIcon icon={['fas', 'times']} className="labelEditCloseButton__icon" />
        </div>
        <p className="labelEditHeader__title">ラベル一覧</p>
      </div>
      <div className="labelEditIndexContainer">
        {labels.map((label) => <LabelEditRow key={label.id} label={label} />)}
      </div>
      <div className="newLabelButton">
        <FontAwesomeIcon icon={['fas', 'plus']} />
        <p className="newLabelButton__text">ラベルを新規作成</p>
      </div>
    </div>
  );
};

export default connector(LabelEdit);
