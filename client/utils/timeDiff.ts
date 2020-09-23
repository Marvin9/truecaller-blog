const usePlural = (num: number): string => (num !== 1 ? 's' : '');

const rules = [
  {
    unit: 'second',
    // divide by bound to get next unit
    bound: 60,
  },
  {
    unit: 'minute',
    bound: 60,
  },
  {
    unit: 'hour',
    bound: 24,
  },
  {
    unit: 'day',
    bound: 30,
  },
  {
    unit: 'month',
    bound: 12,
  },
  {
    unit: 'year',
  },
];

// utility to count time difference since article was published
export const formatTimeDiff = (since: Date): string => {
  const currentTime = Date.now();

  // https://stackoverflow.com/a/11893157
  const postPublished = since.getTime();

  // millisecond(s)
  let diff = currentTime - postPublished;

  // to convert ms => s.
  let preUnitDivision = 1000;
  for (let i = 0, iBound = rules.length; i < iBound; i++) {
    const rule = rules[i];

    diff /= preUnitDivision;

    if (i === iBound - 1 || diff < rule.bound) {
      const round = Math.round(diff);
      return `${round} ${rule.unit}${usePlural(round)} ago`;
    }

    preUnitDivision = rule.bound;
  }
};
