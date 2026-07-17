fetch("data.json")
  .then(response => response.json())
  .then(data => {

    const gallery = document.getElementById("gallery-container");

    gallery.innerHTML = "";

    data.forEach(photo => {

      let publicationsHTML = "";

      photo.publishedIn.forEach(use => {

        publicationsHTML += `
          <a
            href="${use.url}"
            class="verified-card"
            target="_blank"
            rel="noopener noreferrer">

              <div class="verified-site">
                  ${use.site}
              </div>

              <div class="verified-title">
                  ${use.title}
              </div>

              <div class="verified-link">
                  Read Article →
              </div>

          </a>
        `;

      });

      gallery.innerHTML += `

        <div class="photo-card">

            <img
                class="photo-image"
                src="${photo.photo}"
                alt="${photo.title}">

            <div class="photo-content">

                <h2>${photo.title}</h2>

                <a
                    class="unsplash-button"
                    href="${photo.unsplashPhoto}"
                    target="_blank"
                    rel="noopener noreferrer">

                    View Original on Unsplash

                </a>

                <h3 class="verified-heading">
                    Published In
                </h3>

                <div class="verified-carousel">

                    ${publicationsHTML}

                </div>

            </div>

        </div>

      `;

    });

  })
  .catch(error => {
    console.error("Error loading data.json:", error);
  });


// ===============================
// Explore Collection Button
// ===============================

const exploreBtn = document.querySelector(".explore-btn");

if (exploreBtn) {

  exploreBtn.addEventListener("click", () => {

    document.getElementById("gallery").scrollIntoView({
      behavior: "smooth"
    });

  });

}
