import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { Board } from '../../store/board/types';
import { fontColorDark, fontColorLight } from '../../utils/utils';

const mapStateToProps = (state: RootState) => {
  const { backgroundImage } = state;
  return {
    backgroundImages: backgroundImage.backgroundImages,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type BoardIndexCardProps = PropsFromRedux & {
  board: Board
}

export const BoardIndexCard = (props: BoardIndexCardProps) => {
  const { board, backgroundImages } = props;

  const [isHover, setHover] = useState(false);

  const backgroundImage = backgroundImages.find((image) => (
    image.id === board.backgroundImage?.backgroundImageId
  ));

  const style = {
    backgroundImage: `url(${backgroundImage?.url})`,
    color: backgroundImage?.theme === 'dark' ? fontColorDark : fontColorLight,
  };

  return (
    <Link
      to={`/board/${board.id}`}
      style={style}
      className="boardIndexCard"
      data-testid="boardIndexCard"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isHover && <div data-testid="boardIndexCardOverlay" className="boardIndexCardOverlay" />}
      <div className="boardIndexCard__title">{board.name}</div>
    </Link>
  );
};

export default connector(BoardIndexCard);
