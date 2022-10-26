import { init, tick } from './three.js';
import {loadCases} from './cases.js';

import {loadFooter} from './footer.js';
import {loadHeader} from './header.js';

import {localize} from './localization.js';

let locale = 'ru';

gsap.registerPlugin(ScrollTrigger);

async function main() {
    await loadHeader();
    await loadFooter();
    await localize(locale);

    // Разделение h1 заголовков на главной странице и анимация их повяления
    const text = new SplitType('.h1-a')

    gsap.to('.word', {
        // height: 'auto',
        y: 0,
        stagger: .15,
        // delay: 0.8,
        duration: 1.4,
        ease: "power4.out",
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    })

    gsap.to('.load_anim', {
        // height: 'auto',
        y: 0,
        delay: 1,
        duration: 1.7,
        ease: "power4.inOut",
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
    })
    // /Разделение h1 заголовков на главной странице и анимация их повяления



    // Анимация пояления/расширения шоурила на главном экране (пока там просто черный блок)
    gsap.to(".showreel_wr", {
        width: '100%',
        ease: "power4.inOut",
        scrollTrigger: {
            trigger: ".showreel_trig",
            start: "top center",
            end: "top top",
            scrub: 4,
            // markers: true,
            // id: "scrub"
        }
    });
    // /Анимация пояления/расширения шоурила на главном экране (пока там просто черный блок)


    // анимация появления и ухода меню на десктопе
    if (window.innerWidth >= 992) {
        const tl = gsap.timeline()

        tl.to(".menu_li", {
        scrollTrigger: {
            trigger: ".h1-t",
            start: "top 70",
            end: "top bottom",
            toggleActions: "play none reverse none",
            // markers: true
        },
        y: -30,
        opacity: 0,
        stagger: 0.1,
        });

        tl.to(".menu_btn", {
        scrollTrigger: {
            trigger: ".h1-t",
            start: "top 70",
            end: "top bottom",
            toggleActions: "play none reverse none",
            // markers: true,
        },
        y: 0,
        // display: 'block',
        opacity: 1,
        });
        
    }
    // /анимация появления и ухода меню на десктопе


    // Мобильное меню
    if (window.innerWidth <= 992) {

        const toggleMenu = document.querySelector('.menu_btn')
        let toggleMenuIsOpen = false

        const menu_tl = gsap.timeline()

        toggleMenu.addEventListener('click', ()=> {
            if (toggleMenuIsOpen == false) {

                toggleMenu.textContent = 'Close -'

                menu_tl.to('.menu_layout', {
                    height: '100%',
                    display: 'block',
                    y: 0,
                    ease: "expo.InOut",
                    duration: .7
                })

                menu_tl.from('.menu_li_lay', {
                    y: 30,
                    opacity: 0,
                    stagger: .1,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                    duration: .7
                })

                toggleMenuIsOpen = true
            } else{

                toggleMenu.textContent = 'Menu +'

                menu_tl.to('.menu_layout', {
                    height: '0%',
                    display: 'none',
                    y: -200,
                    ease: "expo.InOut",
                    duration: .7
                })

                toggleMenuIsOpen = false
            }
        })
    }
}

main();

if (document.title === 'About') {
    init();
    tick();
}

if (document.title === 'Cases') {
    loadCases();
}