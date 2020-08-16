import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '../../store';
import { BackgroundImage } from '../../store/background_image/types';
import * as boardActions from '../../store/board/actions';

const mapStateToProps = (state: RootState) => {
  const { board } = state;
  return {
    selectedBoard: board.selectedBoard,
  };
};

const mapDispatchToProps = {
  updateBackgroundImage: boardActions.updateBackgroundImage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type EditBackgroundImageIconProps = PropsFromRedux & {
  image: BackgroundImage
}

const EditBackgroundImageIcon = (props: EditBackgroundImageIconProps) => {
  const { image, selectedBoard, updateBackgroundImage } = props;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => updateBackgroundImage(selectedBoard.id, image.id)}
      onKeyPress={() => updateBackgroundImage(selectedBoard.id, image.id)}
      className="editBackgroundImageIcon"
    >
      <img
        src={image.url}
        alt={`background${image.id}`}
        className="editBackgroundImageIcon__image"
      />
      {image.id === selectedBoard.backgroundImage?.backgroundImageId && (
        <div className="editBackgroundImageIconOverlay">
          <FontAwesomeIcon icon={['fas', 'check']} />
        </div>
      )}
    </div>
  );
};

export default connector(EditBackgroundImageIcon);
