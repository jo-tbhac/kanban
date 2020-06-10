export const SIGN_IN = 'SIGN_IN';

export interface SessionState {
  isSignIn: boolean
}

export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

interface SignInAction {
  type: typeof SIGN_IN
}

export type SessionActionTypes = SignInAction;
