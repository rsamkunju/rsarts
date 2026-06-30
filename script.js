document.addEventListener("DOMContentLoaded", function () {
    // Sticky Navbar
    const navbar = document.getElementById("navbar");

    if (navbar) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > window.innerHeight) {
                navbar.style.position = "fixed";
            } else {
                navbar.style.position = "sticky";
            }
        });
    }

    // Back to Top
    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});