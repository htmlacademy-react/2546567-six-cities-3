import { render, screen } from '@testing-library/react';
import Loading from './loading';

test('Renders loading text', () => {
  render(<Loading />);
  expect(screen.getByText('Loading......')).toBeInTheDocument();
});
