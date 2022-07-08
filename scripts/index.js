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

const getDayEvents = () => {
  STATE.weekMap.forEach((value, key) => {
    const events = [];

    mockEvents.forEach((event) => {
      if (
        event.dateFrom >= value.time &&
        event.dateTo < value.time + 86400000
      ) {
        events.push({
          from: new Date(event.dateFrom).toLocaleTimeString().slice(0, 5),
          to: new Date(event.dateTo).toLocaleTimeString().slice(0, 5),
          title: event.eventName,
        });
      }
    });

    STATE.weekMap.set(key, { ...value, events });
  });
};

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

const drawHeading = () => {
  calendarHeading.innerHTML = Heading(
    Array.from(STATE.weekMap.keys()),
    STATE.today,
    STATE.isTodayValid
  );
};

const checkIfTodayIsValid = (today, weekData) => {
  if (
    MONTHS[today.getMonth()] === weekData.month &&
    today.getFullYear() === weekData.year
  ) {
    return true;
  }
  return false;
};

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
