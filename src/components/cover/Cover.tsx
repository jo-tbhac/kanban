import React, { useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { CardContext } from '../card/CardIndexContainer';

const mapStateToProps = (state: RootState) => {
  const { file } = state;
  return {
    files: file.files,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const Cover = (props: PropsFromRedux) => {
  const { files } = props;

  const card = useContext(CardContext);

  const cover = files.find((file) => file.id === card?.cover?.fileId);

  if (!cover) {
    return null;
  }

  return (
    <div data-testid="cover" className="coverContainer">
      <img src={cover.url} alt={cover.displayName} className="cover" />
    </div>
  );
};

export default connector(Cover);
