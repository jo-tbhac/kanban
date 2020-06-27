import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { mockLabel } from '../../utils/mockData';
import { Store } from '../../store';
import Label from '../../components/Label';

describe('Label component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('invisible a label name component if cursor leave a label icon component', () => {
    const { queryByTestId } = render(<Label label={mockLabel} />, store);
    expect(queryByTestId('labelName')).toBeNull();
  });

  test('visible a label name component if cursor hover a label icon component', () => {
    const { getByTestId } = render(<Label label={mockLabel} />, store);
    fireEvent.mouseEnter(getByTestId('labelIcon'));

    expect(getByTestId('labelName')).toBeVisible();
    expect(getByTestId('labelName')).toHaveTextContent(mockLabel.name);
  });
});
