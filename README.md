# Calender

![Theater](https://github.com/davidkayce/calendar/blob/main/calendar.png)

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

  To cater for showing overlaping events, the events are sorted by start time. I chose to have the events offset to the left (as you would see in google calendar). This allws for the width of each event to also show it's importance in that time period.

- Frontend to view the layout
  THis work was written in a component-based manner to make it easier to manage as well as read

### Considerations and further work

This a very interesting project. It was a lot of work to get everything to work together, but it was a lot of fun to make it work. That being said, it's not a perfect solution. The frontend is not mobile responsive. Further work would be to make it mobile responsive in a meanginful manner (collapse dates as the screen reduces). 
