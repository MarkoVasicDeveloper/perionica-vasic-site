import { text } from "./text";

export function generateText (containers, startIndex) {
    containers.forEach((container, index) => {
        text[startIndex + index].split('').forEach(letter => {
            const div = document.createElement('div');
            div.style.display = 'inline-block';
            div.style.width = 'min-content';
            div.classList.add('letter');
            const text = document.createTextNode(letter);
            if (letter === ' ') div.style.width = '4px';
            div.appendChild(text);
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