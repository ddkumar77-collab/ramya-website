document.addEventListener('DOMContentLoaded', () => {
  console.log("Ramya Deepak Kumar's portfolio initialized successfully.");

  // --- Smooth Scroll for Navigation ---
  const navLinks = document.querySelectorAll('nav a, .social-links a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 40,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- Card Micro-Animations on Scroll ---
  function applyFadeAnimations() {
    const fadeElements = document.querySelectorAll('.writing-item, .event-card');
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      observer.observe(el);
    });
  }

  applyFadeAnimations();

  // --- Fetch Dynamic CMS Content (Bio) ---
  fetch('content/bio.json')
    .then(res => {
      if (!res.ok) throw new Error("No bio.json");
      return res.json();
    })
    .then(data => {
      if (data.subtitle) {
        const sub = document.querySelector('.hero-subtitle');
        if (sub) sub.textContent = data.subtitle;
      }
      if (data.headline) {
        const h1 = document.querySelector('.hero-text h1');
        if (h1) h1.textContent = data.headline;
      }
      const paragraphs = document.querySelectorAll('.hero-text p');
      if (paragraphs[0] && data.bioParagraph1) paragraphs[0].innerHTML = data.bioParagraph1;
      if (paragraphs[1] && data.bioParagraph2) paragraphs[1].innerHTML = data.bioParagraph2;
    })
    .catch(err => console.log('Using static fallback for bio.'));

  // --- Fetch Dynamic CMS Content (Publications & Links) ---
  fetch('content/publications.json')
    .then(res => {
      if (!res.ok) throw new Error("No publications.json");
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const pubContainer = document.getElementById('cms-pubs-container');
        if (pubContainer) {
          pubContainer.innerHTML = data.map(pub => `
            <div class="writing-item">
              <div class="writing-meta">${pub.type || 'Publication'}</div>
              <div class="writing-content">
                <h3>${pub.link ? `<a href="${pub.link}" target="_blank">${pub.title}</a>` : pub.title}</h3>
                <p>${pub.description || ''}</p>
                ${pub.link ? `<a href="${pub.link}" class="read-more" target="_blank" style="font-size: 0.85rem;">View Article</a>` : ''}
              </div>
            </div>
            <hr class="divider" style="margin: 20px 0;">
          `).join('');
          applyFadeAnimations();
        }
      }
    })
    .catch(err => console.log('Using static fallback for publications.'));

  // --- Fetch Dynamic CMS Content (Events) ---
  fetch('content/events.json')
    .then(res => {
      if (!res.ok) throw new Error("No events.json");
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const eventsGrid = document.querySelector('.events-grid');
        if (eventsGrid) {
          eventsGrid.innerHTML = data.map(event => `
            <div class="event-card">
              <div class="event-details">
                <div class="event-date">${event.category || 'Event'}</div>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
              </div>
            </div>
          `).join('');
          applyFadeAnimations();
        }
      }
    })
    .catch(err => console.log('Using static fallback for events.'));

  // --- Dynamic Substack Feed Fetching ---
  const feedContainer = document.getElementById('substack-feed-container');
  if (feedContainer) {
    const rssUrl = 'https://ramyadeepak.substack.com/feed';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch RSS feed");
        return response.json();
      })
      .then(data => {
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          feedContainer.innerHTML = '';
          const itemsToDisplay = data.items.slice(0, 2);
          itemsToDisplay.forEach((item, index) => {
            const pubDate = new Date(item.pubDate);
            const formattedDate = pubDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short'
            });

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.description || item.content;
            let snippet = tempDiv.textContent || tempDiv.innerText || "";
            snippet = snippet.trim();
            if (snippet.length > 140) {
              snippet = snippet.substring(0, 137) + '...';
            }

            const articleHtml = `
              <div class="writing-item">
                <div class="writing-meta">Newsletter<br>${formattedDate}</div>
                <div class="writing-content">
                  <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                  <p>${snippet}</p>
                  <a href="${item.link}" class="read-more" target="_blank" style="font-size: 0.85rem;">Read on Substack</a>
                </div>
              </div>
              ${index < itemsToDisplay.length - 1 ? '<hr class="divider" style="margin: 20px 0;">' : ''}
            `;
            feedContainer.insertAdjacentHTML('beforeend', articleHtml);
          });
          applyFadeAnimations();
        } else {
          showFallbackFeed();
        }
      })
      .catch(err => {
        console.error("Substack RSS load error:", err);
        showFallbackFeed();
      });
  }

  function showFallbackFeed() {
    feedContainer.innerHTML = `
      <div class="writing-item">
        <div class="writing-meta">Newsletter</div>
        <div class="writing-content">
          <h3><a href="https://ramyadeepak.substack.com" target="_blank">On Education Substack</a></h3>
          <p>Read Ramya's latest articles and essays on education leadership, student agency, and pedagogical research.</p>
          <a href="https://ramyadeepak.substack.com" class="read-more" target="_blank" style="font-size: 0.85rem;">Visit Substack</a>
        </div>
      </div>
    `;
    applyFadeAnimations();
  }
});
