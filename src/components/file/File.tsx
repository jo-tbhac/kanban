import React from 'react';

import * as fileTypes from '../../store/file/types';
import { fileCreateCover, deleteFileText } from '../../utils/text';

type FileProps = {
  file: fileTypes.File
}

const File = (props: FileProps) => {
  const { file } = props;

  const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(file.contentType);

  const extention = (() => {
    if (isImage) {
      return '';
    }
    const result = file.displayName.match(/[^.]+$/i);
    return result ? result[0] : '';
  })();

  return (
    <div className="file">
      {isImage ? (
        <img src={file.url} alt={file.displayName} className="fileThumbnail" />
      ) : (
        <div className="fileThumbnail--notImage">{extention}</div>
      )}
      <div className="fileInfo">
        <div className="fileInfo__name">{file.displayName}</div>
        <div className="fileManage">
          {isImage && <div className="fileManage__cover">{fileCreateCover}</div>}
          <div className="fileManage__delete">{deleteFileText}</div>
        </div>
      </div>
    </div>
  );
};

export default File;
