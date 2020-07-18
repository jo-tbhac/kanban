import React from 'react';

import { mockLabels } from '../../utils/mockData';
import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import CardLabelForm from '../../components/card/CardLabelForm';

describe('CardLabelForm component', () => {
  const position = { top: 0, left: 0 };
  let store: Store;
  let closeCardLabelForm: jest.Mock;

  beforeEach(() => {
    store = storeFactory({ label: { labels: mockLabels } });
    closeCardLabelForm = jest.fn();
  });

  test('should call `closeCardLabelForm` when clicked a close button', () => {
    const { getByTestId } = render(
      <CardLabelForm closeCardLabelForm={closeCardLabelForm} position={position} />,
      store,
    );

    fireEvent.click(getByTestId('cardLabelFormCloseButton'));
    expect(closeCardLabelForm).toHaveBeenCalled();
  });
});
