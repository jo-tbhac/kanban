import React from 'react';

import { mockLabels } from '../../utils/mockData';
import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import CardLabelForm from '../../components/CardLabelForm';

describe('CardLabelForm component', () => {
  let store: Store;
  let closeCardLabelForm: jest.Mock;

  beforeEach(() => {
    store = storeFactory({ label: { labels: mockLabels } });
    closeCardLabelForm = jest.fn();
  });

  test('should call `closeCardLabelForm` when clicked a close button', () => {
    const { getByTestId } = render(
      <CardLabelForm closeCardLabelForm={closeCardLabelForm} />,
      store,
    );

    fireEvent.click(getByTestId('cardLabelFormCloseButton'));
    expect(closeCardLabelForm).toHaveBeenCalled();
  });
});