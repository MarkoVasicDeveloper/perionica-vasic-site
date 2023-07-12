import gsap from 'gsap';

export const hammerTimeline = gsap.timeline({paused: true, delay: 0.2});
const content2dTimeline = gsap.timeline({paused: true});

const container = document.querySelector('.cliner');
const leftWiper = document.querySelector('.left');;
const centerWiper = document.querySelector('.center');
const rightWiper = document.querySelector('.right');
const vaccumCliner = document.querySelector('.vaccum-cliner');

const video = document.querySelector('#spray');

export function changeScreen (scene, material) {
  hammerTimeline.play();

  hammerTimeline.to(scene.children[2].position, {
      setZ: 0.5,
      duration: 0.01
  })
  .to(scene.children[2].rotation, {
      delay: 0.3,
      x: -1,
      duration: 0.1
  })
  .to(scene.children[2].rotation, {
      delay: 0.5,
      x: 1,
      duration: 0.5
  })
  .to(scene.children[2].position, {
      delay: 0.5,
      setZ: 1.5,
      duration: 0.01
  })

  .to(material.uniforms.uTransition, {
      duration: 2,
      value: 1,
      ease: "expo.in"
  })
  .to(material.uniforms.uXtransition, {
      duration: 2,
      value: 1,
      ease: "expo.in"
  }, '<=0.2')

  content2dTimeline.play();
  content2dTimeline.to(container, {
      delay: 5,
      duration: 4,
      translateX: '-100vw',
      onComplete: () => video.play()
  })

  .to(vaccumCliner, {
      duration: 0.2,
      translateX: '-200px'
  })

  .to(leftWiper, {
      delay: 1.5,
      duration: .5,
      translateY: '0vh'
  })

  .to(centerWiper, {
      duration: .5,
      translateY: '0vh'
  }, '<=0.')

  .to(rightWiper, {
      duration: .5,
      translateY: '0vh'
  }, '<=0.')
  
  .to(material.uniforms.uTransition, {
      duration: 0.01,
      value: 0
  })

  .to(material.uniforms.uXtransition, {
      duration: 0.001,
      value: 0
  })

  .to(container, {
      delay: 0.5,
      duration: 2,
      translateY: '100vh',
  })
  .to(container, {
      duration: 0.001,
      translateY: '0vh',
      translateX: '0vw',
  })

  .to(leftWiper, {
      duration: .001,
      translateY: '-40vh'
  })

  .to(centerWiper, {
      duration: .001,
      translateY: '-40vh'
  }, '<=0.')

  .to(rightWiper, {
      duration: .001,
      translateY: '-40vh',
      onComplete: () => video.load()
  }, '<=0.')
    .to(vaccumCliner, {
      duration: .00001,
      translateX: '0px',
      onComplete: () => content2dTimeline.pause()
  })
}