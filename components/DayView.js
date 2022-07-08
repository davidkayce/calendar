// Styling constants
const hourHeight = 60;
const containerWidth = 163.5;


/**
 * @function getCollisions
 * @param {Array} events - The events for the day.
 * @param {string} collisions - A refrecne to the collisions variable to be updated.
 * @returns {Array} - The collisions array.
 * @description - Collisions is an array that tells you which events are in each 1 hour slot, it 
 * sorts these events in order of start time to be displayed on the calendar.
 */

function getCollisions(events) {
  collisions = [];

  // Create a collision array for each hour
  for (var i = 0; i < 24; i++) {
    var time = [];
    for (var j = 0; j < events.length; j++) {
      time.push(0);
    }
    collisions.push(time);
  }

  events.forEach((event, id) => {
    let end = event.end;
    let start = event.start;
    let order = 1;

    while (start < end) {
      timeIndex = Math.floor(start / 30);

      while (order < events.length) {
        if (collisions[timeIndex].indexOf(order) === -1) {
          break;
        }
        order++;
      }

      collisions[timeIndex][id] = order;
      start = start + 30;
    }

    collisions[Math.floor((end - 1) / 30)][id] = order;
    console.log(collisions);
    return collisions;
  });
}


/*
find width and horizontal position
width - number of units to divide container width by
horizontal position - pixel offset from left
*/
/**
 * @function drawDay
 * @param {string} day - Type of day.
 * @param {number} index - The index of the day in the week.
 * @param {Map<string, object>} events - The events fir the day.
 * @description - This function draws the day view to the DOM and then draws the events ovr it
 */
function getAttributes(events, collisions) {
  //resets storage
  width = [];
  leftOffSet = [];

  for (var i = 0; i < events.length; i++) {
    width.push(0);
    leftOffSet.push(0);
  }

  collisions.forEach((period) => {
    // number of events in that period
    let count = period.reduce((a, b) => {
      return b ? a + 1 : a;
    });

    if (count > 1) {
      period.forEach((event, id) => {
        // max number of events it is sharing a time period with determines width
        if (period[id]) {
          if (count > width[id]) {
            width[id] = count;
          }
        }

        if (period[id] && !leftOffSet[id]) {
          leftOffSet[id] = period[id];
        }
      });
    }
  });
}

/**
 * @function drawDay
 * @param {string} day - Type of day.
 * @param {number} index - The index of the day in the week.
 * @param {Map<string, object>} events - The events fir the day.
 * @description - This function draws the day view to the DOM and then draws the events ovr it
 */

const drawSingleEvent = (
  height,
  top,
  left,
  units,
  title,
  id,
  from,
  to,
  containerRef,
  day
) => {
  const eventNode = document.createElement("article");
  eventNode.classList.add("calendar-day");
  eventNode.className = "event";
  eventNode.setAttribute("id", `event-${id}`);
  const compLeft = day === "Mon" ? left + 100 : left;
  eventNode.setAttribute(
    "style",
    `height: ${height}px; top: ${top}px; left: ${compLeft}px; width: ${
      containerWidth / units
    }px;`
  );

  eventNode.innerHTML = Event(title, from, to, id);
  containerRef.appendChild(eventNode);
};

/**
 * @function drawDay
 * @param {string} day - Type of day.
 * @param {number} index - The index of the day in the week.
 * @param {Map<string, object>} events - The events fir the day.
 * @description - This function draws the day view to the DOM and then draws the events ovr it
 */

const drawEvents = (containerRef, events, day) => {
  let width = [];
  let leftOffSet = [];

  if (events.length > 0) {
    events.forEach((event) => {
      const [hourFrom, minuteFrom] = event.from.split(":");
      const [hourTo, minuteTo] = event.to.split(":");

      const top = (parseInt(hourFrom) * parseInt(hourHeight)) + parseInt(minuteFrom) + 55;
      const height = ((parseInt(hourTo) * parseInt(hourHeight)) + parseInt(minuteTo) - (top-55))

      // If w have only one event that day then we can just draw it
      if (events.length === 1) {
        drawSingleEvent(
          height,
          top,
          0,
          1,
          event.title,
          event.id,
          event.from,
          event.to,
          containerRef,
          day
        );
      } else {
        // calculate the collisions of events
        const collisions = getCollisions(events, collisions);
        getAttributes(events, collisions);

        let units = width[id];
        if (!units) {
          units = 1;
        }

        let left = (containerWidth / width[id]) * (leftOffSet[id] - 1) + 10;
        if (!left || left < 0) {
          left = 10;
        }

        drawSingleEvent(
          height,
          top,
          left,
          units,
          event.title,
          event.id,
          event.from,
          event.to,
          containerRef,
          day
        );
      }

      const eventModalButton = document.getElementById(`modal-close-${event.id}`);
      const eventTitle = document.getElementById(`event-${event.id}`);

      eventTitle.addEventListener("click", () => {
        document.getElementById(`dialog-${event.id}`).show();
      });

      eventModalButton.addEventListener("click", () => {
        document.getElementById(`dialog-${event.id}`).close();
      });
    });
  }
};

/**
 * @function drawDay
 * @param {string} day - Type of day.
 * @param {number} index - The index of the day in the week.
 * @param {Map<string, object>} events - The events fir the day.
 * @description - This function draws the day view to the DOM and then draws the events ovr it
 */

const drawDay = (index, day, events) => {
  const dayInner = document.getElementById(`with-events-${day}`);

  for (let index = 0; index < 24; index++) {
    const element = document.createElement("div");
    element.classList.add("time-slot");

    if (day === "Mon") {
      const timingElement = document.createElement("span");
      element.classList.add("with-timing");
      timingElement.classList.add("timing");
      timingElement.innerHTML = `${index}:00`;
      element.appendChild(timingElement);
    }

    dayInner.appendChild(element);
  }
  drawEvents(dayInner, Array.from(events.values())?.[index]?.events, day);
};

/**
 * @function DayView
 * @param {Map<string, object>} events - The events fir the day.
 * @description - Entry function to DayView.
 */

const DayView = (events) => {
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((day, index) =>
    drawDay(index, day, events)
  );
};
