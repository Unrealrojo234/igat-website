let div = document.querySelector("#team");

const fetchTeam = async () => {
  fetch("https://igat-admin.vercel.app/api/team")
    .then((res) => res.json())
    .then((data) => {
      let team = data.data;
      let htmlContent = "";

      for (let i = 0; i < team.length; i++) {
        console.log(team[i]);

        htmlContent += `
            <div class="col-md-4 mb-4">
              <div class="card border-0 shadow-sm h-100">
                <img
                  src=${
                    `https://igat.fly.dev/api/files/${team[i].collectionId}/${team[i].id}/${team[i].photo}` ||
                    ""
                  }
                  class="card-img-top"
                  alt="${team[i].name}"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">${team[i].name}</h5>
                  <p class="text-muted">${team[i].position}</p>
                  <p class="card-text">
                    ${
                      team[i].info ||
                      "The visionary behind IGAT Club with a passion for talent development among youth."
                    }
                  </p>
                  <div class="d-flex justify-content-center">
                    <a
                      href="mailto:${team[i].email}"
                      class="btn btn-sm btn-outline-primary me-2"
                    >
                      <i class="fas fa-envelope"></i>
                    </a>
                    <a
                      href="tel:+254${team[i].phone}"
                      class="btn btn-sm btn-outline-primary"
                    >
                      <i class="fas fa-phone"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        `;
      }

      div.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error", error));
};

fetchTeam();
