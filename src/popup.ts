document.getElementById('unblock-button')?.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (tabs[0]?.url) {
        const currentUrl = tabs[0].url;
        const archiveUrl = `https://archive.is/${currentUrl}`;
  
        try {
          // Fetch the HTML content of the current URL
          const response = await fetch(archiveUrl);
          const htmlText = await response.text();
  
          // Parse the HTML string into a DOM-like structure
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, 'text/html');
  
          // Find the first href inside the TEXT-BLOCK class
          const textBlock = doc.querySelector('.TEXT-BLOCK');
          const firstHref = textBlock?.querySelector('a')?.getAttribute('href');
  
          if (firstHref) {
            console.log('First href found:', firstHref);
  
            // Redirect to the archive URL
            chrome.tabs.update(tabs[0].id!, { url: firstHref });
  
            // If you want to return or use the href elsewhere, you can do it here
            return firstHref;
          } else {
            console.log('No href found in the TEXT-BLOCK class.');
          }
        } catch (error) {
          console.error('Error fetching or parsing the page:', error);
        }
      }
    });
  });
  