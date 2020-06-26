import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import { CardContext } from './List';
import { dialogTypeAsk } from '../store/dialog/types';
import * as dialogAction from '../store/dialog/actions';
import * as cardAction from '../store/card/actions';
import { deleteCardButtonText, askCardDeleteDialog } from '../utils/text';

const mapDispatchToProps = {
  openDialog: dialogAction.openDialog,
  deleteCard: cardAction.deleteCard,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const CardSideBarRowDelete = (props: PropsFromRedux) => {
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
    <div
      role="button"
      tabIndex={0}
      onClick={onClickDelete}
      onKeyPress={onClickDelete}
      className="cardSideBarRowDelete"
    >
      <FontAwesomeIcon icon={['fas', 'trash-alt']} className="cardSideBarRowDelete__icon" />
      <div className="cardSideBarRowDelete__label">{deleteCardButtonText}</div>
    </div>
  );
};

export default connector(CardSideBarRowDelete);
