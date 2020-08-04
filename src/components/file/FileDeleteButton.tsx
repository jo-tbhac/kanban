import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { dialogTypeAsk } from '../../store/dialog/types';
import * as dialogActions from '../../store/dialog/actions';
import * as fileActions from '../../store/file/actions';
import { deleteFileText, askFileDeleteDialog } from '../../utils/text';

const mapDispatchToProps = {
  deleteFile: fileActions.deleteFile,
  openDialog: dialogActions.openDialog,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type FileDeleteButton = PropsFromRedux & {
  fileId: number
}

const FileDeleteButton = (props: FileDeleteButton) => {
  const { fileId, deleteFile, openDialog } = props;

  const onClick = () => {
    openDialog({
      type: dialogTypeAsk,
      title: askFileDeleteDialog,
      onConfirm: () => deleteFile(fileId),
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
      className="fileDeleteButton"
    >
      {deleteFileText}
    </div>
  );
};

export default connector(FileDeleteButton);
