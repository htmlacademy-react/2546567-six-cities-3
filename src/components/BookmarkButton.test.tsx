import { render, screen, fireEvent } from '@testing-library/react';
import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
  type MockedFunction,
} from 'vitest';
import { BookmarkButton } from './BookmarkButton';
import { AppRoute, AuthorizationStatus } from '../utils/const';
import type { OffersType } from '../utils/type';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { CitiesState } from '../store/slices/cities-slice';
import type { UserState } from '../store/slices/user-slice';

type RootState = {
  cities: CitiesState;
  user: UserState;
};

type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, UnknownAction>;

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn() as () => MockedFunction<typeof useNavigate>,
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn() as MockedFunction<typeof useSelector>,
  useDispatch: vi.fn(),
}));

vi.mock('../store', () => ({
  useAppDispatch: vi.fn<[], AppThunkDispatch>(),
}));

const mockOffer = {
  id: '1',
  isFavorite: false,
} as OffersType;

describe('BookmarkButton component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as MockedFunction<typeof useNavigate>).mockReturnValue(
      mockNavigate
    );
    (useSelector as MockedFunction<typeof useSelector>).mockImplementation(
      (callback) =>
        callback({
          user: {
            authorizationStatus: AuthorizationStatus.Auth,
          },
        } as RootState)
    );
  });

  it('redirects to login for unauthorized user', () => {
    (useSelector as MockedFunction<typeof useSelector>).mockImplementation(
      (callback) =>
        callback({
          user: {
            authorizationStatus: AuthorizationStatus.NoAuth,
          },
        } as RootState)
    );

    render(<BookmarkButton offer={mockOffer} />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
  });
});
