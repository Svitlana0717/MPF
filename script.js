// ===============================
// MPFspec s.r.o.
// Website JavaScript
// ===============================


// Плавная прокрутка меню

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const target = document.querySelector(
            this.getAttribute("href")
        );


        if(target){

            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});




// ===============================
// Анимация появления элементов
// ===============================


const animatedElements = document.querySelectorAll(
".card, .info-box, .gallery img, .review-card, .stat-item"
);



const observer = new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("show");


}


});


},

{

threshold:0.15

}


);



animatedElements.forEach(element=>{


element.classList.add("hidden");


observer.observe(element);


});







// ===============================
// Счетчики статистики
// ===============================


const counters = document.querySelectorAll(
".stat-item h3"
);



let started = false;



function startCounters(){


if(started) return;


started = true;



counters.forEach(counter=>{


let target = counter.innerText;



let number = parseInt(target);



let current = 0;



let speed = number / 80;



let timer = setInterval(()=>{


current += speed;



if(current >= number){


counter.innerText = target;


clearInterval(timer);


}else{


counter.innerText =
Math.floor(current) + "+";


}



},20);



});



}





const statsSection =
document.querySelector(".statistics");



window.addEventListener("scroll",()=>{


if(!statsSection) return;



let position =
statsSection.getBoundingClientRect().top;



let screen =
window.innerHeight;



if(position < screen){

startCounters();

}


});







// ===============================
// Форма заявки
// ===============================


const form =
document.querySelector(".contact-form");



if(form){


form.addEventListener(
"submit",
function(e){


e.preventDefault();



alert(
"Děkujeme za vaši poptávku. Brzy vás budeme kontaktovat."
);



form.reset();



}

);


}







// ===============================
// Изменение шапки при скролле
// ===============================


const header =
document.querySelector("header");



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 50){


header.style.boxShadow =
"0 10px 30px rgba(0,0,0,.15)";


}else{


header.style.boxShadow =
"0 5px 25px rgba(0,0,0,.08)";


}



}

);






console.log(
"MPFspec website loaded successfully"
);