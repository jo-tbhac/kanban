import React, { useRef, Dispatch, SetStateAction } from 'react';
import { useDrop } from 'react-dnd';
import { connect, ConnectedProps } from 'react-redux';

import Card from './Card';
import CardForm from './CardForm';
import * as cardActions from '../../store/card/actions';
import * as cardTypes from '../../store/card/types';
import { dndItemType } from '../../utils/utils';

export const CardContext = React.createContext<cardTypes.Card | null>(null);

const mapDispatchToProps = {
  moveCardToEmptyList: cardActions.moveCardToEmptyList,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CardIndexContainerProps = PropsFromRedux & {
  cards: cardTypes.Card[]
  listId: number
  isCardFormVisible: boolean
  setCardFormVisible: Dispatch<SetStateAction<boolean>>
}

const CardIndexContainer = (props: CardIndexContainerProps) => {
  const {
    cards,
    listId,
    isCardFormVisible,
    setCardFormVisible,
    moveCardToEmptyList,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: dndItemType.CARD,
    hover: (item: cardTypes.DndLCard) => {
      if (cards.length === 0) {
        moveCardToEmptyList({
          dragId: item.id,
          dragListId: item.listId,
          dropListId: listId,
        });
        /* eslint-disable no-param-reassign */
        item.index = 0;
        item.listId = listId;
        /* eslint-enable */
      }
    },
  });

  const scrollToBottom = () => {
    if (!ref || !ref.current) {
      return;
    }
    const { scrollHeight } = ref.current;
    ref.current.scrollTo(0, scrollHeight);
  };

  drop(ref);

  return (
    <div ref={ref} className="cardIndexContainer">
      {cards.map((card) => (
        <CardContext.Provider key={String(card.id)} value={card}>
          <Card />
        </CardContext.Provider>
      ))}
      {isCardFormVisible && (
        <CardForm
          listId={listId}
          setCardFormVisible={setCardFormVisible}
          scrollToBottom={scrollToBottom}
        />
      )}
    </div>
  );
};

export default connector(CardIndexContainer);
