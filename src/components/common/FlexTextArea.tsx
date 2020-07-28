import React, { ChangeEvent } from 'react';

type FlexTextAreaProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  minHeight?: number
  placeholderText?: string
}

const FlexTextArea = (props: FlexTextAreaProps) => {
  const {
    value,
    onChange,
    minHeight,
    placeholderText,
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
      />
    </div>
  );
};

export default FlexTextArea;
