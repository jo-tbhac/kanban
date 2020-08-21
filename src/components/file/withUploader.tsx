import React, { useCallback, useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as fileActions from '../../store/file/actions';
import CardContext from '../../context/CardContext';

const mapDispatchToProps = {
  uploadFile: fileActions.uploadFile,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const withUploader = (WrappedComponent: any) => connector((props: PropsFromRedux) => {
  const { uploadFile } = props;

  const card = useContext(CardContext);

  const upload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target) {
        return;
      }

      const file = (target.files as FileList)[0];
      if (card) {
        uploadFile(file, card.id);
      }
    };

    input.click();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <WrappedComponent upload={upload} {...props} />;
});

export default withUploader;
