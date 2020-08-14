import React, { useState, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import NewBackgroundImageIcon from './NewBackgroundImageIcon';
import AngleButton from '../common/AngleButton';

const pagePer = 4;

const mapStateToProps = (state: RootState) => {
  const { backgroundImage } = state;
  return {
    backgroundImages: backgroundImage.backgroundImages,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const NewBackgroundImageIndex = (props: PropsFromRedux) => {
  const { backgroundImages } = props;

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
      <div className="newBackgroundImageIndex">
        {backgroundImages.map((image, index) => (
          index >= ((currentPage - 1) * pagePer) && index < (pagePer * currentPage)
            ? <NewBackgroundImageIcon key={image.id} image={image} />
            : null
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
