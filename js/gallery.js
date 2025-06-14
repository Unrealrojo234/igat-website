let gallery = document.getElementById("gallery");

const fetchGallery = () => {
  fetch("https://igat-admin.vercel.app/api/gallery")
    .then((res) => res.json())
    .then((data) => {
      let items = data.data;
      let htmlContent = "";
      for (let i = 0; i < items.length; i++) {
        console.log(items[i]);

        htmlContent += `
                  <div class="col-md-6 col-lg-4 gallery-item">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-img-top position-relative">
                <img
                 src=${
                   `https://igat.fly.dev/api/files/${items[i].collectionId}/${items[i].id}/${items[i].image}` ||
                   ""
                 }
                  class="img-fluid w-100"
                  alt="Music Performance"
                />
          
              </div>
              <div class="card-body">
                <h5 class="card-title">${items[i].name}</h5>
                <p class="card-text">
                  ${items[i].info}
                </p>
                <a
                  href="${items[i].link}"
                  class="btn btn-sm btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#videoModal1"
                  >Watch Video</a
                >
              </div>
            </div>
          </div>
        `;
      }
      gallery.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error", error));
};

fetchGallery();
