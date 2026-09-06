// ===============================
// MPFspec s.r.o.
// Full JS (2026)
// ===============================


// ⭐ NORMAL SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


// ⭐ Intersection Observer Animations
const animatedElements = document.querySelectorAll(
    ".card, .info-box, .stat-item, .slider"
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.15 });

animatedElements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});


// ⭐ Statistics Counter Animation
const counters = document.querySelectorAll(".stat-item h3");
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        let current = 0;
        const speed = target / 60;

        const timer = setInterval(() => {
            current += speed;

            if (current >= target) {
                counter.innerText = target + "+";
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current) + "+";
            }
        }, 20);
    });
}

const statsSection = document.querySelector(".statistics");

window.addEventListener("scroll", () => {
    if (!statsSection) return;

    const position = statsSection.getBoundingClientRect().top;
    const screen = window.innerHeight;

    if (position < screen) startCounters();
});


// ⭐ Header Shadow on Scroll
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (!header) return;

    header.style.boxShadow =
        window.scrollY > 50
            ? "0 10px 30px rgba(0,0,0,.15)"
            : "0 5px 25px rgba(0,0,0,.08)";
});


// ⭐ Burger Menu
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");

if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        burger.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            burger.classList.remove("active");
        });
    });
}


// ===== BEFORE / AFTER SLIDER =====

function initBaSliders() {
    const sliders = document.querySelectorAll(".ba-slider");

    sliders.forEach(slider => {
        const images = slider.querySelectorAll(".ba-image");
        const prev = slider.querySelector(".ba-prev");
        const next = slider.querySelector(".ba-next");

        let index = 0;

        function show(i) {
            images.forEach((img, idx) => {
                img.classList.toggle("active", idx === i);
            });
        }

        prev.addEventListener("click", () => {
            index = (index - 1 + images.length) % images.length;
            show(index);
        });

        next.addEventListener("click", () => {
            index = (index + 1) % images.length;
            show(index);
        });

        show(index);
    });
}

document.addEventListener("DOMContentLoaded", initBaSliders);



// ⭐ Console Log
console.log("MPFspec website (2026) fully loaded");
