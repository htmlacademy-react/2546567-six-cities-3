import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Sort from './sort';
import { SortOption } from '../utils/const';

describe('Sort component', () => {
  const mockOnSort = vi.fn();
  const selectedOption: SortOption = 0;

  it('opens/closes dropdown on click', () => {
    render(<Sort active={selectedOption} onSort={mockOnSort} />);

    const form = screen.getByRole('form');
    fireEvent.click(form);

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    fireEvent.click(form);
    expect(optionsList).not.toHaveClass('places__options--opened');
  });
});
