import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import CardLabelFormRow from './CardLabelFormRow';
import { addLabelText } from '../../utils/text';

const mapStateToProps = (state: RootState) => {
  const { label } = state;
  return {
    labels: label.labels,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardLabelFormProps = PropsFromRedux & {
  closeCardLabelForm: () => void
  position: { top: number, left: number }
}

export const CardLabelForm = (props: CardLabelFormProps) => {
  const { labels, closeCardLabelForm, position } = props;

  const [elementHeight, setElementHeight] = useState({});

  const ref = useRef<HTMLDivElement>(null);

  const onResizeEnd = useCallback(() => {
    if (!ref || !ref.current) {
      return;
    }
    const { clientHeight } = ref.current;
    const overflowElementY = window.innerHeight - (clientHeight + position.top);
    setElementHeight({ maxHeight: clientHeight + overflowElementY });
  }, [position.top]);

  useEffect(() => {
    window.addEventListener('resize', onResizeEnd);
    return () => window.removeEventListener('resize', onResizeEnd);
  }, [onResizeEnd]);

  return (
    <div
      id="cardLabelForm"
      ref={ref}
      data-testid="cardLabelForm"
      style={{ ...position, ...elementHeight }}
      className="cardLabelForm"
    >
      <div className="cardLabelFormHeader">
        <div className="cardLabelFormHeader__text">{addLabelText}</div>
        <div
          data-testid="cardLabelFormCloseButton"
          role="button"
          tabIndex={0}
          onClick={closeCardLabelForm}
          onKeyPress={closeCardLabelForm}
          className="cardLabelFormHeader__closeButton"
        >
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>
      </div>

      <div className="cardLabelFormList">
        {labels.map((label) => (
          <CardLabelFormRow key={label.id} label={label} />
        ))}
      </div>
    </div>
  );
};

export default connector(CardLabelForm);
