document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("bi-list");
                    icon.classList.add("bi-x-lg");
                } else {
                    icon.classList.remove("bi-x-lg");
                    icon.classList.add("bi-list");
                }
            }

        });

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("bi-x-lg");
                    icon.classList.add("bi-list");
                }

            });

        });

    }


    /* =========================================================
       NAVBAR SCROLL EFFECT
    ========================================================= */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        function updateNavbar() {

            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        }

        updateNavbar();

        window.addEventListener("scroll", updateNavbar);

    }


    /* =========================================================
       FAQ ACCORDION
    ========================================================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = question ? question.querySelector("i") : null;

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", function () {

            const isAlreadyOpen = item.classList.contains("active");


            /* Close every FAQ */

            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                const otherIcon =
                    otherItem.querySelector(".faq-question i");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

                if (otherIcon) {
                    otherIcon.style.transform = "rotate(0deg)";
                }

            });


            /* Open the clicked FAQ */

            if (!isAlreadyOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                if (icon) {
                    icon.style.transform = "rotate(45deg)";
                }

            }

        });

    });


    /* =========================================================
       SCROLL REVEAL ANIMATIONS
    ========================================================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-heading, " +
        ".about-content, " +
        ".service-card, " +
        ".project-card, " +
        ".why-item, " +
        ".process-step, " +
        ".price-card, " +
        ".payment-step, " +
        ".faq-item, " +
        ".contact-box"
    );


    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("show");
        });

    }


    /* =========================================================
       STAGGERED CARD ANIMATION
    ========================================================= */

    const cardGroups = [
        ".services-grid .service-card",
        ".projects-grid .project-card",
        ".pricing-grid .price-card",
        ".process-grid .process-step"
    ];


    cardGroups.forEach(function (selector) {

        const cards = document.querySelectorAll(selector);

        cards.forEach(function (card, index) {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        });

    });


    /* =========================================================
       SMOOTH ANCHOR SCROLLING
    ========================================================= */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarElement =
                document.querySelector(".navbar");

            const navbarHeight =
                navbarElement
                    ? navbarElement.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================================
       PROJECT LINKS
    ========================================================= */

    const projectLinks =
        document.querySelectorAll(".project-overlay a");


    projectLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href =
                link.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();
            }

        });

    });


    /* =========================================================
       PROJECT LOADER
       Only appears when opening a project
    ========================================================= */

    const loader =
        document.getElementById("projectLoader");


    if (loader) {

        const liveProjectLinks =
            document.querySelectorAll(
                '.project-image a[href], .project-info a[href]'
            );


        liveProjectLinks.forEach(function (link) {

            if (link.classList.contains("back-to-portfolio")) {
                return;
            }


            link.addEventListener("click", function (event) {

                const destination =
                    this.href;


                if (
                    !destination ||
                    destination === "#" ||
                    destination.includes("#")
                ) {
                    return;
                }


                event.preventDefault();


                loader.classList.add("active");


                setTimeout(function () {

                    window.location.href =
                        destination;

                }, 1200);

            });

        });

    }


    /* =========================================================
       REMOVE LOADER WHEN RETURNING TO PORTFOLIO
    ========================================================= */

    window.addEventListener("pageshow", function () {

        const currentLoader =
            document.getElementById("projectLoader");

        if (currentLoader) {
            currentLoader.classList.remove("active");
        }

    });


    /* =========================================================
       REDUCED MOTION SUPPORT
    ========================================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        document
            .querySelectorAll(".reveal")
            .forEach(function (element) {

                element.classList.add("show");

            });

    }

});