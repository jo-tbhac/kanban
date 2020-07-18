import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import { CardContext } from './CardIndexContainer';
import { cardDescriptionPlaceholder } from '../../utils/text';

type CardDescriptionTextProps = {
  openCardDescriptionForm: () => void
}

const CardDescriptionText = (props: CardDescriptionTextProps) => {
  const { openCardDescriptionForm } = props;

  const card = useContext(CardContext);

  return (
    card?.description === '' ? (
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
          source={card?.description}
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
