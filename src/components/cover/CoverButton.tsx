import React, { useContext } from 'react';

import { CardContext } from '../card/CardIndexContainer';
import CreateCoverButton from './CreateCoverButton';
import DeleteCoverButton from './DeleteCoverButton';

type CoverButtonProps = {
  fileId: number
}

const CoverButton = (props: CoverButtonProps) => {
  const { fileId } = props;

  const card = useContext(CardContext);

  return (
    <>
      {card?.cover?.fileId === fileId
        ? <DeleteCoverButton />
        : <CreateCoverButton fileId={fileId} />}
    </>
  );
};

export default CoverButton;
