export const pad = (num, size) => ("00" + num).substr(-size);
export const ts = duration =>
  `${pad(duration.minutes(), 2)}:${pad(duration.seconds(), 2)}.${pad(
    duration.milliseconds(),
    3
  )}`;
