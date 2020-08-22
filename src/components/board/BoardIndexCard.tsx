import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { Board } from '../../store/board/types';
import * as loadingActions from '../../store/loading/actions';
import { fontColorDark, fontColorLight } from '../../utils/utils';

const mapStateToProps = (state: RootState) => {
  const { backgroundImage } = state;
  return {
    backgroundImages: backgroundImage.backgroundImages,
  };
};

const mapDispatchToProps = {
  loadStart: loadingActions.loadStart,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type BoardIndexCardProps = PropsFromRedux & {
  board: Board
}

export const BoardIndexCard = (props: BoardIndexCardProps) => {
  const { board, backgroundImages, loadStart } = props;

  const [isHover, setHover] = useState(false);

  const history = useHistory();

  const onClick = () => {
    loadStart();
    history.push(`/board/${board.id}`);
  };

  const backgroundImage = backgroundImages.find((image) => (
    image.id === board.backgroundImage?.backgroundImageId
  ));

  const style = {
    backgroundImage: `url(${backgroundImage?.url})`,
    color: backgroundImage?.theme === 'dark' ? fontColorDark : fontColorLight,
  };

  return (
    <div
      data-testid="boardIndexCard"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
      style={style}
      className="boardIndexCard"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isHover && <div data-testid="boardIndexCardOverlay" className="boardIndexCardOverlay" />}
      <div className="boardIndexCard__title">{board.name}</div>
    </div>
  );
};

export default connector(BoardIndexCard);
