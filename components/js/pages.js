import { gsap } from 'gsap';
import barba from '@barba/core';

// PAGE TRANSITION ANIMATION

export function pagesTransitionsEx(loadPage) {
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
    
    function killAnimations() {
        gsap.globalTimeline.getChildren().forEach(child => {
            if (!child.targets) {
                for (let tween of child.getChildren())
                    tween.kill();
                child.kill();
            }
            else {
                for (let target of child.targets()) {
                    if (!target.classList || target.classList && !target.classList.contains("loader-overlay")) {
                        child.kill();
                        break;
                    }
                }
            }
        });
    }
    
    // BARBA SETUP
    barba.init({
        sync: true,
    
        transitions: [{
            async leave () {
    
                pageAnimation()
                await delay(2000)

            },
            async enter() {
                
                const done = this.async();
                // killAnimations();
                // console.log(gsap.globalTimeline.getChildren());
                loadPage()
                done()
                barba.destroy()

            }
        }],
    });
}


