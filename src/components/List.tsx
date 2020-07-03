import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';
import {
  useDrag,
  useDrop,
  DropTargetMonitor,
  XYCoord,
} from 'react-dnd';

import Card from './Card';
import CardForm from './CardForm';
import ListName from './ListName';
import ListMenuButton from './ListMenuButton';
import * as types from '../store/list/types';
import * as cardTypes from '../store/card/types';
import * as listActions from '../store/list/actions';
import { newCardButtonText } from '../utils/text';
import { dndItemType } from '../utils/utils';

export const CardContext = React.createContext<cardTypes.Card | null>(null);

const mapDispatchToProps = {
  moveList: listActions.moveList,
  updateListIndex: listActions.updateListIndex,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type ListProps = PropsFromRedux & {
  list: types.List
}

type DndListType = {
  type: string
  id: number
  index: number
}

const List = (props: ListProps) => {
  const { list, moveList, updateListIndex } = props;

  const [isCardFormVisible, setCardFormVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: dndItemType.LIST,
    hover: (item: DndListType, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const dropIndex = list.index;

      if (dragIndex === dropIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      if (dragIndex < dropIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > dropIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveList({ dragId: item.id, dropId: list.id });

      // eslint-disable-next-line no-param-reassign
      item.index = dropIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: dndItemType.LIST, index: list.index, id: list.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: updateListIndex,
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);
  drop(ref);

  return (
    <div ref={ref} style={{ opacity }} className="listContainer">
      <div className="listHeader">
        <ListName initialListName={list.name} listId={list.id} />
        <ListMenuButton listId={list.id} />
      </div>

      <div className="cardIndexContainer">
        {list.cards?.map((card) => (
          <CardContext.Provider key={String(card.id)} value={card}>
            <Card />
          </CardContext.Provider>
        ))}
        {isCardFormVisible && <CardForm listId={list.id} setCardFormVisible={setCardFormVisible} />}
      </div>

      <div
        data-testid="addCardButton"
        role="button"
        tabIndex={0}
        onClick={() => setCardFormVisible(true)}
        onKeyPress={() => setCardFormVisible(true)}
        className="addCardButton"
      >
        <FontAwesomeIcon icon={['fas', 'plus']} className="addCardButton__icon" />
        <div className="addCardButton__text">{newCardButtonText}</div>
      </div>
    </div>
  );
};

export default connector(List);
