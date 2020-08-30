import React from 'react';

import { storeFactory, render, fireEvent } from '../../../testUtils';
import { usingTesterText, testerSignInText } from '../../../utils/text';
import { Store } from '../../../store';
import { Tester } from '../../../store/tester/types';
import { TesterRow } from '../../../components/session/TesterRow';

describe('TesterRow component', () => {
  let store: Store;
  let signIn: jest.Mock;
  let loadStart: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    signIn = jest.fn();
    loadStart = jest.fn();
  });

  describe('`tester.expiresIn` is more than zero', () => {
    const tester: Tester = {
      id: 1,
      name: 'sample tester',
      email: 'tester@k4nban.com',
      expiresIn: 3600,
    };

    test('should render a text `このユーザーは使用中です`', () => {
      const { getByText } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      expect(getByText(usingTesterText)).not.toBeNull();
    });

    test('should the button component has class name `testerRow--active`', () => {
      const { getByTestId } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      expect(getByTestId('testerRow')).toHaveClass('testerRow--active');
    });

    test('should the tester name component hsa class name `testerRowText__name--active`', () => {
      const { getByText } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      expect(getByText(tester.name)).toHaveClass('testerRowText__name--active');
    });

    test('should not call `loadStart` upon click a component', () => {
      const { getByTestId } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      fireEvent.click(getByTestId('testerRow'));
      expect(loadStart).not.toHaveBeenCalled();
    });

    test('should not call `signIn` upon click a component', () => {
      const { getByTestId } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      fireEvent.click(getByTestId('testerRow'));
      expect(signIn).not.toHaveBeenCalled();
    });
  });

  describe('`tester.expiresIn` is less than or equal zero', () => {
    const tester: Tester = {
      id: 1,
      name: 'sample tester',
      email: 'tester@k4nban.com',
      expiresIn: 0,
    };

    test('should render a text `このユーザーでサインイン`', () => {
      const { getByText } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      expect(getByText(testerSignInText)).not.toBeNull();
    });

    test('should the button component has class name `testerRow`', () => {
      const { getByTestId } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      expect(getByTestId('testerRow')).toHaveClass('testerRow');
    });

    test('should the tester name component hsa class name `testerRowText__name`', () => {
      const { getByText } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      expect(getByText(tester.name)).toHaveClass('testerRowText__name');
    });

    test('should call `loadStart` upon click a component', () => {
      const { getByTestId } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      fireEvent.click(getByTestId('testerRow'));
      expect(loadStart).toHaveBeenCalled();
    });

    test('should call `signIn` with `{ email: ..., password: ... }` and `true` upon click a component', () => {
      const { getByTestId } = render(
        <TesterRow tester={tester} signIn={signIn} loadStart={loadStart} />,
        store,
      );
      const params = { email: tester.email, password: 'Mjr7ANxcBADHrvLsFPFrC9ha' };
      fireEvent.click(getByTestId('testerRow'));
      expect(signIn).toHaveBeenCalledWith(params, true);
    });
  });
});
