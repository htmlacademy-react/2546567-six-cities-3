import { render, screen } from '@testing-library/react';
import { ReviewType } from '../store/slices/cities-slice';
import ReviewItem from './review-card';

const mockReview: ReviewType = {
  id: '1',
  date: '2023-05-15T14:30:00.000Z' as unknown as Date,
  user: {
    name: 'John Doe',
    avatarUrl: '/img/avatar.jpg',
    isPro: false,
  },
  comment: 'Great place!',
  rating: 4,
};

describe('ReviewItem Component', () => {
  it('should render review data correctly', () => {
    render(<ReviewItem review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText('May 2023')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      mockReview.user.avatarUrl
    );
    expect(screen.getByTestId('rating-stars')).toHaveStyle('width: 80%');
  });
});
