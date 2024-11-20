const images = Array.from(document.querySelectorAll('img'))
  .map(img => img.src)
  .filter(src => src);

chrome.runtime.sendMessage({ images });
