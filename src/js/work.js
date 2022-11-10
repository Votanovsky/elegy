import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function loadWork() {
    // Появления бордеров у текста по триггеру
    gsap.to(".border_width-work", {
        
        clipPath: "polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)",

        scrollTrigger: {
            trigger: ".work_border-trigger",
            start: "top 300",
            end: "top bottom",
            toggleActions: "play none reverse none",
            // markers: true
        }
    });

    gsap.to(".border_height-work", {
        clipPath: "polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)",
        delay: .3,

        scrollTrigger: {
            trigger: ".work_border-trigger",
            start: "top 300",
            end: "top bottom",
            toggleActions: "play none reverse none",
        }
    });
    // /Появления бордеров у текста по триггеру

    // Смена цвета страницы и цвета хедера
    gsap.to(".root-index", {
        background: 'rgb(135,129,123)',

        scrollTrigger: {
            trigger: ".bg_color-trigger",
            start: "top 300",
            end: "top top",
            toggleActions: "play none reverse none",
            scrub: 6,
        }
    });

    gsap.to(".hdr", {
        background: 'rgb(135,129,123)',

        scrollTrigger: {
            trigger: ".bg_color-trigger",
            start: "top 300",
            end: "top top",
            toggleActions: "play none reverse none",
            scrub: 6,
        }
    });
    // /Смена цвета страницы и цвета хедера


    // Появление заголовка 
    gsap.to(".name-1", {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: 0,
        ease: 'power4.inOut',
        duration: 1.6,
    });
    gsap.to(".name-2", {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: 0,
        ease: 'power4.inOut',
        duration: 1.6,
    });
    gsap.to(".name-3", {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: 0,
        ease: 'power4.inOut',
        duration: 1.3,
        scrollTrigger: {
            trigger: ".name-3",
            start: "top 500",
            end: "top bottom",
            // toggleActions: "play none reverse none",

        }
    });
    gsap.to(".name-4", {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: 0,
        ease: 'power4.inOut',
        duration: 1.3,
        scrollTrigger: {
            trigger: ".name-4",
            start: "top 500",
            end: "top bottom",
            // toggleActions: "play none reverse none",

        }
    });
    gsap.to(".name-5", {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: 0,
        ease: 'power4.inOut',
        duration: 1.3,
        scrollTrigger: {
            trigger: ".name-5",
            start: "top 500",
            end: "top bottom",
            // toggleActions: "play none reverse none",

        }
    });
    gsap.to(".name-6", {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: 0,
        ease: 'power4.inOut',
        duration: 1.3,
        scrollTrigger: {
            trigger: ".name-6",
            start: "top 500",
            end: "top bottom",
            // toggleActions: "play none reverse none",

        }
    });
}