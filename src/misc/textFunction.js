import { text } from "./text";


export function generateText (containers, startIndex) {
    containers.forEach((container, index) => {
        text[startIndex + index].split(' ').forEach(word => {
            const div = document.createElement('div');
            div.classList.add('wordDiv');
            div.style.display = 'inline-block';

            word.split('').forEach(letter => {
                if (letter == '1') return div.classList.add('specific');
                if (letter == '2') return div.classList.add('mark');
                if (letter == '3') return div.classList.add('underline');
                const letterDiv = document.createElement('div');
                letterDiv.style.display = 'inline-block';
                letterDiv.style.width = 'min-content';
                letterDiv.classList.add('letter');
                const text = document.createTextNode(letter);
                letterDiv.appendChild(text);
                div.appendChild(letterDiv);
            })
            container.appendChild(div);
        });
    })
};

export function removeText (parrents) {
    parrents.forEach(parrent => {
        while (parrent.firstChild) {
            parrent.removeChild(parrent.lastChild);
        }
    })
}