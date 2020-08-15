import React, {
  useState,
  useMemo,
  SetStateAction,
  Dispatch,
} from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import NewBackgroundImageIcon from './NewBackgroundImageIcon';
import AngleButton from '../common/AngleButton';

export const pagePer = 4;

const mapStateToProps = (state: RootState) => {
  const { backgroundImage } = state;
  return {
    backgroundImages: backgroundImage.backgroundImages,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type NewBackgroundImageIndexProps = PropsFromRedux & {
  selectImage: Dispatch<SetStateAction<number>>
  selectedImageId: number
}

export const NewBackgroundImageIndex = (props: NewBackgroundImageIndexProps) => {
  const { backgroundImages, selectImage, selectedImageId } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = useMemo(() => (
    backgroundImages.length / pagePer
  ), [backgroundImages.length]);

  return (
    <div className="newBackgroundImageIndexContainer">
      <AngleButton
        icon={['fas', 'angle-left']}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 1}
      />
      <div data-testid="newBackgroundImageIndex" className="newBackgroundImageIndex">
        {backgroundImages.map((image, index) => (
          index >= ((currentPage - 1) * pagePer) && index < (pagePer * currentPage)
            ? (
              <NewBackgroundImageIcon
                key={image.id}
                image={image}
                selectImage={selectImage}
                selectedImageId={selectedImageId}
              />
            ) : null
        ))}
      </div>
      <AngleButton
        icon={['fas', 'angle-right']}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={maxPage <= currentPage}
      />
    </div>
  );
};

export default connector(NewBackgroundImageIndex);
