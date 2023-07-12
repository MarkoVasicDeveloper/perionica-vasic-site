import gsap from 'gsap';

export function change () {
  const letters = document.getElementsByClassName('letter');
  [...letters].forEach(letter => {
        gsap.to(letter, {
            delay: 1.5,
            duration: Math.random(),
            y: window.innerHeight - letter.getBoundingClientRect().bottom,
            x: rand(-10, 10),
            rotate: rand(0, 360)
        })
    });

    changeScreen(scene, material);
    setTimeout(() => {
        imgCounter++;
        contentIndex += 4;
        if(contentIndex > text.length - 1) {
            contentIndex = 0;
            imgCounter = 0;
        };
        
        removeText([titleContainer, subtitleContainer, contentTitle, pageContentContainer]);
        generateText([titleContainer, subtitleContainer, contentTitle, pageContentContainer], contentIndex);
    }, 10000);
}