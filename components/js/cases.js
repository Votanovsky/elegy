export function loadCases() {
    // Появления бордеров у проектов по триггеру
    gsap.to(".border_width", {
        clipPath: "polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)",
        // ease: "expo.inOut",
        // duration: 1.5,

        scrollTrigger: {
            trigger: ".cases_trigger",
            start: "bottom 300",
            end: "top top",
            toggleActions: "play none reverse none",
            // markers: true,
            // id: "scrub"
        }
    });


    gsap.to(".border_height", {
        clipPath: "polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)",
        delay: .3,
        // ease: "expo.inOut",
        // duration: 1.5,

        scrollTrigger: {
            trigger: ".cases_trigger",
            start: "bottom 300",
            end: "top top",
            toggleActions: "play none reverse none",
            // markers: true,
            // id: "scrub"
        }
    });
    // /Появления бордеров у проектов по триггеру

    // Смена цвета страницы и цвета хедера
    gsap.to("#root-index", {
        background: 'rgb(135,129,123)',
        // ease: "expo.inOut",
        // duration: 1.5,

        scrollTrigger: {
            trigger: ".bg_color-trigger",
            start: "top 300",
            end: "top top",
            toggleActions: "play none reverse none",
            // markers: true,
            scrub: 6,
            // id: "scrub"
        }
    });

    gsap.to(".hdr", {
        background: 'rgb(135,129,123)',
        // ease: "expo.inOut",
        // duration: 1.5,

        scrollTrigger: {
            trigger: ".bg_color-trigger",
            start: "top 300",
            end: "top top",
            toggleActions: "play none reverse none",
            // markers: true,
            scrub: 6,
            // id: "scrub"
        }
    });
    // /Смена цвета страницы и цвета хедера
}