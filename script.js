// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        navbar.style.position = 'fixed';
    } else {
        navbar.style.position = 'sticky';
    }
});

// Back to Top
const backToTop = document.getElementById('back-to-top');
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

