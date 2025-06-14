let htmlContent = "";
console.table({ is_a_millionair: true });
let div = document.querySelector("#events");

const fetchEvents = () => {
  fetch("https://igat-admin.vercel.app/api/upcoming_events")
    .then((res) => res.json())
    .then((data) => {
      const events = data.data;

      console.log(events);

      for (let i = 0; i < events.length; i++) {
        htmlContent += `
                      <div class="col-md-6 col-lg-4">
            <div class="card border-primary h-100">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0">${events[i].name || ""}</h5>
              </div>
              <div class="card-body">
                <p>
                  <i class="fas fa-calendar-day text-primary me-2"></i>
                  <strong>Date:</strong> ${events[i].date || ""}
                </p>
                <p>
                  <i class="fas fa-map-marker-alt text-primary me-2"></i>
                  <strong>Venue:</strong> ${
                    events[i].venue || "To be announced"
                  }
                </p>
                <p class="card-text">
                  ${events[i].info || "TBD"} 
                </p>
              </div>
              <div class="card-footer bg-transparent">
                <a href="${
                  events[i].link || ""
                }" class="btn btn-primary">Register Now</a>
              </div>
            </div>
          </div>
        
        `;
      }

      div.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error ", error));
};

fetchEvents();
