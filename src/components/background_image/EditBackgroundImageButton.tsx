import React from 'react';

import { editBackgroundImageText } from '../../utils/text';
import BoardMenuRow from '../board/BoardMenuRow';

type EditBackgroundImageButtonProps = {
  onClick: () => void
}

const EditBackgroundImageButton = (props: EditBackgroundImageButtonProps) => {
  const { onClick } = props;

  return <BoardMenuRow icon={['far', 'image']} text={editBackgroundImageText} onClick={onClick} />;
};

export default EditBackgroundImageButton;
