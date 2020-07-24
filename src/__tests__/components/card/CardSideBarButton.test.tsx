import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import CardSideBarButton from '../../../components/card/CardSideBarButton';

describe('CardSideBarButton component', () => {
  let store: Store;
  let onClick: jest.Mock;
  let text: string;
  const icon = ['fas', 'times'] as IconProp;

  beforeEach(() => {
    store = storeFactory();
    onClick = jest.fn();
    text = '';
  });

  test('should render a text that provided from props', () => {
    text = 'jxmsf;n af';
    const { getByText } = render(
      <CardSideBarButton text={text} icon={icon} onClick={onClick} />,
      store,
    );

    expect(getByText(text)).not.toBeNull();
  });

  test('should call `onClick` upon press a button', () => {
    const { getByTestId } = render(
      <CardSideBarButton text={text} icon={icon} onClick={onClick} />,
      store,
    );

    fireEvent.click(getByTestId('cardSideBarButton'));
    expect(onClick).toHaveBeenCalled();
  });
});
