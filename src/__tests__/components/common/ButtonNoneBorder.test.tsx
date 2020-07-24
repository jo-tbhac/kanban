import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import ButtonNoneBorder from '../../../components/common/ButtonNoneBorder';

describe('ButtonNoneBorder component', () => {
  let store: Store;
  let onClick: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    onClick = jest.fn();
  });

  test('should call `onClick` upon press a component', () => {
    const { getByRole } = render(<ButtonNoneBorder buttonText="title" onClick={onClick} />, store);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
