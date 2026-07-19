fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById("gallery-container");
    
    // Pehle container ko khali kar dete hain taaki duplicate data na aaye
    gallery.innerHTML = "";

    data.forEach(photo => {
      let verifiedUsesHTML = "";

      // Saare cards ka HTML loop chalakar generate karenge
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
                  Check Out →
              </div>
          </a>
        `;
      });

      // Ab poora photo card main gallery container mein append karenge
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

                <!-- Is wrapper ke andar cards smoothly nowrap ho kar scroll honge -->
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
