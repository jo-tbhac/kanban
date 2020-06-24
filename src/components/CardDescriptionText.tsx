import React from 'react';
import ReactMarkdown from 'react-markdown';

import { cardDescriptionPlaceholder } from '../utils/text';

type CardDescriptionTextProps = {
  cardDescription: string
  openCardDescriptionForm: () => void
}

const CardDescriptionText = (props: CardDescriptionTextProps) => {
  const { cardDescription, openCardDescriptionForm } = props;

  return (
    cardDescription === '' ? (
      <div
        data-testid="cardDescriptionTextPlaceholer"
        role="button"
        tabIndex={0}
        onClick={openCardDescriptionForm}
        onKeyPress={openCardDescriptionForm}
        className="cardDescriptionText__placeholder"
      >
        {cardDescriptionPlaceholder}
      </div>
    ) : (
      <div
        data-testid="cardDescriptionText"
        role="button"
        tabIndex={0}
        onClick={openCardDescriptionForm}
        onKeyPress={openCardDescriptionForm}
        className="cardDescriptionText__text"
      >
        <ReactMarkdown
          source={cardDescription}
          renderers={{
            link: (linkProps) => (
              <a
                href={linkProps.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                {linkProps.children}
              </a>
            ),
          }}
        />
      </div>
    )
  );
};

export default CardDescriptionText;
