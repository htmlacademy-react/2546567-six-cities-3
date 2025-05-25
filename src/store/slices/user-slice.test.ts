import { describe, expect, it } from 'vitest';
import { AuthorizationStatus } from '../../utils/const';
import {
  userSlice,
  UserState,
  setAuthorizationStatus,
  INITIAL_USER_STATE,
} from './user-slice';

describe('User slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userSlice.reducer(INITIAL_USER_STATE, emptyAction);

    expect(result).toEqual(INITIAL_USER_STATE);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };
    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(INITIAL_USER_STATE);
  });

  it('should set authorization status with setAuthorizationStatus action', () => {
    const newStatus = AuthorizationStatus.Auth;
    const expectedState: UserState = {
      ...INITIAL_USER_STATE,
      authorizationStatus: newStatus,
    };
    const result = userSlice.reducer(
      INITIAL_USER_STATE,
      setAuthorizationStatus(newStatus)
    );

    expect(result).toEqual(expectedState);
  });
});
