   let secretTemplates = [
      "https://cachedview.nl/#[URL]",
      "https://archive.ph/submit/?anyway=1&url=[ENCODE_URL]",
      "https://web.archive.org/save/[ENCODE_URL]"
  ];

  // Try loading external JSON
  fetch('https://backlink-generator-tool.github.io/current-url-backlink-submitter/backlink-templates.json')
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length) {
        secretTemplates = data;
        console.log("&#9989; Loaded templates from JSON");
      } else {
        throw new Error("Invalid JSON format");
      }
    })
    .catch(error => {
      console.warn("&#9888;&#65039; Failed to load external templates, using default. Reason:", error.message);
    })
    .finally(() => {
      // Start iframe loading loop after fetch attempt


  //window.onload = function () {
    for (let i = 0; i < 3; i++) {
      const iframe = document.createElement('iframe');
      iframe.classList.add('hidden-iframe', 'ping-me-iframe');
      iframe.src = 'about:blank'; // Optional: Set source or leave blank
      document.body.appendChild(iframe);
    }
  //};
      
  const targetUrl = window.location.href;
  const encodedUrl = encodeURIComponent(targetUrl);
  const iframes = document.querySelectorAll('.ping-me-iframe');

  function setRandomUrlInIframes() {
    iframes.forEach(iframe => {
      const randomTemplate = secretTemplates[Math.floor(Math.random() * secretTemplates.length)];

      const finalUrl = randomTemplate
            .replace(/\[ENCODE_URL\]|\{\{ENCODE_URL\}\}/g, encodedUrl)
            .replace(/\[URL\]|\{\{URL\}\}/g, targetUrl);

      iframe.src = finalUrl;
    });
    /*
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    setTimeout(() => {
      window.scrollTo(scrollX, scrollY);
    }, 50);
    */
  }
      setRandomUrlInIframes();
      setInterval(setRandomUrlInIframes, 60000);// 60 sec
    });
