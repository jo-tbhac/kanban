import React, {
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card } from '../store/card/types';
import CardTitle from './CardTitle';
import CardDescription from './CardDescription';
import CardSideBar from './CardSideBar';

type CardDetailProps = {
  card: Card
  setCardDetailVisible: Dispatch<SetStateAction<boolean>>
}

const CardDetail = (props: CardDetailProps) => {
  const { card, setCardDetailVisible } = props;

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
        <div className="cardDetailHeader">
          <CardTitle initialCardTitle={card.title} cardID={card.id} />
          <div
            data-testid="cardDetailCloseButton"
            role="button"
            tabIndex={0}
            onClick={() => setCardDetailVisible(false)}
            onKeyPress={() => setCardDetailVisible(false)}
            className="cardDetailHeader__icon"
          >
            <FontAwesomeIcon icon={['fas', 'times']} />
          </div>
        </div>
        <div className="cardDetail">
          <div className="cardDetailMain">
            <div className="cardDetailRow">
              <div className="cardDetailRow__label">ラベル</div>
              <div className="cardDetailLabel">
                <div className="cardDetailLabel__text">Development</div>
                <div className="cardDetailLabel__icon">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                </div>
              </div>
            </div>

            <CardDescription cardDescription={card.description} cardID={card.id} />
          </div>
          <CardSideBar />
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
