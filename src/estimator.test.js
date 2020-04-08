import estimator from './estimator';

const testData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 6,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

describe('covid19ImpactEstimator', () => {
  it('should return right values for impact.currentlyInfected fields', () => {
    const { impact } = estimator(testData);
    expect(impact.currentlyInfected).toEqual(testData.reportedCases * 10);
  });

  it('should return right values for severeImpact.currentlyInfected fields', () => {
    const { severeImpact } = estimator(testData);
    expect(severeImpact.currentlyInfected).toEqual(testData.reportedCases * 50);
  });

  it('should return right values for impact.infectionsByRequestedTime fields', () => {
    const { impact } = estimator(testData);
    const infections = impact.currentlyInfected * (2 ** 2);
    expect(impact.infectionsByRequestedTime).toEqual(infections);
  });

  it('should return right values for severeImpact.infectionsByRequestedTime fields', () => {
    const { severeImpact } = estimator(testData);
    const infections = severeImpact.currentlyInfected * (2 ** 2);
    expect(severeImpact.infectionsByRequestedTime).toEqual(infections);
  });

  it('should return right values for impact.severeCasesByRequestedTime fields', () => {
    const { impact } = estimator(testData);
    const current = (testData.reportedCases * 10)
      * (2 ** Math.floor(testData.timeToElapse / 3));

    expect(impact.severeCasesByRequestedTime).toEqual(Math.floor(current * 0.15));
  });

  it('should return right values for severeImpact.severeCasesByRequestedTime field', () => {
    const { severeImpact } = estimator(testData);
    const current = (testData.reportedCases * 50)
      * (2 ** Math.floor(testData.timeToElapse / 3));

    expect(severeImpact.severeCasesByRequestedTime).toEqual(Math.floor(current * 0.15));
  });

  it('should return right values for impact.hospitalBedsByRequestedTime field', () => {
    const { impact } = estimator(testData);
    const current = (testData.reportedCases * 10)
      * (2 ** Math.floor(testData.timeToElapse / 3));
    const severeCasesByRequestedTime = Math.floor(current * 0.15);

    expect(impact.hospitalBedsByRequestedTime)
      .toEqual(testData.totalHospitalBeds - severeCasesByRequestedTime);
  });

  it('should return right values for severeImpact.hospitalBedsByRequestedTime field', () => {
    const { severeImpact } = estimator(testData);
    const current = (testData.reportedCases * 50)
      * (2 ** Math.floor(testData.timeToElapse / 3)); // infections by requested time
    const severeCasesByRequestedTime = Math.floor(current * 0.15);

    expect(severeImpact.hospitalBedsByRequestedTime)
      .toEqual(testData.totalHospitalBeds - severeCasesByRequestedTime);
  });

  it(`should return right values for 
      impact{casesForICUByRequestedTime, casesForVentilatorsByRequestedTime}
       fields`, () => {
    const { impact } = estimator(testData);
    const current = (testData.reportedCases * 10)
      * (2 ** Math.floor(testData.timeToElapse / 3));
    const casesForICUByRequestedTime = Math.floor(current * 0.05);
    const casesForVentilatorsByRequestedTime = Math.floor(current * 0.02);

    expect(impact.casesForICUByRequestedTime)
      .toEqual(casesForICUByRequestedTime);
    expect(impact.casesForVentilatorsByRequestedTime)
      .toEqual(casesForVentilatorsByRequestedTime);
  });

  it('should return right values for severeImpact.casesForICUByRequestedTime field', () => {
    const { severeImpact } = estimator(testData);
    const current = (testData.reportedCases * 50)
      * (2 ** Math.floor(testData.timeToElapse / 3));
    const casesForICUByRequestedTime = Math.floor(current * 0.05);
    const casesForVentilatorsByRequestedTime = Math.floor(current * 0.02);

    expect(severeImpact.casesForICUByRequestedTime)
      .toEqual(casesForICUByRequestedTime);
    expect(severeImpact.casesForVentilatorsByRequestedTime)
      .toEqual(casesForVentilatorsByRequestedTime);
  });

  it('should return right value for impact.dollarsInFlight field', () => {
    const { impact } = estimator(testData);
    const current = (testData.reportedCases * 10)
      * (2 ** Math.floor(testData.timeToElapse / 3));

    const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = testData.region;
    const dollarsInFlight = current
      * avgDailyIncomePopulation * avgDailyIncomeInUSD * testData.timeToElapse;

    expect(impact.dollarsInFlight)
      .toEqual(dollarsInFlight);
  });

  it('should return right values for severeImpact.casesForICUByRequestedTime field', () => {
    const { severeImpact } = estimator(testData);
    const current = (testData.reportedCases * 50)
      * (2 ** Math.floor(testData.timeToElapse / 3));

    const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = testData.region;
    const dollarsInFlight = current
      * avgDailyIncomePopulation * avgDailyIncomeInUSD * testData.timeToElapse;

    expect(severeImpact.dollarsInFlight)
      .toEqual(dollarsInFlight);
  });
});
