export const FETCH_TESTERS = 'FETCH_TESTERS';

export interface Tester {
  id: number
  name: string
  email: string
  expiresIn: number
}

export interface TesterState {
  testers: Tester[]
}

interface FetchTesterAction {
  type: typeof FETCH_TESTERS
  payload: Tester[]
}

export type TesterActionTypes = FetchTesterAction;
