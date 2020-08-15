import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BackgroundImage } from '../../store/background_image/types';

type NewBackgroundImageIconProps = {
  image: BackgroundImage
  selectImage: Dispatch<SetStateAction<number>>
  selectedImageId: number
}

const NewBackgroundImageIcon = (props: NewBackgroundImageIconProps) => {
  const { image, selectImage, selectedImageId } = props;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => selectImage(image.id)}
      onKeyPress={() => selectImage(image.id)}
      className="newBackgroundImageIcon"
    >
      <img
        src={image.url}
        alt={`background${image.id}`}
        className="newBackgroundImageIcon__image"
      />
      {selectedImageId === image.id && (
        <div className="newBackgroundImageIconOverlay">
          <FontAwesomeIcon icon={['fas', 'check']} />
        </div>
      )}
    </div>
  );
};

export default NewBackgroundImageIcon;
