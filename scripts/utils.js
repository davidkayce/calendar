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

Date.prototype.GetWeekData = function () {
  // This returns Monday of the week of the date
  const buffer = new Date(this);
  const firstDayOfWeek = new Date(
    buffer.setDate(
      buffer.getDate() - buffer.getDay() + (buffer.getDay() == 0 ? -6 : 1)
    )
  );

  let date = new Date(firstDayOfWeek);
  let next = null;
  let weekMap = new Map();

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
