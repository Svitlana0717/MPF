// ===============================
// MPFspec s.r.o.
// Full JS (2026) — responsive version
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // ⭐ SMOOTH SCROLL
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Закрываем мобильное меню
            closeMobileMenu();
        });
    });


    // ===============================
    // ⭐ INTERSECTION OBSERVER
    // ===============================
    const animatedElements = document.querySelectorAll(
        ".card, .info-box, .stat-item, .slider, .ba-slider"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    // После появления больше не наблюдаем
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        animatedElements.forEach(element => {

            element.classList.add("hidden");

            observer.observe(element);

        });

    } else {

        // Запасной вариант для старых браузеров
        animatedElements.forEach(element => {
            element.classList.add("show");
        });

    }


    // ===============================
    // ⭐ STATISTICS COUNTER
    // ===============================
    const counters = document.querySelectorAll(".stat-item h3");
    const statsSection = document.querySelector(".statistics");

    let countersStarted = false;


    function startCounters() {

        if (countersStarted || !counters.length) return;

        countersStarted = true;


        counters.forEach(counter => {

            const originalText = counter.textContent.trim();

            const target = parseInt(
                originalText.replace(/\D/g, ""),
                10
            );


            if (Number.isNaN(target)) return;


            let current = 0;

            const duration = 1200;

            const startTime = performance.now();


            function updateCounter(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );


                // Плавная анимация
                const easedProgress =
                    1 - Math.pow(1 - progress, 3);


                current = Math.floor(
                    target * easedProgress
                );


                counter.textContent =
                    current + "+";


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target + "+";

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        });

    }


    // Запускаем счётчики,
    // когда блок становится видимым
    if (
        statsSection &&
        "IntersectionObserver" in window
    ) {

        const statsObserver =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        startCounters();

                        statsObserver.unobserve(
                            statsSection
                        );

                    }

                });

            }, {
                threshold: 0.25
            });


        statsObserver.observe(statsSection);

    } else if (statsSection) {

        startCounters();

    }


    // ===============================
    // ⭐ HEADER SHADOW
    // ===============================
    const header =
        document.querySelector("header");


    function updateHeader() {

        if (!header) return;


        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    // Проверяем сразу
    updateHeader();


    // Passive scroll —
    // лучше работает на телефонах
    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    // ===============================
    // ⭐ BURGER / MOBILE MENU
    // ===============================
    const burger =
        document.querySelector(".burger");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    function closeMobileMenu() {

        if (!burger || !mobileMenu) return;


        mobileMenu.classList.remove("open");

        burger.classList.remove("active");

        burger.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    function openMobileMenu() {

        if (!burger || !mobileMenu) return;


        mobileMenu.classList.add("open");

        burger.classList.add("active");

        burger.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    if (burger && mobileMenu) {

        // Accessibility
        burger.setAttribute(
            "aria-expanded",
            "false"
        );

        burger.setAttribute(
            "aria-label",
            "Открыть меню"
        );


        // Открытие / закрытие меню
        burger.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.contains(
                        "open"
                    );


                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );


        // Закрываем после нажатия
        // на пункт меню
        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            });


        // Закрытие клавишей Escape
        document.addEventListener(
            "keydown",
            e => {

                if (e.key === "Escape") {

                    closeMobileMenu();

                }

            }
        );


        // Закрытие при клике
        // за пределами меню
        document.addEventListener(
            "click",
            e => {

                if (
                    mobileMenu.classList.contains(
                        "open"
                    ) &&
                    !mobileMenu.contains(
                        e.target
                    ) &&
                    !burger.contains(
                        e.target
                    )
                ) {

                    closeMobileMenu();

                }

            }
        );


        // Если перешли с телефона
        // на компьютер
        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 900) {

                    closeMobileMenu();

                }

            }
        );

    }


    // ===============================
    // ⭐ BEFORE / AFTER SLIDERS
    // ===============================
    function initBaSliders() {

        const sliders =
            document.querySelectorAll(
                ".ba-slider"
            );


        sliders.forEach(slider => {

            const images =
                slider.querySelectorAll(
                    ".ba-image"
                );

            const prev =
                slider.querySelector(
                    ".ba-prev"
                );

            const next =
                slider.querySelector(
                    ".ba-next"
                );


            // Если изображений нет —
            // ничего не делаем
            if (!images.length) return;


            let index = 0;


            function show(i) {

                images.forEach(
                    (image, imageIndex) => {

                        image.classList.toggle(
                            "active",
                            imageIndex === i
                        );

                    }
                );

            }


            // Кнопка назад
            if (prev) {

                prev.addEventListener(
                    "click",
                    () => {

                        index =
                            (index - 1 +
                                images.length) %
                            images.length;

                        show(index);

                    }
                );

            }


            // Кнопка вперёд
            if (next) {

                next.addEventListener(
                    "click",
                    () => {

                        index =
                            (index + 1) %
                            images.length;

                        show(index);

                    }
                );

            }


            // ===============================
            // ⭐ SWIPE ДЛЯ ТЕЛЕФОНА
            // ===============================

            let touchStartX = 0;
            let touchEndX = 0;


            slider.addEventListener(
                "touchstart",
                e => {

                    touchStartX =
                        e.changedTouches[0]
                            .screenX;

                },
                {
                    passive: true
                }
            );


            slider.addEventListener(
                "touchend",
                e => {

                    touchEndX =
                        e.changedTouches[0]
                            .screenX;


                    const swipeDistance =
                        touchEndX -
                        touchStartX;


                    const minSwipeDistance =
                        50;


                    // Слишком маленький свайп
                    if (
                        Math.abs(
                            swipeDistance
                        ) < minSwipeDistance
                    ) {
                        return;
                    }


                    // Свайп влево → следующее
                    if (swipeDistance < 0) {

                        index =
                            (index + 1) %
                            images.length;

                    }

                    // Свайп вправо → предыдущее
                    else {

                        index =
                            (index - 1 +
                                images.length) %
                            images.length;

                    }


                    show(index);

                },
                {
                    passive: true
                }
            );


            // Показываем первую картинку
            show(index);

        });

    }


    // Запускаем слайдеры
    initBaSliders();


    // ===============================
    // ⭐ PREVENT HORIZONTAL OVERFLOW
    // ===============================
    document.documentElement.style.overflowX =
        "hidden";

    document.body.style.overflowX =
        "hidden";


    // ===============================
    // ⭐ REDUCED MOTION
    // ===============================
    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    // ===============================
    // ⭐ WEBSITE READY
    // ===============================
    console.log(
        "MPFspec website (2026) fully loaded"
    );

});