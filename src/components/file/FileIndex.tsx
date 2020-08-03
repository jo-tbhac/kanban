import React, { useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { CardContext } from '../card/CardIndexContainer';
import { fileHeaderLabel } from '../../utils/text';
import File from './File';

const mapStateToPrpos = (state: RootState) => {
  const { file } = state;
  return {
    files: file.files,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToPrpos, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const FileIndex = (props: PropsFromRedux) => {
  const { files } = props;

  const card = useContext(CardContext);

  if (!card) {
    return null;
  }

  const cardFiles = files.filter((file) => file.cardId === card.id);

  return (
    <div className="fileIndex">
      <div className="fileIndexHeader">
        <div className="fileIndexHeader__label">{fileHeaderLabel}</div>
      </div>
      <div className="fileIndexContainer">
        {cardFiles.map((file) => <File file={file} key={file.id} />)}
      </div>
    </div>
  );
};

export default connector(FileIndex);
