import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { render, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import CardStatus from '../../../components/card/CardStatus';

describe('CardStatus component', () => {
  let store: Store;
  const icon: IconProp = ['fas', 'check'];

  beforeEach(() => {
    store = storeFactory();
  });

  test('should have a className `cardStatus` if does not provide `className` from props', () => {
    const { getByTestId } = render(
      <CardStatus icon={icon} />,
      store,
    );
    expect(getByTestId('cardStatus')).toHaveClass('cardStatus');
  });

  test('should have a className that provided from props', () => {
    const className = 'cardStatus--complete';
    const { getByTestId } = render(
      <CardStatus icon={icon} className={className} />,
      store,
    );
    expect(getByTestId('cardStatus')).toHaveClass(className);
  });

  test('should not render a `count` component if does not provide `count` from props', () => {
    const { queryByTestId } = render(
      <CardStatus icon={icon} />,
      store,
    );
    expect(queryByTestId('cardStatusCount')).toBeNull();
  });

  test('should render a `count` component if provide `count` from props', () => {
    const count = '1';
    const { getByTestId } = render(
      <CardStatus icon={icon} count={count} />,
      store,
    );
    expect(getByTestId('cardStatusCount')).not.toBeNull();
  });
});
