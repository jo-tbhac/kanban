import React, { useState, Dispatch, SetStateAction } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

import { RootState } from '../store';
import LabelEditRow from './LabelEditRow';
import { editLabelHeaderText, newLabelButtonText } from '../utils/text';

const mapStateToProps = (state: RootState) => {
  const { label } = state;
  return {
    labels: label.labels,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type LabelEditProps = PropsFromRedux&{
  setLabelEditVisible: Dispatch<SetStateAction<boolean>>
}

const LabelEdit = (props: LabelEditProps) => {
  const { labels, setLabelEditVisible } = props;
  const [inProp, setInProp] = useState(true);

  return (
    <CSSTransition
      in={inProp}
      appear
      timeout={300}
      onExited={() => setLabelEditVisible(false)}
      classNames="labelEditContainer"
    >
      <div className="labelEditContainer">
        <div className="labelEditHeader">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setInProp(false)}
            onKeyPress={() => setInProp(false)}
            className="labelEditCloseButton"
          >
            <FontAwesomeIcon icon={['fas', 'times']} className="labelEditCloseButton__icon" />
          </div>
          <p className="labelEditHeader__title">{editLabelHeaderText}</p>
        </div>
        <div className="labelEditIndexContainer">
          {labels.map((label) => <LabelEditRow key={label.id} label={label} />)}
        </div>
        <div className="newLabelButton">
          <FontAwesomeIcon icon={['fas', 'plus']} />
          <p className="newLabelButton__text">{newLabelButtonText}</p>
        </div>
      </div>
    </CSSTransition>
  );
};

export default connector(LabelEdit);
