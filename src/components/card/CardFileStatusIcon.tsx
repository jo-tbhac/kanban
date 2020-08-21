import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { Card } from '../../store/card/types';
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

type CardFileStatusIconProps = PropsFromRedux & {
  card: Card
}

export const CardFileStatusIcon = (props: CardFileStatusIconProps) => {
  const { files, card } = props;

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
