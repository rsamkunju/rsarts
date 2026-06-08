function openLightbox(element) {
    // 1. Get all the parts of the lightbox
    const lightbox = document.getElementById('lightbox');
    const imgBefore = document.getElementById('img-before');
    const imgAfter = document.getElementById('img-after');
    const sliderWrap = document.getElementById('img-before-wrap');
    const range = document.getElementById('slider-range');
    const handle = document.getElementById('slider-handle');

    // 2. Get the images from the clicked grid item
    const primaryImg = element.querySelector('.img-primary');
    const hoverImg = element.querySelector('.img-hover');

    // Safety check: If no primary image, stop here
    if (!primaryImg) {
        console.error("Could not find .img-primary in the clicked item");
        return;
    }

    // 3. Set the image sources
    imgAfter.src = primaryImg.src;
    // Use hover image if it exists, otherwise use primary for both
    imgBefore.src = hoverImg ? hoverImg.src : primaryImg.src;

    // 4. Show the lightbox first (needed to calculate widths)
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // 5. Set initial positions
    range.value = 50;
    sliderWrap.style.width = "50%";
    if (handle) handle.style.left = "50%";

    // 6. Function to make the image inside the "Before" wrap stay full width
    const syncImageWidth = () => {
        const container = document.querySelector('.slider-wrapper');
        if (container && imgBefore) {
            imgBefore.style.width = container.offsetWidth + "px";
        }
    };

    // Run sync immediately
    setTimeout(syncImageWidth, 10); 

    // 7. Update as you slide
    range.oninput = function() {
        let val = this.value + "%";
        sliderWrap.style.width = val;
        if (handle) handle.style.left = val;
    };

    window.addEventListener('resize', syncImageWidth);
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});