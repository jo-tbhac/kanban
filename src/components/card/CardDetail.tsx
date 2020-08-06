import React, {
  useEffect,
  useCallback,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CardContext } from './CardIndexContainer';
import CardTitle from './CardTitle';
import CardLabelContainer from './CardLabelContainer';
import CardDescription from './CardDescription';
import CheckListIndex from '../check_list/CheckListIndex';
import FileIndex from '../file/FileIndex';
import CardSideBar from './CardSideBar';
import Cover from '../cover/Cover';

type CardDetailProps = {
  setCardDetailVisible: Dispatch<SetStateAction<boolean>>
}

const CardDetail = (props: CardDetailProps) => {
  const { setCardDetailVisible } = props;

  const card = useContext(CardContext);

  const onClickOverlayEvent = useCallback((event: MouseEvent) => {
    const element = event.target as HTMLElement;
    if (element.className === 'cardDetailOverlay') {
      setCardDetailVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('click', onClickOverlayEvent);
    return () => {
      window.removeEventListener('click', onClickOverlayEvent);
    };
  }, [onClickOverlayEvent]);

  return (
    <div data-testid="cardDetail" className="cardDetailOverlay">
      <div className="cardDetailContainer">
        {card?.cover && <Cover />}

        <div
          data-testid="cardDetailCloseButton"
          role="button"
          tabIndex={0}
          onClick={() => setCardDetailVisible(false)}
          onKeyPress={() => setCardDetailVisible(false)}
          className="cardDetailCloseButton"
        >
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>

        <div className="cardDetailHeader">
          <CardTitle />
        </div>
        <div className="cardDetail">
          <div className="cardDetailMain">
            <CardLabelContainer />
            <CardDescription />
            <CheckListIndex />
            <FileIndex />
          </div>
          <CardSideBar />
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
