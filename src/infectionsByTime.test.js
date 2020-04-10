import infectionsByTime from './infectionsByTime';

describe('infectionsByTime function', () => {
  it('should return correct estimates of days', () => {
    // Test case 100, 3days
    const { infectionsByRequestedTime } = infectionsByTime(3, 100);
    expect(infectionsByRequestedTime).toEqual(200);
  });
  it('should return correct estimates of weeks', () => {
    // Test case 100, 1week (7days)
    const { infectionsByRequestedTime } = infectionsByTime(1, 100, 'weeks');
    expect(infectionsByRequestedTime).toEqual(400);
  });
  it('should return correct estimates of months', () => {
    // Test case 100, 1month (30days)
    const { infectionsByRequestedTime } = infectionsByTime(1, 100, 'months');
    expect(infectionsByRequestedTime).toEqual(102400);
  });
});
