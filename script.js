const wordInput = document.querySelector(".wordInput");
const insertWordBtn = document.querySelector(".insertWord");
const wordToGuess = document.querySelector(".wordMatrix");

const letterInput = document.querySelector(".letterInput");
const insertLetter = document.querySelector(".insertLetter");
const letterForm = document.querySelector(".letter");
const output = document.querySelector(".output");

const hangMan = new Array(9);

let imageId = 1;

for (let i = 1; i <= 10; ++i) {
    hangMan[i] = document.getElementById(Number(i));
}

function createWord() {
    let newWord = new Array(wordInput.value.length);
    for (let i = 0; i < wordInput.value.length; ++i) {
        newWord[i] = '*';
    }
    wordInput.innerHTML.type = "password";
    wordToGuess.innerHTML = newWord.join('');
}

function gameAlgorithm() {
    const word = wordInput.value.split('');
    let newWord = wordToGuess.innerHTML.split('');
    let isLetter = false;
    for (let i = 0; i < wordInput.value.length; ++i) {
        if (word[i] == letterInput.value.toLowerCase()) {
             newWord[i] = letterInput.value.toLowerCase();
             isLetter = true;
        } else if (word[i] == letterInput.value.toUpperCase()) {
            newWord[i] = letterInput.value.toUpperCase();
            isLetter = true;
        }
    }
    if (isLetter == false && imageId <= 10) {
        hangMan[Number(imageId)].style.display = "inline";
        ++imageId;
    }
    if (imageId == 11) {
        output.textContent = "GAME OVER";
        startAgain();
    } else if (wordGuessed(newWord) == true) {
        output.textContent = "CONGRATULATIONS!";
        insertLetter.disabled = "true";
        startAgain();
    }
    wordToGuess.innerHTML = newWord.join('');
}

function wordGuessed(Array) {
    for (let i = 0; i < Array.length; ++i) {
        if (Array[i] == "*") {
            return false;
        }
    }
    return true;
}

function startAgain() {
    const resetButton = document.createElement('button');
    letterForm.appendChild(resetButton);
    resetButton.setAttribute("class", "reset");
    resetButton.textContent = "START AGAIN";
    resetButton.addEventListener('click', resetGame);
    insertLetter.disabled = "true";
}

function resetGame() {
    for (let i = 1; i <= 9; ++i) {
        hangMan[Number(i)].style.display = "none";
    }
    insertLetter.disabled = "false";
}

insertWordBtn.addEventListener('click', createWord);
insertLetter.addEventListener('click', gameAlgorithm);