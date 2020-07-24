import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import CardMenuForm from '../../../components/card/CardMenuForm';

describe('CardMenuForm component', () => {
  let store: Store;
  let onSubmit: jest.Mock;
  let onClickClose: jest.Mock;
  let headerText: string;
  let targetClassName: string;
  let buttonText: string;
  const component = <div data-testid="cardMenuFormChild" />;

  beforeEach(() => {
    store = storeFactory();
    onSubmit = jest.fn();
    onClickClose = jest.fn();
    headerText = '';
    targetClassName = '';
    buttonText = '';
  });

  test('should render a child component that provided from props', () => {
    const { getByTestId } = render(
      <CardMenuForm
        onSubmit={onSubmit}
        onClickClose={onClickClose}
        headerText={headerText}
        targetClassName={targetClassName}
        buttonText={buttonText}
        buttonDisabled={false}
        component={component}
      />,
      store,
    );

    expect(getByTestId('cardMenuFormChild')).not.toBeNull();
  });

  test('should call `onClickClose` upon press a close button', () => {
    const { getByTestId } = render(
      <CardMenuForm
        onSubmit={onSubmit}
        onClickClose={onClickClose}
        headerText={headerText}
        targetClassName={targetClassName}
        buttonText={buttonText}
        buttonDisabled={false}
        component={component}
      />,
      store,
    );

    fireEvent.click(getByTestId('cardMenuFormCloseButton'));
    expect(onClickClose).toHaveBeenCalled();
  });

  test('should a rendered header have a text that provided from props', () => {
    headerText = 'jfsomxfo;e';
    const { getByTestId } = render(
      <CardMenuForm
        onSubmit={onSubmit}
        onClickClose={onClickClose}
        headerText={headerText}
        targetClassName={targetClassName}
        buttonText={buttonText}
        buttonDisabled={false}
        component={component}
      />,
      store,
    );

    expect(getByTestId('cardMenuFormHeader')).toHaveTextContent(headerText);
  });

  test('should a rendered button have a text that provided from props', () => {
    buttonText = 'cm:jsxsee';
    const { getByTestId } = render(
      <CardMenuForm
        onSubmit={onSubmit}
        onClickClose={onClickClose}
        headerText={headerText}
        targetClassName={targetClassName}
        buttonText={buttonText}
        buttonDisabled={false}
        component={component}
      />,
      store,
    );

    expect(getByTestId('buttonSubmit')).toHaveTextContent(buttonText);
  });

  test('should a submit button is disabled when props of `buttonDisabled` is true', () => {
    const { getByTestId } = render(
      <CardMenuForm
        onSubmit={onSubmit}
        onClickClose={onClickClose}
        headerText={headerText}
        targetClassName={targetClassName}
        buttonText={buttonText}
        buttonDisabled
        component={component}
      />,
      store,
    );

    expect(getByTestId('buttonSubmit')).not.toBeEnabled();
  });

  test('should a submit button is enabled when props of `buttonDisabled` is false', () => {
    const { getByTestId } = render(
      <CardMenuForm
        onSubmit={onSubmit}
        onClickClose={onClickClose}
        headerText={headerText}
        targetClassName={targetClassName}
        buttonText={buttonText}
        buttonDisabled={false}
        component={component}
      />,
      store,
    );

    expect(getByTestId('buttonSubmit')).toBeEnabled();
  });

  test('should call `onSubmit` upon press a submit button', () => {
    const { getByTestId } = render(
      <CardMenuForm
        onSubmit={onSubmit}
        onClickClose={onClickClose}
        headerText={headerText}
        targetClassName={targetClassName}
        buttonText={buttonText}
        buttonDisabled={false}
        component={component}
      />,
      store,
    );

    fireEvent.click(getByTestId('buttonSubmit'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
