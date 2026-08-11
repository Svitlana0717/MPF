// ===============================
// MPFspec s.r.o.
// Professional Website JavaScript
// ===============================


// ===============================
// Smooth Scroll for Menu Links
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// ===============================
// Intersection Observer Animations
// ===============================

const animatedElements = document.querySelectorAll(
    ".card, .info-box, .gallery img, .review-card, .stat-item"
);

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

animatedElements.forEach(element=>{
    element.classList.add("hidden");
    observer.observe(element);
});


// ===============================
// Statistics Counter Animation
// ===============================

const counters = document.querySelectorAll(".stat-item h3");
let countersStarted = false;

function startCounters(){
    if(countersStarted) return;
    countersStarted = true;

    counters.forEach(counter=>{
        let target = parseInt(counter.innerText);
        let current = 0;
        let speed = target / 80;

        let timer = setInterval(()=>{
            current += speed;

            if(current >= target){
                counter.innerText = target + "+";
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current) + "+";
            }
        }, 20);
    });
}

const statsSection = document.querySelector(".statistics");

window.addEventListener("scroll", ()=>{
    if(!statsSection) return;

    let position = statsSection.getBoundingClientRect().top;
    let screen = window.innerHeight;

    if(position < screen){
        startCounters();
    }
});


// ===============================
// Contact Form Handler
// ===============================

const form = document.querySelector(".contact-form");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();
        alert("Děkujeme za vaši poptávku. Brzy vás budeme kontaktovat.");
        form.reset();
    });
}


// ===============================
// Header Shadow on Scroll
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 50){
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
    } else {
        header.style.boxShadow = "0 5px 25px rgba(0,0,0,.08)";
    }
});


// ===============================
// Burger Menu (Mobile Navigation)
// ===============================

const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");

if(burger && mobileMenu){
    burger.addEventListener("click", ()=>{
        mobileMenu.classList.toggle("open");
        burger.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu a").forEach(link=>{
        link.addEventListener("click", ()=>{
            mobileMenu.classList.remove("open");
            burger.classList.remove("active");
        });
    });
}


// ===============================
// Console Log
// ===============================

console.log("MPFspec website loaded successfully");
