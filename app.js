
fetch("data.json")
  .then(response => response.json())
  .then(data => {

    const gallery = document.getElementById("gallery-container");

    data.forEach(photo => {

      let verifiedUsesHTML = "";

      photo.verifiedUses.forEach(use => {

        verifiedUsesHTML += `
          <a href="${use.url}"
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
                  Open Article →
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
                    href="${photo.unsplash}"
                    target="_blank"
                    rel="noopener noreferrer">

                    View on Unsplash

                </a>

                <h3 class="verified-heading">
                    Verified Uses
                </h3>

                <div class="verified-carousel">

                    ${verifiedUsesHTML}

                </div>

            </div>

        </div>

      `;

    });

  })
  .catch(error => {
      console.error("Error loading data.json:", error);
  });
