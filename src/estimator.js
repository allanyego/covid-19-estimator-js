import infectionsByTime from './infectionsByTime';

function est(severe, {
  reportedCases,
  region,
  timeToElapse,
  totalHospitalBeds,
  periodType
}) {
  const currentlyInfected = severe ? reportedCases * 50 : reportedCases * 10;
  const { infectionsByRequestedTime, days } = infectionsByTime(
    timeToElapse,
    currentlyInfected,
    periodType
  );

  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);

  const hospitalBedsByRequestedTime = Math.floor(totalHospitalBeds
    * 0.35 - severeCasesByRequestedTime);

  const casesForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.05);

  const casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);

  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;
  const dollarsInFlight = Math.floor(infectionsByRequestedTime
    * avgDailyIncomePopulation * avgDailyIncomeInUSD * days);

  return {
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    currentlyInfected,
    dollarsInFlight,
    hospitalBedsByRequestedTime,
    infectionsByRequestedTime,
    severeCasesByRequestedTime
  };
}

const covid19ImpactEstimator = function covid19ImpactEstimator(data) {
  return {
    data: { ...data },
    impact: est(false, data),
    severeImpact: est(true, data)
  };
};

export default covid19ImpactEstimator;
