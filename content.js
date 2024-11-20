const images = Array.from(document.querySelectorAll('img')).map(img => img.src);
chrome.runtime.sendMessage({ images });