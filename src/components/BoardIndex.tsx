import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as boardActions from '../store/board/actions';
import dataStore from '../tmp_dataStore';

const mapDispatchToProps = {
  showBoard: boardActions.showBoard,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const BoardIndex = (props: PropsFromRedux) => {
  const { showBoard } = props;

  return (
    <div className="boardIndexContainer">
      {dataStore.map((data) => (
        <div
          className="boardIndexCard"
          key={data.id}
          onClick={showBoard}
          onKeyPress={showBoard}
          role="button"
          tabIndex={0}
        >
          <div className="boardIndexCardTop">
            <div className="boardIndexCardTop__title">{data.title}</div>
          </div>
          <div className="boardIndexCardBottom">
            <div className="boardIndexCardBottom__label">Updated at</div>
            <div>{data.updatedAt}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default connector(BoardIndex);
