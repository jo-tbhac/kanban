import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';

import usePreviousCount from '../../hooks/usePreviousCount';
import { RootState } from '../../store';
import * as boardActions from '../../store/board/actions';
import { boardNameFormPlaceholder, createButtonText } from '../../utils/text';
import ButtonSubmit from '../common/ButtonSubmit';
import ButtonCancel from '../common/ButtonCancel';
import NewBoardCard from './NewBoardCard';
import NewBackgroundImageIndex from '../background_image/NewBackgroundImageIndex';

const mapStateToProps = (state: RootState) => {
  const { board, backgroundImage } = state;
  return {
    boards: board.boards,
    backgroundImages: backgroundImage.backgroundImages,
  };
};

const mapDispatchToProps = {
  createBoard: boardActions.createBoard,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const BoardForm = (props: PropsFromRedux) => {
  const { createBoard, boards, backgroundImages } = props;

  const prevBoardsCount = usePreviousCount(boards.length);

  const [boardName, setBoardName] = useState('');
  const [selectedImageId, selectImage] = useState(1);
  const [isFormVisible, setFormVisible] = useState(false);

  const history = useHistory();

  const isCompleteFetchBoards = useRef(true);

  useEffect(() => {
    if (prevBoardsCount === undefined) {
      return;
    }

    if (isCompleteFetchBoards.current) {
      isCompleteFetchBoards.current = false;
      return;
    }

    const len = boards.length;
    if (prevBoardsCount < len) {
      const boardId = boards[len - 1].id;
      history.push(`/board/${boardId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

  const onClickSubmit = () => {
    const params = { name: boardName, backgroundImageId: selectedImageId };
    createBoard(params);
  };

  const onCancel = () => {
    setBoardName('');
    setFormVisible(false);
  };

  const showForm = useCallback(() => {
    setFormVisible(true);
  }, []);

  const selectedImage = backgroundImages.find((image) => image.id === selectedImageId);
  const style = { backgroundImage: `url(${selectedImage?.url})` };

  return (
    <>
      {isFormVisible ? (
        <div className="boardFormWrapper">
          <div data-testid="newBoardForm" style={style} className="boardFormCard">
            <div className="boardFormCardInput">
              <input
                data-testid="boardNameTextField"
                type="text"
                value={boardName}
                onChange={(event) => setBoardName(event.target.value)}
                className="boardFormCardInput__title"
                placeholder={boardNameFormPlaceholder}
              />
            </div>
            <div className="boardFormCardButton">
              <ButtonCancel onClick={onCancel} />
              <ButtonSubmit
                onClick={onClickSubmit}
                disabled={boardName === ''}
                buttonText={createButtonText}
              />
            </div>
          </div>
          <NewBackgroundImageIndex selectImage={selectImage} selectedImageId={selectedImageId} />
        </div>
      ) : (
        <NewBoardCard showForm={showForm} />
      )}
    </>
  );
};

export default connector(BoardForm);
