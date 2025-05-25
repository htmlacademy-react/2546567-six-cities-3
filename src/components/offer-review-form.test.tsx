import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import OfferReviewForm from './offer-review-form';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

// Мокаем Redux store и асинхронные действия
const mockStore = configureMockStore();
vi.mock('../store/index.ts', () => ({
  useAppDispatch: () => vi.fn(),
}));
vi.mock('../store/middleware/cities-thunk.ts', () => ({
  sendComment: vi.fn(() => ({ type: 'TEST_ACTION' })),
}));

describe('OfferReviewForm', () => {
  const mockId = 'test-id';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <OfferReviewForm id={mockId} />
      </Provider>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
