import React, { useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CardSideBarButton from './CardSideBarButton';
import { CardContext } from './CardIndexContainer';
import { dialogTypeAsk } from '../../store/dialog/types';
import * as dialogAction from '../../store/dialog/actions';
import * as cardAction from '../../store/card/actions';
import { deleteCardButtonText, askCardDeleteDialog } from '../../utils/text';

const mapDispatchToProps = {
  openDialog: dialogAction.openDialog,
  deleteCard: cardAction.deleteCard,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const CardSideBarDeleteButton = (props: PropsFromRedux) => {
  const { openDialog, deleteCard } = props;

  const card = useContext(CardContext);

  const onClickDelete = () => {
    if (card === null) {
      return;
    }

    openDialog({
      type: dialogTypeAsk,
      title: askCardDeleteDialog,
      onConfirm: () => deleteCard(card.id, card.listId),
    });
  };

  return (
    <CardSideBarButton
      text={deleteCardButtonText}
      icon={['fas', 'trash-alt']}
      onClick={onClickDelete}
    />
  );
};

export default connector(CardSideBarDeleteButton);
