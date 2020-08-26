import React from 'react';
import { Link } from 'react-router-dom';

type TextLinkProps = {
  text: string
  path: string
}

const TextLink = (props: TextLinkProps) => {
  const { text, path } = props;

  return <Link to={path} className="textLink">{text}</Link>;
};

export default TextLink;
