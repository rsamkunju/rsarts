function navigateGallery(event, direction, galleryId) {
  event.stopPropagation(); // Prevent triggering other click events

  const gallery = document.getElementById(galleryId);
  const items = gallery.querySelectorAll('img, video'); // Include both images and videos
  const portfolioItem = event.target.closest('.portfolio-item');
  const currentDisplay = portfolioItem.querySelector('.image-container img, .image-container video'); // The currently displayed item (image or video)

  // Find the current item's index in the gallery
  let currentIndex = -1;
  items.forEach((item, index) => {
    if (item.src === currentDisplay.src || item.querySelector('source')?.src === currentDisplay.src) {
      currentIndex = index;
    }
  });

  // Calculate the new index
  let newIndex = currentIndex + direction;
  if (newIndex < 0) newIndex = items.length - 1; // Loop to the last item
  if (newIndex >= items.length) newIndex = 0; // Loop to the first item

  // Update the displayed image or video
  const newItem = items[newIndex];
  if (newItem.tagName === 'IMG') {
    // If the next item is an image, replace the current display with the new image
    const imgElement = document.createElement('img');
    imgElement.src = newItem.src;
    imgElement.alt = newItem.alt;
    imgElement.style.width = '100%'; // Ensure the image fits the container
    currentDisplay.replaceWith(imgElement);
  } else if (newItem.tagName === 'VIDEO') {
    // If the next item is a video, replace the current display with the new video
    const videoElement = document.createElement('video');
    videoElement.src = newItem.querySelector('source').src;
    videoElement.autoplay = true; // Autoplay the video
    videoElement.muted = true; // Mute the video (required for autoplay in most browsers)
    videoElement.style.width = '100%'; // Ensure the video fits the container

    // Add controls only when the video is hovered or interacted with
    videoElement.addEventListener('play', () => {
      videoElement.controls = true; // Add controls when the video plays
    });

    videoElement.addEventListener('pause', () => {
      videoElement.controls = false; // Remove controls when the video is paused
    });

    currentDisplay.replaceWith(videoElement);
  }
}