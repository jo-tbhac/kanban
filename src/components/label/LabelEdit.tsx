import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '../../store';
import usePreviousCount from '../../hooks/usePreviousCount';
import SlideInMenu from '../common/SlideInMenu';
import LabelEditRow from './LabelEditRow';
import LabelForm from './LabelForm';
import { editLabelHeaderText, newLabelButtonText } from '../../utils/text';

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

  const [isLabelFormVisible, setLabelFormVisible] = useState(false);
  const prevLabelCount = usePreviousCount(labels.length);

  useEffect(() => {
    if (!prevLabelCount) {
      return;
    }
    if (labels.length > prevLabelCount) {
      setLabelFormVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels]);

  return (
    <SlideInMenu headerText={editLabelHeaderText} closeMenu={() => setLabelEditVisible(false)}>
      <>
        <div data-testid="labelEdit" className="labelEditIndexContainer">
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
      </>
    </SlideInMenu>
  );
};

export default connector(LabelEdit);
