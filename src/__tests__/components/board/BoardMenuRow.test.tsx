import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import BoardMenuRow from '../../../components/board/BoardMenuRow';

describe('BoardMenuRow component', () => {
  let store: Store;
  let onClick: jest.Mock;
  const icon = ['fas', 'times'] as IconProp;

  beforeEach(() => {
    store = storeFactory();
    onClick = jest.fn();
  });

  test('should render a text that provided from props', () => {
    const text = 'board row';
    const { getByText } = render(
      <BoardMenuRow icon={icon} text={text} onClick={onClick} />,
      store,
    );
    expect(getByText(text)).not.toBeNull();
  });

  test('should call `onClick` upon click a component', () => {
    const { getByRole } = render(
      <BoardMenuRow icon={icon} text="" onClick={onClick} />,
      store,
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
