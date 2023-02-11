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
});