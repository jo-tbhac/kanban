import React from 'react';
import { Route } from 'react-router-dom';

import { storeFactory, renderWithRouter, fireEvent } from '../../../testUtils';
import { moveToSignInText, createAccountText } from '../../../utils/text';
import { Store } from '../../../store';
import { TesterSignIn } from '../../../components/session/TesterSignIn';

describe('TesterSignIn component', () => {
  let store: Store;
  let fetchTesters: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    fetchTesters = jest.fn();
  });

  test('should call `fetchTesters` upon the component did mount', () => {
    renderWithRouter(
      <TesterSignIn testers={[]} isSignIn={false} fetchTesters={fetchTesters} />,
      store,
    );
    expect(fetchTesters).toHaveBeenCalled();
  });

  test('should navigate to `/` if props of `isSignIn` is true', () => {
    const { getByTestId } = renderWithRouter(
      <>
        <Route exact path="/">
          <div data-testid="navigateTest" />
        </Route>
        <Route path="/tester">
          <TesterSignIn testers={[]} isSignIn fetchTesters={fetchTesters} />
        </Route>
      </>,
      store,
      ['/tester'],
    );

    expect(getByTestId('navigateTest')).not.toBeNull();
  });

  test('should navigate to `/signup` upon click a text `アカウントを作成する`', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <>
        <Route path="/signup">
          <div data-testid="navigateTest" />
        </Route>
        <Route path="/tester">
          <TesterSignIn testers={[]} isSignIn={false} fetchTesters={fetchTesters} />
        </Route>
      </>,
      store,
      ['/tester'],
    );

    fireEvent.click(getByText(createAccountText));
    expect(getByTestId('navigateTest')).not.toBeNull();
  });

  test('should navigate to `/signin` upon click a text `既にアカウントをお持ちの方`', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <>
        <Route path="/signin">
          <div data-testid="navigateTest" />
        </Route>
        <Route path="/tester">
          <TesterSignIn testers={[]} isSignIn={false} fetchTesters={fetchTesters} />
        </Route>
      </>,
      store,
      ['/tester'],
    );

    fireEvent.click(getByText(moveToSignInText));
    expect(getByTestId('navigateTest')).not.toBeNull();
  });
});
