import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { Card } from '../../store/card/types';

const mapStateToProps = (state: RootState) => {
  const { file } = state;
  return {
    files: file.files,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CoverProps = PropsFromRedux & {
  card: Card
}

const Cover = (props: CoverProps) => {
  const { files, card } = props;

  const cover = files.find((file) => file.id === card.cover?.fileId);

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
