import { cn } from '@/lib/utils';
import { describe, it, expect } from 'vitest';

describe('cn utility', () => {
  it('merges tailwind classes correctly', () => {
    expect(cn('px-2 py-2', 'px-4')).toBe('py-2 px-4');
  });

  it('handles conditional classes', () => {
    expect(cn('px-2', true && 'py-2', false && 'hidden')).toBe('px-2 py-2');
  });
});
