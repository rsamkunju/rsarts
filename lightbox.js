document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    const sliderContainer = document.getElementById("slider-container");
    const sliderRange = document.getElementById("slider-range");
    const comparisonSlider = document.querySelector(".comparison-slider");
    const imgAfter = document.getElementById("img-after");
    const imgBefore = document.getElementById("img-before");

    const closeBtn = document.querySelector(".close-lightbox");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");

    if (!lightbox || !lightboxImg || !closeBtn || !prevBtn || !nextBtn) {
        console.warn("Lightbox base elements are missing.");
        return;
    }

    // ADDED: create a video element for the lightbox if it does not exist
    let lightboxVideo = document.getElementById("lightbox-video");

    if (!lightboxVideo) {
        lightboxVideo = document.createElement("video");
        lightboxVideo.id = "lightbox-video";
        lightboxVideo.className = "lightbox-media";
        lightboxVideo.controls = true;
        lightboxVideo.playsInline = true;
        lightboxVideo.style.display = "none";

        lightboxImg.insertAdjacentElement("afterend", lightboxVideo);
    }

    let activeItems = [];
    let currentIndex = 0;

    function getAllLightboxItems() {
        return Array.from(document.querySelectorAll(
            ".js-lightbox-item, .gooey-showcase-grid .gooey-grid-item, .gooey-showcase-alt .gooey-grid-item, .ember-showcase-grid .ember-grid-item, .ember-showcase-alt .ember-grid-item"
        )).filter(function (item) {
            return item.querySelector(".img-primary");
        });
    }

    function getGalleryItems(clickedItem) {
        const galleryName = clickedItem.getAttribute("data-lightbox-gallery");

        if (galleryName) {
            return getAllLightboxItems().filter(function (item) {
                return item.getAttribute("data-lightbox-gallery") === galleryName;
            });
        }

        const parentGrid = clickedItem.closest(
            ".gooey-showcase-grid, .gooey-showcase-alt, .ember-showcase-grid, .ember-showcase-alt"
        );

        if (parentGrid) {
            return Array.from(parentGrid.querySelectorAll(
                ".js-lightbox-item, .gooey-grid-item, .ember-grid-item"
            )).filter(function (item) {
                return item.querySelector(".img-primary");
            });
        }

        return getAllLightboxItems();
    }

    function openFromElement(clickedItem) {
        activeItems = getGalleryItems(clickedItem);
        currentIndex = activeItems.indexOf(clickedItem);

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        updateLightboxContent();

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function updateLightboxContent() {
        const currentItem = activeItems[currentIndex];

        if (!currentItem) return;

        const primaryImg = currentItem.querySelector(".img-primary");
        const hoverImg = currentItem.querySelector(".img-hover");

        if (!primaryImg) return;

        // ADDED: stop/reset video whenever switching lightbox items
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.innerHTML = "";
        lightboxVideo.load();
        lightboxVideo.style.display = "none";

        const isVideo =
            currentItem.getAttribute("data-type") === "video" ||
            primaryImg.tagName.toLowerCase() === "video";

        // ADDED: video mode
        if (isVideo) {
            if (sliderContainer) {
                sliderContainer.style.display = "none";
            }

            lightboxImg.style.display = "none";
            lightboxImg.src = "";

            const videoSrc =
                currentItem.getAttribute("data-src") ||
                primaryImg.getAttribute("src") ||
                primaryImg.querySelector("source")?.getAttribute("src");

            if (!videoSrc) return;

            lightboxVideo.innerHTML = `
                <source src="${videoSrc}" type="video/mp4">
            `;

            lightboxVideo.style.display = "block";
            lightboxVideo.load();
            lightboxVideo.play();

            return;
        }

        const primarySrc = primaryImg.getAttribute("src");
        const hoverSrc = hoverImg ? hoverImg.getAttribute("src") : null;

        // EMBERHORN MODE: primary + hover image = comparison slider
        if (hoverSrc && sliderContainer && sliderRange && comparisonSlider && imgAfter && imgBefore) {
            lightboxImg.style.display = "none";
            sliderContainer.style.display = "block";

            imgAfter.src = primarySrc;
            imgAfter.alt = primaryImg.alt || "Regular render";

            imgBefore.src = hoverSrc;
            imgBefore.alt = hoverImg.alt || "Material view";

            sliderRange.value = 50;
            comparisonSlider.style.setProperty("--position", "50%");
        }

        // GOOEY MODE: only primary image = normal lightbox
        else {
            if (sliderContainer) {
                sliderContainer.style.display = "none";
            }

            lightboxImg.style.display = "block";
            lightboxImg.src = primarySrc;
            lightboxImg.alt = primaryImg.alt || "Full View";
        }
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        lightboxImg.src = "";

        // ADDED: stop video when closing
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.innerHTML = "";
        lightboxVideo.load();
        lightboxVideo.style.display = "none";

        if (imgAfter) imgAfter.src = "";
        if (imgBefore) imgBefore.src = "";
    }

    function showNextImage() {
        if (activeItems.length === 0) return;

        currentIndex++;

        if (currentIndex >= activeItems.length) {
            currentIndex = 0;
        }

        updateLightboxContent();
    }

    function showPrevImage() {
        if (activeItems.length === 0) return;

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = activeItems.length - 1;
        }

        updateLightboxContent();
    }

    getAllLightboxItems().forEach(function (item) {
        item.addEventListener("click", function () {
            openFromElement(item);
        });
    });

    if (sliderRange && comparisonSlider) {
        sliderRange.addEventListener("input", function (event) {
            comparisonSlider.style.setProperty("--position", event.target.value + "%");
        });
    }

    closeBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        closeLightbox();
    });

    nextBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        showNextImage();
    });

    prevBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        showPrevImage();
    });

    lightboxImg.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // ADDED: clicking the video itself should not close the lightbox
    lightboxVideo.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    if (sliderContainer) {
        sliderContainer.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }

        if (event.key === "ArrowLeft") {
            showPrevImage();
        }
    });

    // Keeps older onclick="openLightbox(this)" code working if any still exists
    window.openLightbox = function (element) {
        openFromElement(element);
    };
});