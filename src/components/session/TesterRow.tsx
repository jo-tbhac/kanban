import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import * as sessionActions from '../../store/session/actions';
import * as loadingActions from '../../store/loading/actions';
import { Tester } from '../../store/tester/types';
import { testerSignInText, usingTesterText } from '../../utils/text';

const mapDispatchToProps = {
  signIn: sessionActions.signIn,
  loadStart: loadingActions.loadStart,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type TesterRowProps = PropsFromRedux & {
  tester: Tester
}

export const TesterRow = (props: TesterRowProps) => {
  const { tester, signIn, loadStart } = props;

  const isActive = tester.expiresIn > 0;
  const modifire = isActive ? '--active' : '';

  const onClick = () => {
    if (isActive) {
      return;
    }
    const params = {
      email: tester.email,
      password: 'Mjr7ANxcBADHrvLsFPFrC9ha',
    };
    loadStart();
    signIn(params, true);
  };

  return (
    <div
      data-testid="testerRow"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
      className={`testerRow${modifire}`}
    >
      <div className="testerRowText">
        <div className={`testerRowText__name${modifire}`}>{tester.name}</div>
        <div className="testerRowText__status">
          {isActive ? usingTesterText : testerSignInText}
        </div>
      </div>
      <FontAwesomeIcon icon={['fas', 'angle-right']} className="testerRow__icon" />
    </div>
  );
};

export default connector(TesterRow);
