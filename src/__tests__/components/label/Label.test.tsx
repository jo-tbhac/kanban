import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { mockLabel } from '../../../utils/mockData';
import { Store } from '../../../store';
import { Label } from '../../../components/label/Label';

describe('Label component', () => {
  let store: Store;
  let selectedLabelIds: number[];
  let checkLabel: jest.Mock;
  let uncheckLabel: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    selectedLabelIds = [];
    checkLabel = jest.fn();
    uncheckLabel = jest.fn();
  });

  test('invisible a label name component if cursor leave a label icon component', () => {
    const { queryByTestId } = render(
      <Label
        label={mockLabel}
        selectedLabelIds={selectedLabelIds}
        checkLabel={checkLabel}
        uncheckLabel={uncheckLabel}
      />,
      store,
    );
    expect(queryByTestId('labelName')).toBeNull();
  });

  test('visible a label name component if cursor hover a label icon component', () => {
    const { getByTestId } = render(
      <Label
        label={mockLabel}
        selectedLabelIds={selectedLabelIds}
        checkLabel={checkLabel}
        uncheckLabel={uncheckLabel}
      />,
      store,
    );
    fireEvent.mouseEnter(getByTestId('labelIcon'));

    expect(getByTestId('labelName')).toBeVisible();
    expect(getByTestId('labelName')).toHaveTextContent(mockLabel.name);
  });

  test('should have a class name `label__icon--checked` if props of `selectedLabelIds` includes label.id', () => {
    const labelId = 1;
    const targetLabel = { ...mockLabel, id: labelId };
    selectedLabelIds = [labelId];

    const { getByTestId } = render(
      <Label
        label={targetLabel}
        selectedLabelIds={selectedLabelIds}
        checkLabel={checkLabel}
        uncheckLabel={uncheckLabel}
      />,
      store,
    );

    expect(getByTestId('labelIcon')).toHaveClass('label__icon--checked');
  });

  test('should have a class name `label__icon` if props of `selectedLabelIds` does not include label.id', () => {
    const { getByTestId } = render(
      <Label
        label={mockLabel}
        selectedLabelIds={selectedLabelIds}
        checkLabel={checkLabel}
        uncheckLabel={uncheckLabel}
      />,
      store,
    );

    expect(getByTestId('labelIcon')).toHaveClass('label__icon');
  });

  test('should call `uncheckLabel` if props of `selectedLabelIds` includes label.id when click a label icon component', () => {
    const labelId = 1;
    const targetLabel = { ...mockLabel, id: labelId };
    selectedLabelIds = [labelId];

    const { getByTestId } = render(
      <Label
        label={targetLabel}
        selectedLabelIds={selectedLabelIds}
        checkLabel={checkLabel}
        uncheckLabel={uncheckLabel}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelIcon'));
    expect(uncheckLabel).toHaveBeenCalledWith(mockLabel.id);
    expect(checkLabel).not.toHaveBeenCalled();
  });

  test('should call `checkLabel` if props of `selectedLabelIds` does not include label.id when click a label icon component', () => {
    const { getByTestId } = render(
      <Label
        label={mockLabel}
        selectedLabelIds={selectedLabelIds}
        checkLabel={checkLabel}
        uncheckLabel={uncheckLabel}
      />,
      store,
    );

    fireEvent.click(getByTestId('labelIcon'));
    expect(checkLabel).toHaveBeenCalledWith(mockLabel.id);
    expect(uncheckLabel).not.toHaveBeenCalled();
  });
});
