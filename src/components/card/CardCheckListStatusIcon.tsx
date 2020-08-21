import React, { useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CardContext from '../../context/CardContext';
import { RootState } from '../../store';
import CardStatus from './CardStatus';

const mapStateToProps = (state: RootState) => {
  const { checkList } = state;
  return {
    checkLists: checkList.checkLists,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const CardCheckListStatusIcon = (props: PropsFromRedux) => {
  const { checkLists } = props;

  const card = useContext(CardContext);

  if (!card) {
    return null;
  }

  const cardCheckLists = checkLists.filter((c) => c.cardId === card.id);

  const checkListCount: { check: number, unCheck: number } = (() => {
    let checkCount: number = 0;
    let unCheckCount: number = 0;

    for (let i = 0; i < cardCheckLists.length; i += 1) {
      const cardCheckList = cardCheckLists[i];
      for (let ii = 0; ii < cardCheckList.items.length; ii += 1) {
        if (cardCheckList.items[ii].check) {
          checkCount += 1;
        } else {
          unCheckCount += 1;
        }
      }
    }
    return { check: checkCount, unCheck: unCheckCount };
  })();

  const totalCheckListItemCount = checkListCount.check + checkListCount.unCheck;
  const modifire = totalCheckListItemCount === checkListCount.check ? '--complete' : '';

  return (
    <>
      {cardCheckLists.length > 0 && (
        <CardStatus
          icon={['far', 'check-square']}
          className={`cardStatus${modifire}`}
          count={`${checkListCount.check}/${totalCheckListItemCount}`}
        />
      )}
    </>
  );
};

export default connector(CardCheckListStatusIcon);
