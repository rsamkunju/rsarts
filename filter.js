// Portfolio Filter Logic
document.querySelectorAll('.portfolio-filter button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const categories = item.getAttribute('data-category').split(', ');  // Split the categories into an array

            // Check if the filter matches any category in the list
            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Add the active class to the clicked filter button
        document.querySelectorAll('.portfolio-filter button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Open Gallery (Updated to display the gallery with images or video)
function openGallery(galleryId) {
    const galleryView = document.getElementById('gallery-view');
    const galleries = document.querySelectorAll('.gallery-images');

    // Hide all galleries initially
    galleries.forEach(gallery => gallery.style.display = 'none');

    // Display the selected gallery
    const selectedGallery = document.getElementById(galleryId);
    if (selectedGallery) {
        selectedGallery.style.display = 'flex';
    }

    // Show the gallery view
    galleryView.classList.add('active');
}

// Close Gallery (Updated to hide the gallery when closed)
function closeGallery() {
    document.getElementById('gallery-view').classList.remove('active');
}

// Navigation between Gallery Items (Previous/Next)
function navigateGallery(event, direction, galleryId) {
    const gallery = document.getElementById(galleryId);
    const items = gallery.querySelectorAll('img, video');  // Include both images and videos in the gallery
    let currentIndex = Array.from(items).findIndex(item => item.style.display !== 'none');

    // Hide the current item
    if (currentIndex !== -1) {
        items[currentIndex].style.display = 'none';
    }

    // Determine the next item to display
    currentIndex += direction;
    if (currentIndex >= items.length) {
        currentIndex = 0;  // Loop to the first item
    } else if (currentIndex < 0) {
        currentIndex = items.length - 1;  // Loop to the last item
    }

    // Show the next item
    items[currentIndex].style.display = 'block';
}

// Open Gallery on Item Click (Call this function on clicking a portfolio item)
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const galleryId = item.querySelector('.gallery-images').id;  // Get the gallery ID
        openGallery(galleryId);  // Open the corresponding gallery
    });
});
