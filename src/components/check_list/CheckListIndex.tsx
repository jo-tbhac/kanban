import React, { useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CardContext from '../../context/CardContext';
import { RootState } from '../../store';
import CheckList from './CheckList';

const mapStateToProps = (state: RootState) => {
  const { checkList } = state;
  return {
    checkLists: checkList.checkLists,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const CheckListIndex = (props: PropsFromRedux) => {
  const { checkLists } = props;

  const card = useContext(CardContext);

  if (!card) {
    return null;
  }

  const cardCheckLists = checkLists.filter((c) => c.cardId === card.id);

  return (
    <>
      {cardCheckLists.map((checkList) => (
        <CheckList key={checkList.id} checkList={checkList} />
      ))}
    </>
  );
};

export default connector(CheckListIndex);
