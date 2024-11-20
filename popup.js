document.getElementById('scrapeImages').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js'],
    });
  });
  

  chrome.runtime.onMessage.addListener((message) => {
    const imageLinks = document.getElementById('imageLinks');
    imageLinks.innerHTML = ""; // Clear previous results
    if (message.images && message.images.length > 0) {
      message.images.forEach(src => {
        const link = document.createElement('a');
        link.href = src;
        link.textContent = src;
        link.target = '_blank';
        link.style.display = 'block';
        imageLinks.appendChild(link);
      });
    } else {
      imageLinks.textContent = "No images found!";
    }
  });
  