import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import CardIndexContainer from '../card/CardIndexContainer';

import ListName from './ListName';
import ListMenuButton from './ListMenuButton';
import * as types from '../../store/list/types';
import * as listActions from '../../store/list/actions';
import { newCardButtonText } from '../../utils/text';
import { dndItemType } from '../../utils/utils';

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

export const List = (props: ListProps) => {
  const { list, moveList, updateListIndex } = props;

  const [isCardFormVisible, setCardFormVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: dndItemType.LIST,
    hover: (item: DndListType) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const dropIndex = list.index;

      if (dragIndex === dropIndex) {
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
    <div data-testid={`list-${list.id}`} ref={ref} style={{ opacity }} className="listContainer">
      <div className="listHeader">
        <ListName initialListName={list.name} listId={list.id} />
        <ListMenuButton listId={list.id} />
      </div>

      <CardIndexContainer
        cards={list.cards ? list.cards : []}
        listId={list.id}
        isCardFormVisible={isCardFormVisible}
        setCardFormVisible={setCardFormVisible}
      />

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
