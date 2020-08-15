import React, { useState, ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

type SlideInMenuProps = {
  closeMenu: () => void
  headerText: string
  children: ReactElement
}

const SlideInMenu = (props: SlideInMenuProps) => {
  const { closeMenu, headerText, children } = props;

  const [inProp, setInProp] = useState(true);

  return (
    <CSSTransition
      in={inProp}
      appear
      timeout={300}
      onExited={closeMenu}
      classNames="slideInMenu"
    >
      <div className="slideInMenu">
        <div className="slideInMenuHeader">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setInProp(false)}
            onKeyPress={() => setInProp(false)}
            className="slideInMenuCloseButton"
          >
            <FontAwesomeIcon icon={['fas', 'times']} />
          </div>
          <p className="slideInMenuHeader__title">{headerText}</p>
        </div>
        {children}
      </div>
    </CSSTransition>
  );
};

export default SlideInMenu;
