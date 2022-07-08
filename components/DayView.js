const hourHeight = 60;
const containerWidth = 163.5;
const minutesinDaay = 60 * 12;

let collisions = [];
let width = [];
let leftOffSet = [];

// append one event to calendar
// const drawEvent = (height, top, left, units, title, from, to) => {
//   const eventNode = document.createElement("article");
//   eventNode.classList.add("calendar-day");
//   eventNode.className = "event";
//   eventNode.innerHTML = Event(title, from, to);

//   // Customized CSS to position each event
//   eventNode.style.width = containerWidth / units + "px";
//   eventNode.style.height = height + "px";
//   eventNode.style.top = top + "px";
//   eventNode.style.left = 100 + left + "px";

//   document.getElementById("with-events").appendChild(node);
// };

/* 
collisions is an array that tells you which events are in each 30 min slot
- each first level of array corresponds to a 30 minute slot on the calendar 
  - [[0 - 30mins], [ 30 - 60mins], ...]
- next level of array tells you which event is present and the horizontal order
  - [0,0,1,2] 
  ==> event 1 is not present, event 2 is not present, event 3 is at order 1, event 4 is at order 2
*/

function getCollisions(events) {
  //resets storage
  collisions = [];

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
  });
}

/*
find width and horizontal position
width - number of units to divide container width by
horizontal position - pixel offset from left
*/
function getAttributes(events) {
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

var layOutDay = (events) => {
  // clear any existing nodes
  var myNode = document.getElementById("with-events");
  myNode.innerHTML = "";

  getCollisions(events);
  getAttributes(events);

  events.forEach((event, id) => {
    let height = ((event.end - event.start) / minutesinDay) * containerHeight;
    let top = (event.start / minutesinDay) * containerHeight;
    let end = event.end;
    let start = event.start;
    let units = width[id];
    if (!units) {
      units = 1;
    }
    let left = (containerWidth / width[id]) * (leftOffSet[id] - 1) + 10;
    if (!left || left < 0) {
      left = 10;
    }
    createEvent(height, top, left, units);
  });
};

const drawEvents = (containerRef, events) => {
  console.log(containerRef, events)
  // collisions is a measure of which events need to occupy the same horizontal annd vertical space
  const collisions = [];

}

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
  drawEvents(dayInner, Array.from(events.values())[index]);
};

const DayView = (events) => {
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((day, index) =>
    drawDay(index, day, events)
  );
};
