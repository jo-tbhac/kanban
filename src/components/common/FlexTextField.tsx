import React, { ChangeEvent } from 'react';

type FlexTextFieldProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  onBlur?: () => void
}

const FlexTextField = (props: FlexTextFieldProps) => {
  const {
    value,
    onChange,
    autoFocus,
    onBlur,
  } = props;

  return (
    <div className="flexTextField">
      <div data-testid="dummyTextField" className="flexTextField__dummy">{value}</div>
      <input
        data-testid="flexTextField"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="flexTextField__textField"
      />
    </div>
  );
};

export default FlexTextField;
