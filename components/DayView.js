// Styling constants
const hourHeight = 60;
const containerWidth = 163.5;

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

  // Collisions is an array that tells you which events are in each 1 hour slot, it 
  // sorts these events in order of start time to be displayed on the calendar.
  // each first level of array corresponds to a 1 hour slot on the calendar 
  //  [[0 - 1:00], [ 1:00 - 2:00], ...]
  //  The next level of array tells you which event is present and the horizontal order
  // [0,0,1,2] ==> event 1 is not present, event 2 is not present, event 3 is at order 1, event 4 is at order 2
  // credit: https://github.com/meijiao

  let collisions = [];

  // Setup collision array for each hour if there are more than one events in the day
  if (events.length > 1) {
    for (var i = 0; i < 24; i++) {
      var time = [];
      for (var j = 0; j < events.length; j++) {
        time.push(0);
      }
      collisions.push(time);
    }

    for (var i = 0; i < events.length; i++) {
      width.push(0);
      leftOffSet.push(0);
    }
  }

  if (events.length > 0) {
    events.forEach((event, id) => {
      let eventOrder = 1;
      const [hourFrom, minuteFrom] = event.from.split(":");
      const [hourTo, minuteTo] = event.to.split(":");
    
      let start = (parseInt(hourFrom) * 60) + parseInt(minuteFrom);
      let end = (parseInt(hourTo) * 60) + parseInt(minuteTo);
      const top = (parseInt(hourFrom) * parseInt(hourHeight)) + parseInt(minuteFrom) + 55;
      const height = ((parseInt(hourTo) * parseInt(hourHeight)) + parseInt(minuteTo) - (top-55))

      // If we have only one event that day then we can just draw it
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
        // This assumes that events are sorted by start time from the API response (as is the case with the mocked API)
        // otherwise we can have an event that starts later have a lower order. 
        // In which case we would have to sort events before this expression

        while (start < end) {
          let timeIndex = Math.floor(start / 60);
    
          while (eventOrder < events.length) {
            if (collisions[timeIndex].indexOf(eventOrder) === -1) {
              break;
            }
            eventOrder++;
          }
    
          collisions[timeIndex][id] = eventOrder;
          start = start + 60;
        }
        
        collisions[Math.floor((end - 1) / 60)][id] = eventOrder;

        // Calculate width and horizontal position of the event based in the collisions array
        // width - number of units to divide container width by
        // horizontal position - pixel offset from left

        collisions.forEach((period) => {
          // number of events in that period 
          let count = period.reduce((a, b) => {
            return b ? a + 1 : a;
          });
      
          if (count > 1) {
            period.forEach((item, id) => {
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

        let units = width[id];
        if (!units) {
          units = 1;
        }

        let left = (containerWidth / width[id]) * (leftOffSet[id] - 1);
        if (!left || left < 0) {
          left = 0;
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
      const eventTitle = document.getElementById(`event-title-${event.id}`);
      const eventDialog = document.getElementById(`dialog-${event.id}`);

      eventTitle.addEventListener("click", () => {
        eventDialog.show();
      });

      eventModalButton.addEventListener("click", () => {
        eventDialog.close();
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
