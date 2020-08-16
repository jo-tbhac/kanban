import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from '../../store';
import { goBackBoardMenuText } from '../../utils/text';
import EditBackgroundImageIcon from './EditBackgroundImageIcon';

const mapStateToProps = (state: RootState) => {
  const { backgroundImage } = state;
  return {
    backgroundImages: backgroundImage.backgroundImages,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type EditBackgroundImageIndexProps = PropsFromRedux & {
  goBackToMenu: () => void
}

export const EditBackgroundImageIndex = (props: EditBackgroundImageIndexProps) => {
  const { backgroundImages, goBackToMenu } = props;

  return (
    <>
      <div
        data-testid="editBackgroundImageCloseButton"
        role="button"
        tabIndex={0}
        onClick={goBackToMenu}
        onKeyPress={goBackToMenu}
        className="editBackgroundImageCloseButton"
      >
        <FontAwesomeIcon icon={['fas', 'angle-left']} />
        <div className="editBackgroundImageCloseButton__text">{goBackBoardMenuText}</div>
      </div>
      <div data-testid="editBackgroundImageIndex" className="editBackgroundImageIndex">
        {backgroundImages.map((image) => <EditBackgroundImageIcon key={image.id} image={image} />)}
      </div>
    </>
  );
};

export default connector(EditBackgroundImageIndex);
