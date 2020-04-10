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

  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);

  const hospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds
    * 0.35) - severeCasesByRequestedTime);

  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);

  const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;

  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;
  const dollarsInFlight = Math.trunc(infectionsByRequestedTime
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
