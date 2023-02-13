"use strict";

gsap.from('.hello', {
  opacity: 0,
  delay: 1,
  duration: 1.5,
  y: -20,
  ease: "expo.inOut"
});
gsap.from('.world', {
  opacity: 0,
  delay: 1.5,
  duration: 1.5,
  y: -20,
  ease: "expo.inOut"
}); //portfolio//

gsap.registerPlugin(ScrollTrigger);
var lenis = new Lenis({
  duration: 0.5,
  easing: function easing(t) {
    return Math.min(1, 1.001 - Math.pow(2, -5 * t));
  }
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.img',
    scrub: true
  }
}).to('.img', {
  stagger: .2,
  y: -700,
  scrub: true
});