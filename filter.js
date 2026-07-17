document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(
        ".portfolio-filter button[data-filter]"
    );

    const portfolioItems = document.querySelectorAll(
        ".portfolio-container .portfolio-item"
    );

    const emptyMessage = document.querySelector(
        ".portfolio-empty-message"
    );

    if (!filterButtons.length || !portfolioItems.length) {
        return;
    }

    function normalizeValue(value) {
        return value.trim().toLowerCase();
    }

    function getItemCategories(item) {
        const categories = item.dataset.category || "";

        return categories
            .split(",")
            .map(normalizeValue)
            .filter(Boolean);
    }

    function applyFilter(selectedFilter) {
        const normalizedFilter = normalizeValue(selectedFilter);
        let visibleProjectCount = 0;

        portfolioItems.forEach(function (item) {
            const categories = getItemCategories(item);

            const shouldDisplay =
                normalizedFilter === "all" ||
                categories.includes(normalizedFilter);

            item.hidden = !shouldDisplay;

            if (shouldDisplay) {
                visibleProjectCount += 1;
            }
        });

        if (emptyMessage) {
            emptyMessage.hidden = visibleProjectCount !== 0;
        }
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (currentButton) {
                currentButton.classList.remove("is-active");
                currentButton.setAttribute("aria-pressed", "false");
            });

            button.classList.add("is-active");
            button.setAttribute("aria-pressed", "true");

            applyFilter(button.dataset.filter);
        });
    });

    applyFilter("all");
});