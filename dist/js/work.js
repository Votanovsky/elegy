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
    gsap.to("#root-index", {
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
}