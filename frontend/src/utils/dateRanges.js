// export const today = () => new Date();

// export const format = (d) =>
//   d.toISOString().split("T")[0];

// export const rangeFromDays = (days) => {
//   const end = today();
//   const start = new Date();
//   start.setDate(end.getDate() - days);
//   return { start: format(start), end: format(end) };
// };
export const format = (d) => d.toISOString().split("T")[0];

export const lastNDays = (n) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - n);
  return { start: format(start), end: format(end) };
};
