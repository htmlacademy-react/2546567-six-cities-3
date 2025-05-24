import { describe, expect, it, vi, type Mock } from 'vitest';
import { fetchLogin, tryAuth } from '../middleware/user-thunk';
import { API } from '../../services/api';
import type { AuthPayload, AuthResponse } from '../slices/user-slice';

// Мокаем API с правильной типизацией
vi.mock('../../services/api', () => ({
  API: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockAPI = {
  get: vi.mocked(API.get) as Mock<[string], Promise<{ data: AuthResponse }>>,
  post: vi.mocked(API.post) as Mock<
    [string, AuthPayload],
    Promise<{ data: AuthResponse }>
  >,
};

const mockAuthResponse: AuthResponse = {
  token: 'test-token',
  email: 'test@test.com',
  avatarUrl: '',
  isPro: false,
  name: 'Test User',
};

describe('Auth thunks', () => {
  describe('fetchLogin', () => {
    it('should handle successful login', async () => {
      mockAPI.get.mockResolvedValue({ data: mockAuthResponse });

      const result = await fetchLogin()(vi.fn(), vi.fn(), undefined);

      expect(mockAPI.get).toHaveBeenCalledWith('/login');
      expect(result.payload).toEqual(mockAuthResponse);
    });

    it('should handle failed login', async () => {
      const errorMessage = 'Network Error';
      mockAPI.get.mockRejectedValue(new Error(errorMessage));

      const result = await fetchLogin()(vi.fn(), vi.fn(), undefined);

      expect(result.payload).toBe('Failed to load login');
    });
  });

  describe('tryAuth', () => {
    const mockPayload: AuthPayload = {
      email: 'test@test.com',
      password: 'password123',
    };

    it('should handle successful authentication', async () => {
      mockAPI.post.mockResolvedValue({ data: mockAuthResponse });

      const result = await tryAuth(mockPayload)(vi.fn(), vi.fn(), undefined);

      expect(mockAPI.post).toHaveBeenCalledWith('/login', mockPayload);
      expect(result.payload).toEqual(mockAuthResponse);
    });

    it('should handle failed authentication', async () => {
      const errorMessage = 'Invalid credentials';
      mockAPI.post.mockRejectedValue(new Error(errorMessage));

      const result = await tryAuth(mockPayload)(vi.fn(), vi.fn(), undefined);

      expect(result.payload).toBe('Failed to try auth');
    });
  });
});
