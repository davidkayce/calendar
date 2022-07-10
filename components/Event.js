const Event = (title, from, to, id) => `
  <p id='event-title-${id}'> ${title} </p> 

  <dialog class="dialog" id="dialog-${id}">
    <h3>${title}</h3>
    <p class="event-time">
      <strong>From:</strong>${from} <br /> <strong> To:</strong>${to}
    </p>
    <p>You currently have no description for this event. Please try to be on time</p>
    <button id="modal-close-${id}">Dismiss</button>
  </dialog>
`;
