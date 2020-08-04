import { useEffect, useRef } from 'react';

const usePreviousBoardCount = (count: number) => {
  const ref: {current: number | undefined} = useRef();
  useEffect(() => {
    ref.current = count;
  });
  return ref.current;
};

export default usePreviousBoardCount;
