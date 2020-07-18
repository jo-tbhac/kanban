import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { connect, ConnectedProps } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { RootState } from '../../store';
import * as dialogActions from '../../store/dialog/actions';
import {
  DialogTypes,
  dialogTypeSuccess,
  dialogTypeError,
  dialogTypeAsk,
} from '../../store/dialog/types';

import { cancelButtonText, confirmButtonText } from '../../utils/text';

const mapStateToProps = (state: RootState) => {
  const { dialog } = state;
  return {
    type: dialog.type,
    title: dialog.title,
    description: dialog.description,
    onConfirm: dialog.onConfirm,
  };
};

const mapDispatchToProps = {
  closeDialog: dialogActions.closeDialog,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const dialogType = (type: DialogTypes) => {
  switch (type) {
    case dialogTypeSuccess: {
      const iconLookup: IconLookup = { prefix: 'far', iconName: 'check-circle' };
      return { iconLookup, className: 'dialogRow__icon--success' };
    }
    case dialogTypeError: {
      const iconLookup: IconLookup = { prefix: 'fas', iconName: 'exclamation-circle' };
      return { iconLookup, className: 'dialogRow__icon--error' };
    }
    case dialogTypeAsk: {
      const iconLookup: IconLookup = { prefix: 'far', iconName: 'question-circle' };
      return { iconLookup, className: 'dialogRow__icon--ask' };
    }
    default: {
      const iconLookup: IconLookup = { prefix: 'fas', iconName: 'exclamation' };
      return { iconLookup, className: 'dialogRow__icon--error' };
    }
  }
};

export const Dialog = (props: PropsFromRedux) => {
  const {
    type,
    title,
    description,
    onConfirm,
    closeDialog,
  } = props;

  const dialogProps = dialogType(type);
  const iconDefinition: IconDefinition = findIconDefinition(dialogProps.iconLookup);

  return (
    <CSSTransition in classNames="dialogOverlay" appear timeout={200}>
      <div className="dialogOverlay">
        <div className="dialogContainer">
          <div className="dialogRow">
            <FontAwesomeIcon
              data-testid="dialogIcon"
              icon={iconDefinition}
              className={dialogProps.className}
            />
          </div>

          <div className="dialogRow">
            <p className="dialogRow__title">{title}</p>
          </div>

          <div className="dialogRow">
            <p className="dialogRow__description">{description}</p>
          </div>

          <div className="dialogButton">
            {type === dialogTypeAsk && (
              <button
                data-testid="dialogCancelButton"
                type="button"
                onClick={closeDialog}
                className="dialogButton__cancel"
              >
                {cancelButtonText}
              </button>
            )}
            <button
              data-testid="dialogConfirmButton"
              type="button"
              onClick={onConfirm || closeDialog}
              className="dialogButton__confirm"
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default connector(Dialog);
