# Calender

![Calendar](https://github.com/davidkayce/calendar/blob/main/calendar.png)

This project is built with HTML, CSS and JS. It sorts through events and displays them on a calendar

### Requirements
- The page shows seven columns, one for each day of the week;
- It shows events that are provided through an API endpoint;
- It will have left and right to go to next and prev weeks;
- On clicking, today should go to the current week;
- Events may begin at any time, not hourly or half hourly;
- Multiple events may be scheduled in the same time slot, in which case event blocks would be
side by side;

## Instructions:

You can open th eindex.html in your browser to see the calendar.

## Walkthrough and considerations:

The application can be divided in two:

- Logic to arrange the data and arrange it in an easily presentable manner. 
  For this, it was important to pay attention to the performance of the functions and the memory use. A modification to the Date object is used to prevent calling multiple instances of the same date for date manipulations. 

  To cater for showing overlaping events, the events are sorted by start time. I chose to have the events offset to the left (as you would see in google calendar). This allows for the width of each event to also show it's importance in that time period.
  You can test this by navigating to May 6, 2022 and seeing the events. 
  
  Note that clicking on the event title shows you the event's details

  ![Event](https://github.com/davidkayce/calendar/blob/main/events.png)

- Frontend to view the layout:
  This work was written in a component-based manner to make it easier to manage as well as read

### Considerations and further work

This a very interesting project. It was a lot of work to get everything to work together, but it was a lot of fun to make it work. That being said, it's not a perfect solution. The frontend is not mobile responsive. 

Further work would be to make it mobile responsive in a meangingful manner. I would have liked to collapse the dates as the screen reduces until one ends up with a single column. A way that comes to mind is to use the HTML5 Resize Observer API on the `calendar-container` element and pass that to the `Date.GetWeekData` function. The the `GetWeekData` function would then return the `weekMap` with as many dates as needed for a certain size. The logic for drawing the calendar would also need to b updatd to build the calendar based on the `weekMap` instead of the static way it is done at the moment. 
