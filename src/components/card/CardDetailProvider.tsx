import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import CardContext from '../../context/CardContext';
import CardDetail from './CardDetail';

const mapStateToProps = (state: RootState) => {
  const { board, cardDetail } = state;
  return {
    lists: board.selectedBoard.lists,
    target: cardDetail.target,
    isDetailVisible: cardDetail.isDetailVisible,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const CardDetailProvider = (props: PropsFromRedux) => {
  const { lists, target, isDetailVisible } = props;

  const targetList = lists.find((list) => list.id === target.listId);
  const targetCard = targetList?.cards.find((card) => card.id === target.cardId);

  if (!targetCard || !isDetailVisible) {
    return null;
  }

  return (
    <CardContext.Provider value={targetCard}>
      <CardDetail />
    </CardContext.Provider>
  );
};

export default connector(CardDetailProvider);
