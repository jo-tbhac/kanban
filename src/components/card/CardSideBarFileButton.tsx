import React from 'react';

import { addFileButtonText } from '../../utils/text';
import withUploader from '../file/withUploader';
import CardSideBarButton from './CardSideBarButton';

type CardSideBarFileButtonProps = {
  upload: () => void
}

const CardSideBarFileButton = (props: CardSideBarFileButtonProps) => {
  const { upload } = props;

  return (
    <CardSideBarButton
      icon={['fas', 'paperclip']}
      text={addFileButtonText}
      onClick={upload}
    />
  );
};

export default withUploader(CardSideBarFileButton);
