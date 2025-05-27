import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFoundPage from './not-found-page';
import '@testing-library/jest-dom';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const title = screen.getByText('404.Page not Found');
    expect(title).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveTextContent('--- На главную ---');
  });
});
