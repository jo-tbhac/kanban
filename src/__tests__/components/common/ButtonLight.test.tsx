import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import ButtonLight from '../../../components/common/ButtonLight';

describe('ButtonLight component', () => {
  let store: Store;
  let onClick: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    onClick = jest.fn();
  });

  test('should call `onClick` upon click a component', () => {
    const { getByRole } = render(<ButtonLight text="" onClick={onClick} />, store);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  test('should render a text that provided from props', () => {
    const text = 'sdcmf; aof';
    const { getByRole } = render(<ButtonLight text={text} onClick={onClick} />, store);
    expect(getByRole('button')).toHaveTextContent(text);
  });
});
