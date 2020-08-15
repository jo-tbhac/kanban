import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import AngleButton from '../../../components/common/AngleButton';

describe('AngleButton component', () => {
  let store: Store;
  let onClick: jest.Mock;
  const icon = ['fas', 'angle-right'] as IconProp;

  beforeEach(() => {
    store = storeFactory();
    onClick = jest.fn();
  });

  test('should call a function upon click a component', () => {
    const { getByRole } = render(<AngleButton icon={icon} onClick={onClick} />, store);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  test('should disabled button if props `disabled` is true', () => {
    const { getByRole } = render(<AngleButton icon={icon} onClick={onClick} disabled />, store);
    expect(getByRole('button')).toBeDisabled();
  });

  test('should enabled button if props `disabled` is false', () => {
    const { getByRole } = render(
      <AngleButton icon={icon} onClick={onClick} disabled={false} />,
      store,
    );
    expect(getByRole('button')).toBeEnabled();
  });

  test('should enabled button if props `disabled` is undefined', () => {
    const { getByRole } = render(<AngleButton icon={icon} onClick={onClick} />, store);
    expect(getByRole('button')).toBeEnabled();
  });
});
