fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById("gallery-container");
    gallery.innerHTML = "";

    data.forEach(photo => {
      let verifiedUsesHTML = "";
      photo.verifiedUses.forEach(use => {
        verifiedUsesHTML += `
          <a href="${use.url}" class="verified-card" target="_blank" rel="noopener noreferrer">
              <div class="verified-site">${use.site}</div>
              <div class="verified-title">${use.title}</div>
              <div class="verified-link">Check Out →</div>
          </a>
        `;
      });

      gallery.innerHTML += `
        <div class="photo-card">
            <img class="photo-image" src="${photo.photo}" alt="${photo.title}">
            <div class="photo-content">
                <h2>${photo.title}</h2>
                <a class="unsplash-button" href="${photo.unsplash}" target="_blank" rel="noopener noreferrer">View on Unsplash</a>
                <h3 class="verified-heading">Verified Uses</h3>
                <div class="verified-carousel">${verifiedUsesHTML}</div>
            </div>
        </div>
      `;
    });
    // ---------- Counter Animation ----------
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.target);

    let current = 0;
    const step = target / 80;

    function update() {
      current += step;

      if (current >= target) {
        current = target;
      }

      if (target >= 1000000) {
        counter.textContent =
          (current / 1000000).toFixed(1).replace(".0", "") + "M+";
      } else if (target >= 1000) {
        counter.textContent =
          Math.floor(current / 1000) + "K+";
      } else {
        counter.textContent =
          Math.floor(current) + "+";
      }

      if (current < target) {
        requestAnimationFrame(update);
      }
    }

    update();
    observer.unobserve(counter);
  });
}, {
  threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));

})
.catch(error => {
    console.error("Error loading data.json:", error);
});
