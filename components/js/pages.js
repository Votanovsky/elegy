import { gsap } from 'gsap';
import barba from '@barba/core';

// PAGE TRANSITION ANIMATION

export function pagesTransitionsEx() {
    function pageAnimation(){
        gsap.to(".loader-overlay.one", {
            duration: 1,
            scaleX: 1,
            transformOrigin: "left",
            ease: "power1.inOut"
        });
        gsap.to(".loader-overlay.one", {
            duration: 1,
            scaleX: 0,
            transformOrigin: "right",
            ease: "power1.inOut",
            delay: 2
        });
    
        gsap.to(".loader-overlay.two", {
            duration: 1.4,
            scaleX: 1,
            transformOrigin: "left",
            ease: "power1.inOut"
        });
        gsap.to(".loader-overlay.two", {
            duration: 1.4,
            scaleX: 0,
            transformOrigin: "right",
            ease: "power1.inOut",
            delay: 1.6
        });
    }
    
    // function textAnimationsOnTransition(){
    //     ... 
    // }
    
    
    function delay(n) {
    
        n = n || 2000;  
        return new Promise((done) => {
            setTimeout(() => {
                done();
            }, n);
        });
    }
    
    
    // BARBA SETUP
    barba.init({
        sync: true,
    
        transitions: [{
            async leave () {
                const done = this.async();
    
                pageAnimation()
                await delay(1500)
                done()
            }
        }]
    });
}


