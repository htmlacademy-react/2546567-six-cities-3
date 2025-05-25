import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';
import { AppRoute } from '../utils/const';

describe('Component: Footer', () => {
  it('should render logo link correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', AppRoute.Root);

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
    expect(logo).toHaveAttribute('width', '64');
    expect(logo).toHaveAttribute('height', '33');
  });
});
