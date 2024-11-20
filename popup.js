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
            const imageContainer = document.createElement('div');
            const img = document.createElement('img');
            img.src = src;
            img.style.width = '100px'; // Set a width for the preview
            img.style.marginRight = '10px'; // Add some margin

            const link = document.createElement('a');
            link.href = src;
            link.textContent = "Download Image";
            link.download = src.split('/').pop(); // Set the filename for download
            link.style.display = 'block';

            imageContainer.appendChild(img);
            imageContainer.appendChild(link);
            imageLinks.appendChild(imageContainer);
        });
    } else {
        imageLinks.textContent = "No images found!";
    }
});