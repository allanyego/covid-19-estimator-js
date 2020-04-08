import infectionsByTime from './infectionsByTime';

describe('infectionsByTime function', () => {
  it('should return correct estimates of days', () => {
    // Test case 100, 3days
    const estimate = infectionsByTime(3, 100);
    expect(estimate).toEqual(200);
  });
  it('should return correct estimates of weeks', () => {
    // Test case 100, 1week (7days)
    const estimate = infectionsByTime(1, 100, 'weeks');
    expect(estimate).toEqual(400);
  });
  it('should return correct estimates of months', () => {
    // Test case 100, 1month (30days)
    const estimate = infectionsByTime(1, 100, 'months');
    expect(estimate).toEqual(102400);
  });
});
