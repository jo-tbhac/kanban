import React, { useContext, MouseEvent, KeyboardEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as coverActions from '../../store/cover/actions';
import { CardContext } from '../card/CardIndexContainer';
import { deleteCoverButtonText } from '../../utils/text';
import ButtonLight from '../common/ButtonLight';

const mapDispatchToProps = {
  deleteCover: coverActions.deleteCover,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const DeleteCoverButton = (props: PropsFromRedux) => {
  const { deleteCover } = props;

  const card = useContext(CardContext);

  const onClick = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (card) {
      deleteCover(card.listId, card.id);
    }
  };

  return (
    <ButtonLight text={deleteCoverButtonText} onClick={onClick} />
  );
};

export default connector(DeleteCoverButton);
