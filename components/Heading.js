const Heading = (weekArray, today, isTodayValid) => `
  <section class="top-heading">
    <div class="day-heading-container">
      <span>Mon</span>
      <span class="${isTodayValid && today == weekArray[0] ? 'highlighted': ''}">${weekArray[0]}</span>
    </div>

    <div class="day-heading-container">
      <span>Tue</span>
      <span class="${isTodayValid && today == weekArray[1] ? 'highlighted': ''}">${weekArray[1]}</span>
    </div>

    <div class="day-heading-container">
      <span>Wed</span>
      <span class="${isTodayValid && today == weekArray[2] ? 'highlighted': ''}">${weekArray[2]}</span>
    </div>
  
    <div class="day-heading-container">
      <span>Thu</span>
      <span class="${isTodayValid && today == weekArray[3] ? 'highlighted': ''}">${weekArray[3]}</span>
    </div>

    <div class="day-heading-container">
      <span>Fri</span>
      <span class="${isTodayValid && today == weekArray[4] ? 'highlighted': ''}">${weekArray[4]}</span>
    </div>

    <div class="day-heading-container">
      <span>Sat</span>
      <span class="${isTodayValid && today == weekArray[5] ? 'highlighted': ''}">${weekArray[5]}</span>
    </div>

    <div class="day-heading-container">
      <span>Sun</span>
      <span class="${isTodayValid && today == weekArray[6] ? 'highlighted': ''}">${weekArray[6]}</span>
    </div>
  </section>

  <section class="bottom-heading">
    <div> all day </div>
  </section>
`;
