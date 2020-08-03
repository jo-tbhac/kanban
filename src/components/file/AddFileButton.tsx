import React from 'react';

import { addFileButtonText } from '../../utils/text';
import withUploader from './withUploader';
import ButtonNoneBorder from '../common/ButtonNoneBorder';

type AddFileButtonProps = {
  upload: () => void
}

const AddFileButton = (props: AddFileButtonProps) => {
  const { upload } = props;

  return (
    <ButtonNoneBorder buttonText={addFileButtonText} onClick={upload} />
  );
};

export default withUploader(AddFileButton);
