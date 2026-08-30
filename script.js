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
      // Initial states for fade-in effect
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      observer.observe(el);
    });
  }

  // Run animations initially
  applyFadeAnimations();

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
          feedContainer.innerHTML = ''; // Clear loading text
          
          // Display the top 2 latest articles from Substack
          const itemsToDisplay = data.items.slice(0, 2);
          itemsToDisplay.forEach((item, index) => {
            // Format the publication date
            const pubDate = new Date(item.pubDate);
            const formattedDate = pubDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short'
            });

            // Extract a clean plain-text snippet (strip HTML tags)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.description || item.content;
            let snippet = tempDiv.textContent || tempDiv.innerText || "";
            snippet = snippet.trim();
            if (snippet.length > 140) {
              snippet = snippet.substring(0, 137) + '...';
            }

            const articleHtml = `
              <hr class="divider" style="margin: 20px 0;">
              <div class="writing-item">
                <div class="writing-meta">Newsletter<br>${formattedDate}</div>
                <div class="writing-content">
                  <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                  <p>${snippet}</p>
                  <a href="${item.link}" class="read-more" target="_blank" style="font-size: 0.85rem;">Read on Substack</a>
                </div>
              </div>
            `;
            feedContainer.insertAdjacentHTML('beforeend', articleHtml);
          });

          // Re-apply animations for new dynamic items
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
      <hr class="divider" style="margin: 20px 0;">
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
