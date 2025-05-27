import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LongCat } from './LongCat';

describe('LongCat component', () => {
  it('should render without errors', () => {
    render(<LongCat />);

    const svgElement = document.getElementById('longCat');
    expect(svgElement).toBeInTheDocument();

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
