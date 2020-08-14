import React from 'react';

import { BackgroundImage } from '../../store/background_image/types';

type NewBackgroundImageIconProps = {
  image: BackgroundImage
}

const NewBackgroundImageIcon = (props: NewBackgroundImageIconProps) => {
  const { image } = props;

  return (
    <div className="newBackgroundImageIcon">
      <img
        src={image.url}
        alt={`background${image.id}`}
        className="newBackgroundImageIcon__image"
      />
    </div>
  );
};

export default NewBackgroundImageIcon;
