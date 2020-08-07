import React, { useContext, MouseEvent, KeyboardEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { CardContext } from '../card/CardIndexContainer';
import * as coverActions from '../../store/cover/actions';
import { fileCreateCover } from '../../utils/text';

const mapDispatchToProps = {
  createCover: coverActions.createCover,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CreateCoverButtonProps = PropsFromRedux & {
  fileId: number
}

export const CreateCoverButton = (props: CreateCoverButtonProps) => {
  const { createCover, fileId } = props;

  const card = useContext(CardContext);

  const onClick = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (card) {
      createCover(card.listId, card.id, fileId);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
      className="createCoverButton"
    >
      {fileCreateCover}
    </div>
  );
};

export default connector(CreateCoverButton);
