export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export interface SessionState {
  isSignIn: boolean
  email: string
  name: string
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
  payload: { name: string, email: string }
}

interface SignOutAction {
  type: typeof SIGN_OUT
}

export type SessionActionTypes = SignInAction | SignOutAction;
