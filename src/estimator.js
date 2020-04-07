import infectionsByTime from './infectionsByTime';

function est(severe, {
  reportedCases,
  timeToElapse,
  totalHospitalBeds,
  periodType = 'days'
}) {
  const currentlyInfected = severe ? reportedCases * 50 : reportedCases * 10;
  const infectionsByRequestedTime = infectionsByTime(
    timeToElapse,
    currentlyInfected,
    periodType
  );

  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);

  const hospitalBedsByRequestedTime = totalHospitalBeds - severeCasesByRequestedTime;

  return {
    currentlyInfected,
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
