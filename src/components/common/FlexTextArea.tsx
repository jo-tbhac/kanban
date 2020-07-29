import React, { ChangeEvent } from 'react';

type FlexTextAreaProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  minHeight?: number
  placeholderText?: string
  autoFocus?: boolean
  onBlur?: () => void
}

const FlexTextArea = (props: FlexTextAreaProps) => {
  const {
    value,
    onChange,
    minHeight,
    placeholderText,
    autoFocus,
    onBlur,
  } = props;

  return (
    <div className="flexTextArea">
      <div data-testid="dummyTextarea" style={{ minHeight }} className="flexTextArea__dummy">
        {value}
      </div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
        className="flexTextArea__textarea"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default FlexTextArea;
