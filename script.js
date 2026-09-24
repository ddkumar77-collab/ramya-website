document.addEventListener('DOMContentLoaded', () => {
  console.log("Ramya Deepak Kumar website initialized successfully.");

  // --- Smooth Scroll for Navigation & Anchor Links ---
  const navLinks = document.querySelectorAll('nav a, .social-links a[href^="#"], .btn-group a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- Active Nav Link Highlighting on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('nav a[href^="#"]');

  function updateActiveNav() {
    let scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        mainNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // --- Micro-Animations on Scroll ---
  function applyFadeAnimations() {
    const fadeElements = document.querySelectorAll('.card, .writing-item, .process-step, .journey-node, .positioning-box');
    
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
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
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }

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
          feedContainer.innerHTML = '';
          const itemsToDisplay = data.items.slice(0, 3);
          itemsToDisplay.forEach((item) => {
            const pubDate = new Date(item.pubDate);
            const formattedDate = pubDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.description || item.content || "";
            let snippet = tempDiv.textContent || tempDiv.innerText || "";
            snippet = snippet.trim();
            if (snippet.length > 150) {
              snippet = snippet.substring(0, 147) + '...';
            }

            const articleHtml = `
              <div class="writing-item">
                <div class="writing-meta">Substack Essay<br>${formattedDate}</div>
                <div class="writing-content">
                  <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                  <p>${snippet}</p>
                  <a href="${item.link}" class="read-more" target="_blank">Read on Substack &rarr;</a>
                </div>
              </div>
            `;
            feedContainer.insertAdjacentHTML('beforeend', articleHtml);
          });
          applyFadeAnimations();
        } else {
          showFallbackFeed();
        }
      })
      .catch(err => {
        console.warn("Substack RSS load error:", err);
        showFallbackFeed();
      });
  }

  function showFallbackFeed() {
    feedContainer.innerHTML = `
      <div class="writing-item">
        <div class="writing-meta">Substack Feed</div>
        <div class="writing-content">
          <h3><a href="https://ramyadeepak.substack.com" target="_blank">Thinking Aloud on Substack</a></h3>
          <p>Read Ramya's latest articles and essays on education leadership, educator co-agency, and pedagogical research.</p>
          <a href="https://ramyadeepak.substack.com" class="read-more" target="_blank">Visit Substack &rarr;</a>
        </div>
      </div>
    `;
    applyFadeAnimations();
  }
});

