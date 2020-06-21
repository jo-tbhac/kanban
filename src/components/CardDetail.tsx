import React, {
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card } from '../store/card/types';

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
    <div className="cardDetailOverlay">
      <div className="cardDetailContainer">
        <div className="cardDetailHeader">
          <div className="cardDetailHeader__title">{card.title}</div>
          <div className="cardDetailHeader__icon">
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
            <div className="cardDetailRow">
              <div className="cardDetailRow__label">説明</div>
              <div className="cardDetailRow__description">sf mxjmehxniehxnw</div>
            </div>
          </div>
          <div className="cardDetailSideBar">
            <div className="cardDetailSideBarRow">
              <FontAwesomeIcon icon={['fas', 'paperclip']} className="cardDetailSideBarRow__icon" />
              <div className="cardDetailSideBarRow__label">添付ファイルを追加</div>
            </div>
            <div className="cardDetailSideBarRow">
              <FontAwesomeIcon icon={['fas', 'arrow-right']} className="cardDetailSideBarRow__icon" />
              <div className="cardDetailSideBarRow__label">移動</div>
            </div>
            <div className="cardDetailSideBarRow">
              <FontAwesomeIcon icon={['fas', 'trash-alt']} className="cardDetailSideBarRow__icon" />
              <div className="cardDetailSideBarRow__label">カードを削除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
