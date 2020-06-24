import React, { ChangeEvent } from 'react';

type FlexTextAreaProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const FlexTextArea = (props: FlexTextAreaProps) => {
  const { value, onChange } = props;

  return (
    <div className="flexTextArea">
      <div data-testid="dummyTextarea" className="flexTextArea__dummy">{value}</div>
      <textarea
        value={value}
        onChange={onChange}
        className="flexTextArea__textarea"
      />
    </div>
  );
};

export default FlexTextArea;
