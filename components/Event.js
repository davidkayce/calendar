const eventModalButton =  document.getElementById("modal-close");
const eventTitle = document.getElementById("event-title");

eventTitle.addEventListener("click", () => {
  document.getElementById("dialog").show();
});

eventModalButton.addEventListener("click", () => {
  document.getElementById("dialog").close();
});


const Event = (title, from, to) => `
  <span id='event-title'> ${title} </span> \

  <dialog id="dialog">
    <h3>${title}</h3>
    <p class="event-time">
      <strong>From:</strong> ${from} <strong> To:</strong> ${to}
    </p>
    <p>You currently have no description for this event. Please try to be on time</p>
    <button id="modal-close">Dismiss</button>
  </dialog>
`;

