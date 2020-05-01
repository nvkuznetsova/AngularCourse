import { datesDiff } from './dates-diff';

describe('DatesDiff', () => {
  const today = new Date();

  it('should return dates diff', () => {
    const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
    expect(datesDiff(today, tomorrow)).toBe(-1);
    expect(datesDiff(tomorrow, today)).toBe(1);
  });

  it('should return 0 if dates are created at the same day', () => {
    expect(datesDiff(today, new Date())).toBe(0);
  });
});
