// Get elements
const calendarContainer = document.getElementById("calendar-container");
const calendarContent = document.getElementById("calendar-content");
const calendarHeading = document.getElementById("calendar-heading");
const monthPlaceholder = document.getElementById("month-placeholder");
const yearPlaceholder = document.getElementById("year-placeholder");
const todayButton = document.getElementById("today-button");
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");

// Set application level constants and state
const STATE = {
  month: "",
  year: "",
  today: "",
  isTodayValid: false,
  next: "",
  previous: "",
  weekMap: null,
};

/**
 * @function setState
 * @param {Map} weekMap - Calculated map of week dates and UNIX time .
 * @param {String} month - Month of the first day of the week.
 * @param {String} year - Year of the first day of the week.
 * @param {Number} today - Current day.
 * @param {Number} isTodayValid - Boolean value that checks if the current day is in the weekMap
 * @param {Date} next - Next week's first day.
 * @param {Date} previous - Previous week's first day.
 * @param {Number} today - Current day.
 * @description - Updates the application state
 */
const setState = (
  weekMap,
  month,
  year,
  today,
  isTodayValid,
  next,
  previous
) => {
  STATE.month = month;
  STATE.year = year;
  STATE.today = today;
  STATE.isTodayValid = isTodayValid;
  STATE.next = next;
  STATE.previous = previous;
  STATE.weekMap = weekMap;
};

/**
 * @function getDayEvents
 * @description - for each day in the week map, this function sorts through the events to assign 
 * the appropriate event to the day.
 */

const getDayEvents = () => {
  STATE.weekMap.forEach((value, key) => {
    const events = [];

    mockEvents.forEach((event) => {
      if (
        event.dateFrom >= value.time &&
        event.dateTo < value.time + 86400000
      ) {
        events.push({
          id: event.id,
          from: new Date(event.dateFrom).toLocaleTimeString().slice(0, 5),
          to: new Date(event.dateTo).toLocaleTimeString().slice(0, 5),
          title: event.eventName,
        });
      }
    });

    STATE.weekMap.set(key, { ...value, events });
  });
};

/**
 * @function drawCalendar
 * @description - This function draws the calendar and calls the other day functons for events
 */

const drawCalendar = () => {
  const fragment = document.createDocumentFragment();

  // Create the day view components
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((day) => {
    const calendarDay = document.createElement("section");
    calendarDay.classList.add("calendar-day");

    if (["Sat", "Sun"].includes(day)) {
      calendarDay.classList.add("weekend");
    }

    calendarDay.innerHTML = `
      <div class="days" id="with-events-${day}">
      </div>
    `;
    fragment.appendChild(calendarDay);
  });

  // Append the day views to the calendar
  calendarContent.replaceChildren(fragment);
  DayView(STATE.weekMap);
};

/**
 * @function drawHeading
 * @description - This function draws the calendar heading
 */

const drawHeading = () => {
  calendarHeading.innerHTML = Heading(
    Array.from(STATE.weekMap.keys()),
    STATE.today,
    STATE.isTodayValid
  );
};

/**
 * @function checkIfTodayIsValid
 * @description - This function draws the calendar heading
 * @param {Date} today - Current day.
 * @param {Object} weekData - Object containing the week's data.
 * @returns {Boolean} - Returns true if the month and year match the current day. It does not check
 * if the day is in the weekMap because that is done in the heading function.
 */

const checkIfTodayIsValid = (today, weekData) => {
  if (
    MONTHS[today.getMonth()] === weekData.month &&
    today.getFullYear() === weekData.year
  ) {
    return true;
  }
  return false;
};

/**
 * @function goTo
 * @description - This navigates through dates in the calendar
 * @param {string} direction - Direction to navigate. It could be "today", "next" or "previous"
 */

const goTo = (direction) => {
  const today = new Date();

  if (direction === "today") {
    const weekData = today.GetWeekData();

    setState(
      weekData.weekMap,
      weekData.month,
      weekData.year,
      today.getDate(),
      true,
      weekData.next,
      weekData.previous
    );
  }

  if (direction === "next") {
    const weekData = STATE.next.GetWeekData();

    setState(
      weekData.weekMap,
      weekData.month,
      weekData.year,
      today.getDate(),
      checkIfTodayIsValid(today, weekData),
      weekData.next,
      weekData.previous
    );
  }

  if (direction === "previous") {
    const weekData = STATE.previous.GetWeekData();

    setState(
      weekData.weekMap,
      weekData.month,
      weekData.year,
      today.getDate(),
      checkIfTodayIsValid(today, weekData),
      weekData.next,
      weekData.previous
    );
  }

  monthPlaceholder.innerHTML = STATE.month;
  yearPlaceholder.innerHTML = STATE.year;

  getDayEvents();
  drawHeading();
  drawCalendar();
};

// Attach event listeners
todayButton.addEventListener("click", () => goTo("today"));
nextButton.addEventListener("click", () => goTo("next"));
previousButton.addEventListener("click", () => goTo("previous"));

// Initialize the page and set the current date
goTo("today");
