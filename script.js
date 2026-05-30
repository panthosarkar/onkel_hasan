// // GSAP Logo Animations - Heavy Effects
// const logoWrap = document.querySelector('.brand-logo-wrap');
// const brandLogo = document.querySelector('.brand-logo');
//
// if (logoWrap && brandLogo) {
//   // Timeline for complex animations
//   const tl = gsap.timeline();
//
//   // 1. Initial entrance with heavy scale and rotation
//   tl.fromTo(
//     logoWrap,
//     {
//       opacity: 0,
//       scale: 0.3,
//       rotation: -360,
//       filter: 'blur(20px)'
//     },
//     {
//       opacity: 1,
//       scale: 1,
//       rotation: 0,
//       filter: 'blur(0px)',
//       duration: 2.5,
//       ease: 'power2.out'
//     },
//     0
//   );
//
//   // 2. Pulsing scale effect
//   gsap.to(logoWrap, {
//     scale: 1.05,
//     duration: 1.5,
//     repeat: -1,
//     yoyo: true,
//     ease: 'sine.in-out'
//   });
//
//   // 3. Glow animation on the logo image
//   gsap.to(brandLogo, {
//     filter: 'drop-shadow(0 0 40px rgba(196, 30, 58, 0.9)) drop-shadow(0 0 60px rgba(212, 175, 55, 0.6))',
//     duration: 1.8,
//     repeat: -1,
//     yoyo: true,
//     ease: 'sine.in-out'
//   });
//
//   // 4. Box shadow pulse on wrapper
//   gsap.to(logoWrap, {
//     boxShadow: '0 0 80px rgba(196, 30, 58, 0.9), 0 0 120px rgba(212, 175, 55, 0.6), inset 0 0 60px rgba(196, 30, 58, 0.4)',
//     duration: 2,
//     repeat: -1,
//     yoyo: true,
//     ease: 'sine.in-out'
//   });
//
//   // 5. Continuous rotation of the conic gradient ring
//   gsap.to(logoWrap, {
//     '--spin': '360deg',
//     duration: 8,
//     repeat: -1,
//     ease: 'none'
//   });
//
//   // 6. Border glow animation
//   gsap.to(logoWrap, {
//     borderColor: 'rgba(212, 175, 55, 0.8)',
//     duration: 1.5,
//     repeat: -1,
//     yoyo: true,
//     ease: 'sine.in-out'
//   });
//
//   // 7. Floating/levitation effect
//   gsap.to(logoWrap, {
//     y: -20,
//     duration: 3,
//     repeat: -1,
//     yoyo: true,
//     ease: 'sine.in-out'
//   });
//
//   // 8. Background gradient animation
//   gsap.to(logoWrap, {
//     background: [
//       'radial-gradient(circle, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01))',
//       'radial-gradient(circle, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02))',
//       'radial-gradient(circle, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01))'
//     ],
//     duration: 2.5,
//     repeat: -1,
//     ease: 'sine.in-out'
//   });
// }
//
