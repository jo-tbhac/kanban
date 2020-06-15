import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

import { RootState } from '../store';
import LabelEditRow from './LabelEditRow';
import LabelForm from './LabelForm';
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

const usePreviousLabelCount = (count: number) => {
  const ref: {current: number} = useRef(0);
  useEffect(() => {
    ref.current = count;
  });
  return ref.current;
};

const LabelEdit = (props: LabelEditProps) => {
  const { labels, setLabelEditVisible } = props;

  const [inProp, setInProp] = useState(true);
  const [isLabelFormVisible, setLabelFormVisible] = useState(false);
  const prevLabelCount = usePreviousLabelCount(labels.length);

  useEffect(() => {
    if (labels.length > prevLabelCount) {
      setLabelFormVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels]);

  return (
    <CSSTransition
      in={inProp}
      appear
      timeout={300}
      onExited={() => setLabelEditVisible(false)}
      classNames="labelEditContainer"
    >
      <div data-testid="labelEdit" className="labelEditContainer">
        <div className="labelEditHeader">
          <div
            data-testid="labelEditCloseButton"
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
        {isLabelFormVisible ? <LabelForm setLabelFormVisible={setLabelFormVisible} /> : (
          <div
            data-testid="newLabelButton"
            role="button"
            tabIndex={0}
            onClick={() => setLabelFormVisible(true)}
            onKeyPress={() => setLabelFormVisible(true)}
            className="newLabelButton"
          >
            <FontAwesomeIcon icon={['fas', 'plus']} />
            <p className="newLabelButton__text">{newLabelButtonText}</p>
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

export default connector(LabelEdit);
