export const datesDiff = (firstDate: Date, secondDate: Date) => {
  const diff = (firstDate.getTime() - secondDate.getTime()) / (60 * 60 * 24 * 1000);
  return diff >= 0 ? Math.floor(diff) : Math.ceil(diff);
};
