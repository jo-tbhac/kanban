import React, { useState } from 'react';

import { boardMenuTitle, editBackgroundImageText } from '../../utils/text';
import SlideInMenu from '../common/SlideInMenu';
import EditBackgroundImageButton from '../background_image/EditBackgroundImageButton';
import DeleteBoardButton from './DeleteBoardButton';
import EditBackgroundImageIndex from '../background_image/EditBackgroundImageIndex';

type BoardMenuProps = {
  closeMenu: () => void
}

const BoardMenu = (props: BoardMenuProps) => {
  const { closeMenu } = props;

  const [isImageVisible, setImageVisible] = useState(false);

  const headerText = isImageVisible ? editBackgroundImageText : boardMenuTitle;

  return (
    <SlideInMenu closeMenu={closeMenu} headerText={headerText}>
      {isImageVisible ? (
        <EditBackgroundImageIndex goBackToMenu={() => setImageVisible(false)} />
      ) : (
        <>
          <EditBackgroundImageButton onClick={() => setImageVisible(true)} />
          <DeleteBoardButton />
        </>
      )}
    </SlideInMenu>
  );
};

export default BoardMenu;
