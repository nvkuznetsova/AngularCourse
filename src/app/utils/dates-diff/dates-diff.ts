export const datesDiff = (firstDate: Date, secondDate: Date) => (
  Math.floor((firstDate.getTime() - secondDate.getTime()) / (60 * 60 * 24 * 1000))
);
