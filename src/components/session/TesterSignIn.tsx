import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { RootState } from '../../store';
import * as testerActions from '../../store/tester/actions';
import Logo from '../common/Logo';
import TesterRow from './TesterRow';
import TextLink from '../common/TextLink';
import { createAccountText, moveToSignInText } from '../../utils/text';

const mapStateToProps = (state: RootState) => {
  const { tester, session } = state;
  return {
    testers: tester.testers,
    isSignIn: session.isSignIn,
  };
};

const mapDispatchToProps = {
  fetchTesters: testerActions.fetchTesters,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const TesterSignIn = (props: PropsFromRedux) => {
  const { testers, isSignIn, fetchTesters } = props;

  useEffect(() => {
    fetchTesters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSignIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="testerSignInContainer">
      <Logo />

      <div className="testerSignIn">
        {testers.map((tester) => <TesterRow key={tester.id} tester={tester} />)}

        <div className="testerSignInLinkContainer">
          <TextLink path="/signup" text={createAccountText} />
          <TextLink path="/signin" text={moveToSignInText} />
        </div>
      </div>
    </div>
  );
};

export default connector(TesterSignIn);
