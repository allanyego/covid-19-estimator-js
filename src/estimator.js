import infectionsByTime from './infectionsByTime';

function est(severe, {
  reportedCases,
  timeToElapse,
  periodType = 'days'
}) {
  const currentlyInfected = severe ? reportedCases * 50 : reportedCases * 10;
  const infectionsByRequestedTime = infectionsByTime(
    timeToElapse,
    currentlyInfected,
    periodType
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime
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
