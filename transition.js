document.addEventListener("DOMContentLoaded", function () {
    const dynamicText = document.querySelector(".dynamic-text");
  
    // Function to blur out and replace text
    function replaceText() {
      // Add the blur-out class to start the blur effect
      dynamicText.classList.add("blur-out");
  
      // Wait for the blur effect to complete, then replace the text
      setTimeout(() => {
        dynamicText.textContent = "versatile"; // Replace the text
        dynamicText.classList.remove("blur-out"); // Remove the blur class
        dynamicText.classList.add("fade-in"); // Add the fade-in class
      }, 1500); // Match this duration with the CSS transition duration
    }
  
    // Variables to track visibility and timing
    let isVisible = false;
    let visibilityTimer = null;
    const visibilityDuration = 2000; // 2 seconds of continuous visibility
  
    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible
            if (!isVisible) {
              isVisible = true;
              // Start a timer to trigger the effect after the specified duration
              visibilityTimer = setTimeout(() => {
                replaceText();
                // Stop observing after the effect is triggered
                observer.unobserve(dynamicText);
              }, visibilityDuration);
            }
          } else {
            // Element is no longer visible
            if (isVisible) {
              isVisible = false;
              // Clear the timer if the user scrolls away before the duration is complete
              clearTimeout(visibilityTimer);
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );
  
    // Start observing the dynamic-text element
    observer.observe(dynamicText);
  });