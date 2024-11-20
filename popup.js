let cachedImages = [];
let isLoading = false;

chrome.runtime.onMessage.addListener((message) => {
    const imageLinks = document.getElementById('imageLinks');
    if (message.images && message.images.length > 0) {
        cachedImages = message.images; // Cache the images
        displayImages(cachedImages);
    } else {
        imageLinks.textContent = "No images found!";
    }
    isLoading = false; // Reset loading state
});

// Automatically scrape images when the popup is opened
(async () => {
    if (isLoading) return; // Prevent multiple clicks
    isLoading = true;

    const imageLinks = document.getElementById('imageLinks');
    imageLinks.innerHTML = "Loading..."; // Show loading indicator

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
    });
})();

function displayImages(images) {
    const imageLinks = document.getElementById('imageLinks');
    const imageContainers = images.map(src => {
        return `
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${src}" style="width: 100px; margin-right: 10px;" />
                <a href="${src}" download="${src.split('/').pop()}" style="display: block;">Download Image</a>
            </div>
        `;
    }).join('');

    imageLinks.innerHTML = imageContainers; // Set all images at once
}