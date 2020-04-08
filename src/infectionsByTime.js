function infectionsByTime(duration, currentEstimate, periodType = 'days') {
  let factor = null;

  switch (periodType) {
    case 'weeks':
      factor = Math.floor((duration * 7) / 3);
      break;
    case 'months':
      factor = Math.floor((duration * 30) / 3);
      break;
    default:
      factor = duration / 3;
      break;
  }

  return currentEstimate * (2 ** factor);
}

export default infectionsByTime;
