import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { ThemeTypes, darkTheme } from '../../store/background_image/types';
import { fontColorDark, fontColorLight } from '../../utils/utils';
import Header from '../common/Header';
import Board from './Board';

export const ThemeContext = React.createContext<ThemeTypes | undefined>(undefined);

const mapStateToProps = (state: RootState) => {
  const { board, backgroundImage } = state;
  return {
    selectedBoard: board.selectedBoard,
    backgroundImages: backgroundImage.backgroundImages,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const BoardWrapper = (props: PropsFromRedux) => {
  const { selectedBoard, backgroundImages } = props;

  const backgroundImage = backgroundImages.find((image) => (
    image.id === selectedBoard.backgroundImage?.backgroundImageId
  ));

  const style = {
    backgroundImage: `url(${backgroundImage?.url})`,
    color: backgroundImage?.theme === darkTheme ? fontColorDark : fontColorLight,
  };

  return (
    <ThemeContext.Provider value={backgroundImage?.theme}>
      <div data-testid="boardWrapper" style={style} className="boardWrapper">
        <Header />
        <Board />
      </div>
    </ThemeContext.Provider>
  );
};

export default connector(BoardWrapper);
