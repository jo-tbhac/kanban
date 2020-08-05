import React, { useState } from 'react';

import * as fileTypes from '../../store/file/types';
import { fileCreateCover } from '../../utils/text';
import FileDeleteButton from './FileDeleteButton';
import Lightbox from '../common/Lightbox';

type FileProps = {
  file: fileTypes.File
}

const File = (props: FileProps) => {
  const { file } = props;

  const [isLightboxVisible, setLightboxVisible] = useState(false);

  const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(file.contentType);

  const extention = (() => {
    if (isImage) {
      return '';
    }
    const result = file.displayName.match(/[^.]+$/i);
    return result ? result[0] : '';
  })();

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setLightboxVisible(true)}
        onKeyPress={() => setLightboxVisible(true)}
        className="file"
      >
        {isImage ? (
          <img src={file.url} alt={file.displayName} className="fileThumbnail" />
        ) : (
          <div className="fileThumbnail--notImage">{extention}</div>
        )}
        <div className="fileInfo">
          <div className="fileInfo__name">{file.displayName}</div>
          <div className="fileManage">
            {isImage && <div className="fileManage__cover">{fileCreateCover}</div>}
            <FileDeleteButton fileId={file.id} />
          </div>
        </div>
      </div>

      {isLightboxVisible && (
        <Lightbox
          url={file.url}
          displayName={file.displayName}
          isImage={isImage}
          close={() => setLightboxVisible(false)}
        />
      )}
    </>
  );
};

export default File;
