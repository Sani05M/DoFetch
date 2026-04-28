import { render, screen, fireEvent } from '@testing-library/react';
import { NeoButton } from '../NeoButton';
import { describe, it, expect, vi } from 'vitest';

describe('NeoButton', () => {
  it('renders children correctly', () => {
    render(<NeoButton>Click Me</NeoButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<NeoButton onClick={handleClick}>Click Me</NeoButton>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<NeoButton className="custom-class">Click Me</NeoButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders as different variants', () => {
    const { rerender } = render(<NeoButton variant="primary">Primary</NeoButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-accent');

    rerender(<NeoButton variant="secondary">Secondary</NeoButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-bg-dark');
  });
});
