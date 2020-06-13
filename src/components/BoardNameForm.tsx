import React, { FC, useState } from 'react';

type BoardNameFormProps = {
  setFormVisible: () => void
  initialBoardName: string
}

const BoardNameForm: FC<BoardNameFormProps> = (props) => {
  const { setFormVisible, initialBoardName } = props;
  const [boardName, setBoardName] = useState(initialBoardName);

  return (
    <input
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      type="text"
      value={boardName}
      onChange={(event) => setBoardName(event.target.value)}
      onBlur={setFormVisible}
      className="boardNameForm"
    />
  );
};

export default BoardNameForm;
