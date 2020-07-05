import React, { useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { DndLCard } from '../store/card/types';
import * as cardActions from '../store/card/actions';
import { CardContext } from './CardIndexContainer';
import CardDetail from './CardDetail';
import CardLabelSmall from './CardLabelSmall';
import { dndItemType } from '../utils/utils';

const mapDisaptchToProps = {
  moveCard: cardActions.moveCard,
  moveCardAcrossList: cardActions.moveCardAcrossList,
  updateCardIndex: cardActions.updateCardIndex,
};

const connector = connect(null, mapDisaptchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const Card = (props: PropsFromRedux) => {
  const { moveCard, moveCardAcrossList, updateCardIndex } = props;

  const card = useContext(CardContext);

  const [isCardDetailVisible, setCardDetailVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [dndItem, drop] = useDrop({
    accept: dndItemType.CARD,
    collect: (monitor) => monitor.getItem(),
    canDrop: () => false,
    hover: (item: DndLCard) => {
      if (!ref.current || !card) {
        return;
      }
      const dragIndex = item.index;
      const dropIndex = card.index;
      const dragListId = item.listId;
      const dropListId = card.listId;

      if (dragIndex === dropIndex && dragListId === dropListId) {
        return;
      }

      if (dragListId === dropListId) {
        moveCard({
          dragId: item.id,
          dropId: card.id,
          listId: card.listId,
        });
        // eslint-disable-next-line no-param-reassign
        item.index = dropIndex;
        return;
      }

      moveCardAcrossList({
        dragId: item.id,
        dropId: card.id,
        dragListId,
        dropListId,
      });
      /* eslint-disable no-param-reassign */
      item.index = dropIndex;
      item.listId = dropListId;
      /* eslint-enable */
    },
  });

  const [, drag] = useDrag({
    item: {
      type: dndItemType.CARD,
      index: card?.index,
      id: card?.id,
      listId: card?.listId,
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: (item) => {
      const dragListId = card?.listId;
      const dropListId = item?.listId;
      if (!dragListId || !dropListId) {
        return;
      }
      updateCardIndex({ dragListId, dropListId });
    },
  });

  const opacity = card?.id === dndItem?.id && dndItem.type === dndItemType.CARD ? 0.2 : 1;
  drag(ref);
  drop(ref);

  return (
    <>
      <div
        data-testid="card"
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={() => setCardDetailVisible(true)}
        onKeyPress={() => setCardDetailVisible(true)}
        style={{ opacity }}
        className="card"
      >
        <div className="cardLabelWrapper">
          {card?.labels?.map((label) => (
            <CardLabelSmall key={`${card.id}-${label.id}`} label={label} />
          ))}
        </div>

        <div className="card__title">{card?.title}</div>

        <div className="cardStatusContainer">
          <div className="cardStatus">
            <FontAwesomeIcon icon={['fas', 'paperclip']} className="cardStatus__icon" />
            <div className="cardStatus__count">1</div>
          </div>
        </div>
      </div>
      {isCardDetailVisible
        && <CardDetail setCardDetailVisible={setCardDetailVisible} />}
    </>
  );
};

export default connector(Card);
