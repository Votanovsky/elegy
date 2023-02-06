import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SplitType from 'split-type';

import { init, tick, stopTick } from './three.js';
import {loadCases} from './cases.js';

import {loadWork} from './work.js';

import {loadHeader} from './header.js';
import {loadFooter} from './footer.js';
import {validateForm} from './contact-form.js';

import {localize, switchLang, getLocale} from './localization.js';

// import barba from '@barba/core';
import {pagesTransitionsEx} from './pages.js';

let locale;
let cookieConsent;
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


// async function loadBody(title) {
//     let address =  title ===    "Home"  ? "index.html"
//                 : (title ===    "About" ? "about.html"
//                 : (title ===    "Cases" ? "cases.html"
//                 : (title ===    "Work"  ? "work.html"
//                 : "")));
//     let parser = new DOMParser();
//     await fetch(address)
//     .then(response => response.text())
//     .then(text => parser.parseFromString(text, "text/html"))
//     .then(doc => document.body = doc.body);
// }

async function loadPage() { 
    locale = getCookie('locale'); // достаём локаль из куки
    if (locale) {
        cookieConsent = true;
        if (window.location.pathname.split('/')[1] !== locale) {
            // window.location.pathname = `${locale}/${window.location.pathname.split('/').slice(2).join('/')}`;
        }
        await loadHeader();
        await loadFooter();
    }
    else { // если куки нет
        // locale = getLocale(); // получаем локаль пользователя
        locale = window.location.pathname.split('/')[1];
        
        await loadHeader();
        await loadFooter();

        if (cookieConsent == null) {
            let cookieDialogue = document.createElement('div');
            let buttonSection = document.createElement('div');
            let cookieAccept = document.createElement('button');
            let cookieReject = document.createElement('button');
            let cookieText = document.createElement('div');

            cookieDialogue.className = "cookie-dialogue";
            buttonSection.className = "button-section";
            
            let cookie_text = {
                text: {
                    "en": `Our website uses cookies to provide you with better experience. For more information, visit our&nbsp;<a href='cookie-policy.html' data-barba-prevent="self">cookie policy page</a>`,
                    "ru": `Наш сайт использует файлы cookie для обеспечения удобства пользования. Для подробной информации посетите&nbsp;<a href='cookie-policy.html' data-barba-prevent="self">страницу политики cookies</a>`
                },
                accept: {
                    "en": `Accept`,
                    "ru": `Принять`
                },
                reject: {
                    "en": `Reject`,
                    "ru": `Отклонить`
                },
            }
            cookieText.innerHTML = cookie_text.text[locale];
            cookieAccept.innerHTML = cookie_text.accept[locale];
            cookieReject.innerHTML = cookie_text.reject[locale];
            cookieAccept.id = "cookie-accept";
            cookieReject.id = "cookie-reject";
            cookieDialogue.appendChild(cookieText);
            buttonSection.appendChild(cookieAccept);
            buttonSection.appendChild(cookieReject);
            cookieDialogue.appendChild(buttonSection);
            document.body.insertAdjacentElement('afterbegin', cookieDialogue);
            // cookieDialogue.showModal();
            // document.body.focus();
            cookieAccept.addEventListener('click', () => {
                if (cookieConsent == null) {
                    cookieConsent = true;
                    setCookie('locale', locale, 30);
                    gsap.to(cookieDialogue, {opacity: 0, duration: 0.5});
                    gsap.to(cookieDialogue, {display: 'none', duration: 0}, '>');
                }
            })
            cookieReject.addEventListener('click', () => {
                if (cookieConsent == null) {
                    cookieConsent = false;
                    gsap.to(cookieDialogue, {opacity: 0, duration: 0.5});
                    gsap.to(cookieDialogue, {display: 'none', duration: 0}, '>');
                }
            })
        }
    }
    
    const langSwitches = document.querySelectorAll("#language");
    
    langSwitches.forEach(langSwitch => langSwitch.addEventListener('click', () => { // смена языка по нажатию на кнопку
        let locale = switchLang(langSwitch);
        // console.log(`result: ${locale}`)
        window.location.pathname = `${locale}/${window.location.pathname.split('/').slice(2).join('/')}`;
        // console.log(locale)
        if (cookieConsent)
            setCookie('locale', locale, 30);
    }));

    validateForm(locale);
    // await localize(locale);


    // Анимация фавиконки 
    // let count = 1
    // let favicons = document.querySelectorAll('link')

    // function animateFavicons() {
    //     favicons.forEach(link => {
    //         if (link.getAttribute('rel').indexOf('icon') >= 0) {
    //             link.setAttribute('href', '../../media/icon/favicons/' + count + '.png')
    //         }
    //     })
    //     count ++

    //     if(count == 11) {
    //         count = 1
    //     }
    // }
    // setInterval(animateFavicons, 700);
    // /Анимация фавиконки 


    // Разделение h1 заголовков на главной странице и анимация их повяления
    const text = new SplitType('.h1-a');
    const textClipTl = gsap.timeline();
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
    .to('.h1-a', {opacity: 1, duration: 0}, '<');
    
    // /Разделение h1 заголовков на главной странице и анимация их повяления

    // Анимация выпадающго текста описания технологий

    // let blackColor = '#282828';
    // let grayColor = '#EDEDED';
    
    // let items = gsap.utils.toArray('.tech-it');
    // let toggles = items.map(createAnimation);

    // function createAnimation(it) {
    //     let text = it.querySelector('.tech-it-text');
    //     // console.log(window.getComputedStyle(it).getPropertyValue('width'));
    //     gsap.set(it, {
    //         background: blackColor,
    //         color: grayColor,
    //         borderRadius: '50px',
    //         // width: '585px'
    //     });
    //     gsap.set(text, {
    //         height: 'auto',
    //         opacity: 1,
    //         padding: '20px'
    //     });
    //     let itAnimation = gsap.from(it, {
    //         background: grayColor,
    //         color: blackColor,
    //         // width: 'min-content',
    //         // borderRadius: '84px',
    //         duration: 0.5,
    //         ease: 'sine.in'
    //     }).reverse();
    //     let textAnimation = gsap.from(text, {
    //         height: 0,
    //         opacity: 0,
    //         padding: 0,
    //         duration: 0.5,
    //         ease: 'sine.in'
    //     }).reverse();

    //     return function(clickedIt) {
    //         if (it === clickedIt) {
    //             textAnimation.reversed(!textAnimation.reversed());
    //             itAnimation.reversed(!itAnimation.reversed());
    //         }
    //         else {
    //             itAnimation.reverse();        
    //             textAnimation.reverse();        
    //         }
    //     }
    // }

    // function toggleTechDescription(clickedIt) {
    //     toggles.forEach(toggle => toggle(clickedIt));
    // }

    // document.querySelectorAll('.tech-it').forEach(it => {
    //     it.addEventListener('click', () => toggleTechDescription(it));
    // });

    //Перебор букв со сменой шрифта
    if (window.textInterval) {
        clearInterval(window.textInterval);
    }
    if (window.innerWidth < mobileWidth && document.title !== 'About Elegy' && document.title !== 'О Elegy') {

        function animateFontColor () {
            const h1FontFamily = gsap.utils.shuffle([...document.querySelectorAll('.char')].filter(()=> 
            Math.random() > .90
            ));
            // console.log(h1FontFamily);
            if (h1FontFamily.length > 0) {
                const tl_fontFamily = gsap.timeline();
                // console.log(tl_fontFamily);
                tl_fontFamily.to(h1FontFamily, {
                    // fontFamily: 'Wagon',
                    color: '#c0b4a7',
                    // letterSpacing: '0.1rem',
                })
                .to(h1FontFamily, {
                    // fontFamily: 'NeueMetana-regular',
                    color: '#282828',
                    // letterSpacing: '0.1rem',
                    // delay: Math.random() * 10
                });
            }
        }
        
        window.textInterval = setInterval(()=> {
                animateFontColor();
                // console.log(gsap.globalTimeline.getTweensOf('.char'));
                // console.log()
        }, 500);
    }
    // /Перебор букв со сменой шрифта 

    // Анимация появления и ухода меню на десктопе
    if (window.innerWidth > mobileWidth) {
        let menuIsOpen = false

        const tl_menu = gsap.timeline({

        })

        tl_menu.to([".menu_li-st"], {
            y: -30,
            opacity: 0,
            stagger: 0.05,
            duration: .5,
            ease: "power4.inOut"
            });

        tl_menu.to(".menu_btn", {
            y: 0,
            // display: 'block',
            opacity: 1,
            duration: .5,
            ease: "power4.inOut"
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

                menu_tl.from('.menu_li_lay-st', {
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

    // Контакты
    document.querySelectorAll('.div_cont').forEach(div => {
        div.addEventListener('click',()=> {
            gsap.to('.contacts_layout', {
                // display: 'block',
                y: 0,
                ease: "expo.InOut",
                duration: .7
            });
            gsap.set('#contacts', {
                className: 'close_contacts'
            });
        });
    });
    document.querySelector('.close_contacts').addEventListener('click',()=> {
        gsap.to('.contacts_layout', {
            y: '-100%',
            // display: 'none',
            ease: "expo.InOut",
            duration: .7
        });
        gsap.set('#contacts', {
            className: 'div_cont'
        });
    })
    // /Контакты

    // Ховер для футтера (потому что блять могу)
    const cursor_place = document.querySelector(".more-hover");
    const footer_cursor = document.querySelector(".more_btn");

    gsap.set(footer_cursor, {
        xPercent: -50,
        yPercent: -50
    });

    cursor_place.addEventListener("mousemove", onMove);
    cursor_place.addEventListener("mouseleave", onLeave);

    function onMove(e) {
    
    const { left, top, width, height } = cursor_place.getBoundingClientRect();
    
    const halfW = width / 2;
    const halfH = height / 2;  
    const mouseX = e.x - left;
    const mouseY = e.y - top;
    
    const x = gsap.utils.interpolate(-halfW, halfW, mouseX / width);
    const y = gsap.utils.interpolate(-halfH, halfH, mouseY / height);
  
    gsap.to(footer_cursor, {
        x: x,
        y: y,
        duration: 0.6,
        opacity: 1,
        scale: 1,
        ease: "power1",
    });  
    }

    function onLeave(e) {
        gsap.to(footer_cursor, {
            x: 0,
            y: 0,
            opacity: 0,
            scale: .5,
            ease: "power1",
            duration: 0.6,
        });
    }
    // /Ховер для футтера

    // Ховер стерлочек для кейсов на главной странице (ховер работает только на ласт элемент я хз почему так)
    // gsap.utils.toArray(".it-hover").forEach(it => {
    //     let hover = ''
    //     gsap.utils.toArray(".cases-svg").forEach(svg => {
    //             hover = gsap.to(svg, {
    //             duration: .2,
    //             opacity: 1,
    //             y: 0,
    //             x: 0,
    //             paused: true,
    //             ease: "power1.inOut",
    //         });
    //     })
    //     it.addEventListener("mouseenter", () => hover.play());
    //     it.addEventListener("mouseleave", () => hover.reverse());
    // });
    // Ховер стерлочек для кейсов на главной странице 

    if (document.title === 'About Elegy' || document.title === 'О Elegy') {
        if (!document.querySelector('canvas')) {
            init(mobileWidth);
            tick();
        }
    }
    else {
        stopTick(); // Остановка блоба на остальных страницах

        if (document.title === 'Elegy Studio') {
            // Анимация пояления/расширения шоурила на главном экране
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
            // /Анимация пояления/расширения шоурила на главном экране
    
            gsap.to('.load_anim', {
                // height: 'auto',
                y: 0,
                delay: 1.2,
                duration: 1.2,
                ease: "power4.inOut",
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
            })
        }
        else if (document.title === 'Our cases' || document.title === 'Наши кейсы') {
            loadCases();
        }
        else if (document.title === 'How we work' || document.title === 'Как мы работаем') {
            loadWork();
        }
    }
    
    // Создаем дату для футтера 
      
    function createZeroFirst(value)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }

    function addDateNow() {
        const now = new Date();

        let year_js = createZeroFirst( now.getFullYear() )
        let month_js = createZeroFirst( now.getMonth() + 1 )
        let day_js = createZeroFirst( now.getDate() )

        return year_js+"."+month_js+"."+day_js
    }
    document.querySelectorAll('#date_now').forEach((element) => {
        element.innerHTML = addDateNow();
    });
    pagesTransitionsEx(loadPage);
}


loadPage();