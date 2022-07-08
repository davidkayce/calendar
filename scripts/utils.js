// Date manipulation
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * @description - This function updates the Date object on the browser to generate the dates of each week
 * @returns {Object} WeekData - Object containing the week's data.
 */

Date.prototype.GetWeekData = function () {
  const buffer = new Date(this);

  // Find the first day of the week (this returns Monday rather than Sunday to match the design of the calendar)
  const firstDayOfWeek = new Date(
    buffer.setDate(
      buffer.getDate() - buffer.getDay() + (buffer.getDay() == 0 ? -6 : 1)
    )
  );

  let date = new Date(firstDayOfWeek);
  let next = null;
  let weekMap = new Map();

  // Create a map of the week's dates
  for (let i = 0; i < 7; i++) {
    weekMap.set(date.getDate(), { time: date.getTime() });
    date.setDate(date.getDate() + 1);
    next = date.toDateString();
  }

  return {
    firstDay: firstDayOfWeek.getDate(),
    month: MONTHS[firstDayOfWeek.getMonth()],
    year: firstDayOfWeek.getFullYear(),
    weekMap,
    next: new Date(next),
    previous: new Date(date.setDate(date.getDate() - 8)),
  };
};
