import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = () => (
  <div className="loading">
    <FontAwesomeIcon icon={['fas', 'spinner']} spin size="2x" className="loading__icon" />
  </div>
);

export default Loading;
