let news = document.getElementById("news");

const fetchData = () => {
  fetch("https://igat-admin.vercel.app/api/news")
    .then((res) => res.json())
    .then((data) => {
      let items = data.data;
      let htmlContent = "";
      for (let i = 0; i < items.length; i++) {
        // console.log(items[i]);

        htmlContent += `
                   <div class="news-item mb-4 pb-4 border-bottom">
                <div  class="row g-3">
                  <div class="col-md-4">
                    <img
                       src=${
                         `https://igat.fly.dev/api/files/${items[i].collectionId}/${items[i].id}/${items[i].backgroundImage}` ||
                         ""
                       }
                      class="img-fluid rounded"
                      alt="News Thumbnail"
                    />
                  </div>
                  <div class="col-md-8">
                    <small class="text-muted">${items[i].created}</small>
                    <h5>
                      <a href="news-single.html" class="text-decoration-none"
                        >${items[i].headline}</a
                      >
                    </h5>
                    <p class="text-dark">
                      ${items[i].info}
                    </p>

                    <p  class="text-center text-secondary">${items[i].tag}</p>
                  </div>
                </div>
              </div>
        `;
      }
      news.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error", error));
};

fetchData();
