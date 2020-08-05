import React, { useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

import { lightboxOpenNewTab, lightboxNoPreview, downloadText } from '../../utils/text';

type LightboxProps = {
  url: string
  displayName: string
  isImage: boolean
  close: () => void
}

const Lightbox = (props: LightboxProps) => {
  const {
    url,
    displayName,
    isImage,
    close,
  } = props;

  const closeLightbox = useCallback(({ target }) => {
    if (typeof target.className === 'string' && target.className.includes('lightboxOverlay')) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('click', closeLightbox);
    return () => {
      window.removeEventListener('click', closeLightbox);
    };
  }, [closeLightbox]);

  return (
    <CSSTransition in classNames="lightboxOverlay" appear timeout={200}>
      <div className="lightboxOverlay">
        <div
          role="button"
          tabIndex={0}
          onClick={close}
          onKeyPress={close}
          className="lightboxCloseButton"
        >
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>
        <div className="lightboxImage">
          {isImage ? (
            <img src={url} alt={displayName} className="lightboxImage__image" />
          ) : (
            <div className="lightboxImage__noPreview">{lightboxNoPreview}</div>
          )}
        </div>
        <div className="lightboxImageInfo">
          <div className="lightboxImageInfo__name">{displayName}</div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="lightboxImageInfo__link">
            {isImage ? lightboxOpenNewTab : downloadText}
          </a>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Lightbox;
