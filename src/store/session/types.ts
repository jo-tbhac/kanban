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

export interface SignInParams {
  email: string
  password: string
}

interface SignInAction {
  type: typeof SIGN_IN
}

export type SessionActionTypes = SignInAction;
