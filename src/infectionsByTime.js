function infectionsByTime(duration, currentEstimate, periodType = 'days') {
  let factor = null;
  let days = null;

  switch (periodType) {
    case 'weeks':
      days = duration * 7;
      factor = Math.trunc(days / 3);
      break;
    case 'months':
      days = duration * 30;
      factor = Math.trunc(days / 3);
      break;
    default:
      factor = Math.trunc(duration / 3);
      break;
  }

  return {
    infectionsByRequestedTime: currentEstimate * (2 ** factor),
    days: days || duration
  };
}

export default infectionsByTime;
