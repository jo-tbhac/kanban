import React from 'react';

import {
  render,
  fireEvent,
  storeFactory,
  waitForElementToBeRemoved,
} from '../../../testUtils';

import { Store } from '../../../store';
import SlideInMenu from '../../../components/common/SlideInMenu';

describe('SlideInMenu component', () => {
  let store: Store;
  let closeMenu: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    closeMenu = jest.fn();
  });

  test('should render children components', () => {
    const { getByTestId } = render(
      <SlideInMenu headerText="" closeMenu={closeMenu}>
        <div data-testid="testComponent" />
      </SlideInMenu>,
      store,
    );
    expect(getByTestId('testComponent')).not.toBeNull();
  });

  test('should render a header text', () => {
    const headerText = 'slide in header';
    const { getByText } = render(
      <SlideInMenu headerText={headerText} closeMenu={closeMenu}>
        <div />
      </SlideInMenu>,
      store,
    );
    expect(getByText(headerText)).not.toBeNull();
  });

  test('should call `closeMenu` upon click a close button', () => {
    const { getByRole, getByTestId } = render(
      <SlideInMenu headerText="" closeMenu={closeMenu}>
        <div />
      </SlideInMenu>,
      store,
    );

    fireEvent.click(getByRole('button'));
    waitForElementToBeRemoved(() => getByTestId('slideInMenu')).then(() => {
      expect(closeMenu).toHaveBeenCalled();
    });
  });
});
