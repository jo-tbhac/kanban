import React from 'react';

import dataStore from '../tmp_dataStore';

const BoardIndex = () => (
  <div className="boardIndexContainer">
    {dataStore.map((data) => (
      <div className="boardIndexCard" key={data.id}>
        <div className="boardIndexCardTop">
          <div className="boardIndexCardTop__title">{data.title}</div>
        </div>
        <div className="boardIndexCardBottom">
          <div className="boardIndexCardBottom__label">Updated at</div>
          <div>{data.updated_at}</div>
        </div>
      </div>
    ))}
  </div>
);

export default BoardIndex;
