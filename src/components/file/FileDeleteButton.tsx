import React, { MouseEvent, KeyboardEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { dialogTypeAsk } from '../../store/dialog/types';
import * as dialogActions from '../../store/dialog/actions';
import * as fileActions from '../../store/file/actions';
import { deleteFileText, askFileDeleteDialog } from '../../utils/text';
import ButtonLight from '../common/ButtonLight';

const mapDispatchToProps = {
  deleteFile: fileActions.deleteFile,
  openDialog: dialogActions.openDialog,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type FileDeleteButton = PropsFromRedux & {
  fileId: number
}

export const FileDeleteButton = (props: FileDeleteButton) => {
  const { fileId, deleteFile, openDialog } = props;

  const onClick = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openDialog({
      type: dialogTypeAsk,
      title: askFileDeleteDialog,
      onConfirm: () => deleteFile(fileId),
    });
  };

  return (
    <ButtonLight text={deleteFileText} onClick={onClick} />
  );
};

export default connector(FileDeleteButton);
