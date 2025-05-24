import { describe, expect, it } from 'vitest';
import { AuthorizationStatus } from '../../mocks/const';
import {
  userSlice,
  UserState,
  setAuthorizationStatus,
  initialState,
} from './user-slice';

describe('User slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };
    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set authorization status with setAuthorizationStatus action', () => {
    const newStatus = AuthorizationStatus.Auth;
    const expectedState: UserState = {
      ...initialState,
      authorizationStatus: newStatus,
    };
    const result = userSlice.reducer(
      initialState,
      setAuthorizationStatus(newStatus)
    );

    expect(result).toEqual(expectedState);
  });
});
