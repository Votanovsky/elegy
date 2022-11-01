import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SplitType from 'split-type';

import { init, tick, stopTick } from './three.js';
import {loadCases} from './cases.js';

import {loadWork} from './work.js';

import {loadFooter} from './footer.js';
import {loadHeader} from './header.js';

import {localize, switchLang, getLocale} from './localization.js';

// import barba from '@barba/core';
import {pagesTransitionsEx} from './pages.js';

let locale;
const mobileWidth = 992;

gsap.registerPlugin(ScrollTrigger);

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

async function loadPage() {
    await loadHeader();
    await loadFooter();

    const langSwitches = document.querySelectorAll("#language");

    langSwitches.forEach(langSwitch => langSwitch.addEventListener('click', () => { // смена языка по нажатию на кнопку
        window.location.href = window.location.pathname;
        locale = switchLang(langSwitch);
        setCookie('locale', locale, 30);
    }));

    locale = getCookie('locale'); // достаём локаль из куки
    if (!locale) { // если куки нет
        // locale = getLocale(); // получаем локаль пользователя
        locale = 'en';
        setCookie('locale', locale, 30);
    }

    await localize(locale);

    // Разделение h1 заголовков на главной странице и анимация их повяления
    const text = new SplitType('.h1-a')
    const textClipTl = gsap.timeline()
    textClipTl.to('.word', {
        // height: 'auto',
        y: 0,
        stagger: .17,
        // delay: 0.8,
        duration: 1.7,
        ease: "power4.out",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    })
    
    gsap.to('.load_anim', {
        // height: 'auto',
        y: 0,
        delay: 1.2,
        duration: 1.2,
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

    //Перебор букв со сменой шрифта 
    if (window.innerWidth < mobileWidth) {
        setInterval(()=> {
            const h1FontFamily = gsap.utils.shuffle([...document.querySelectorAll('.char')].filter(()=> 
            Math.random() > .97
        ))

        const tl_fontFamily = gsap.timeline()

        tl_fontFamily.to(h1FontFamily, {
            // fontFamily: 'Wagon',
            color: '#87817B',
            // letterSpacing: '0.1rem',
        })
        .to(h1FontFamily, {
            // fontFamily: 'NeueMetana-regular',
            color: '#282828',
            // letterSpacing: '0.1rem',
            // delay: Math.random() * 10
        }) 
        
        }, 500)
    }
    // /Перебор букв со сменой шрифта 

    // Анимация появления и ухода меню на десктопе
        
    if (window.innerWidth > mobileWidth) {
        // tl_menu.to(".menu_li", {
        //     scrollTrigger: {
        //         trigger: ".h1-t",
        //         start: "top 70",
        //         end: "top bottom",
        //         toggleActions: "play none reverse none",
        //         // markers: true
        //     },
        //     y: -30,
        //     opacity: 0,
        //     stagger: 0.1,
        //     });

        // tl_menu.to(".menu_btn", {
        //     scrollTrigger: {
        //         trigger: ".h1-t",
        //         start: "top 70",
        //         end: "top bottom",
        //         toggleActions: "play none reverse none",
        //         // markers: true,
        //     },
        //     y: 0,
        //     // display: 'block',
        //     opacity: 1,
        // });  
        let menuIsOpen = false

        const tl_menu = gsap.timeline({

        })

        tl_menu.to([".menu_li"], {
            y: -30,
            opacity: 0,
            stagger: 0.1,
            ease: "power4.in"
            });

        tl_menu.to(".menu_btn", {
            y: 0,
            // display: 'block',
            opacity: 1,
            ease: "power4.out"
        });

        window.onscroll = function(event) {
            const h1Pos = document.querySelector('.h1-t').getBoundingClientRect().top;

            if (menuIsOpen && window.scrollY < h1Pos) {
                // console.log("play reverse");
                tl_menu.reverse();
                menuIsOpen = !menuIsOpen;
            } 
            else if(!menuIsOpen && window.scrollY >= h1Pos && self.oldScroll < self.scrollY) {
                // console.log("play forward");
                tl_menu.play();
                menuIsOpen = !menuIsOpen;
            }
            self.oldScroll = self.scrollY;
        }

        window.addEventListener('scroll', () => {
           onscroll(); 
        });

        tl_menu.pause()

        // tl_menu.restart()
        
        // Анимация при нажатии на кнопку меню
        document.querySelector(".menu_btn").addEventListener('click', () => {
            tl_menu.reverse();

            menuIsOpen = false;
        });

        
    }
    // /Анимация появления и ухода меню на десктопе


    // Мобильное меню
    if (window.innerWidth <= mobileWidth) {

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


    if (document.title === 'About') {
        // const canvas = document.querySelector('canvas');
        // console.log(canvas);
        init(mobileWidth);
        tick();
    }
    else
        stopTick();
    
    if (document.title === 'Cases') {
        loadCases();
    }
    
    if (document.title === 'Work') {
        loadWork();
    }


    pagesTransitionsEx(loadPage);
}


loadPage();
