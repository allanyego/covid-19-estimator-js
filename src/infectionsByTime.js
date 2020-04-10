function infectionsByTime(duration, currentEstimate, periodType = 'days') {
  let factor = null;
  let days = null;

  switch (periodType) {
    case 'weeks':
      days = duration * 7;
      // factor = Math.floor(days / 3);
      factor = days / 3;
      break;
    case 'months':
      days = duration * 30;
      // factor = Math.floor(days / 3);
      factor = days / 3;
      break;
    default:
      // factor = Math.floor(duration / 3);
      factor = duration / 3;
      break;
  }

  return {
    infectionsByRequestedTime: Math.floor(currentEstimate * (2 ** factor)),
    days: days || duration
  };
}

export default infectionsByTime;
