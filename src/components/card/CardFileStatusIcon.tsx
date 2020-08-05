import React, { useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { CardContext } from './CardIndexContainer';
import CardStatus from './CardStatus';

const mapStateToProps = (state: RootState) => {
  const { file } = state;
  return {
    files: file.files,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const CardFileStatusIcon = (props: PropsFromRedux) => {
  const { files } = props;

  const card = useContext(CardContext);

  if (!card) {
    return null;
  }

  const attachedFiles = files.filter((file) => file.cardId === card.id);

  return (
    <>
      {attachedFiles.length > 0 && (
        <CardStatus icon={['fas', 'paperclip']} count={String(attachedFiles.length)} />
      )}
    </>
  );
};

export default connector(CardFileStatusIcon);
