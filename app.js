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
    
    // --- COUNTER ANIMATION ---
    const counters = document.querySelectorAll('.stat h2');
    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.innerText.replace(/\D/g, ''));
          const updateCount = () => {
            const current = parseInt(counter.innerText.replace(/\D/g, ''));
            const increment = target / 50;
            if (current < target) {
              counter.innerText = Math.ceil(current + increment) + '+';
              setTimeout(updateCount, 30);
            } else {
              counter.innerText = target.toLocaleString() + '+';
            }
          };
          updateCount();
          observer.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach(c => observer.observe(c));
  })
  .catch(error => console.error("Error loading data.json:", error));
