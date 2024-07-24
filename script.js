function toggleRules() {
    const rulesBox = document.querySelector('.rulesbox');
    rulesBox.classList.toggle('hidden');
}

function evaluateScore() {
    let comScore = localStorage.getItem('comScore');
    let perScore = localStorage.getItem('perScore');
    if (perScore > comScore) {
        window.location.href = 'winner.html';
        localStorage.setItem('perScore', 0);
        localStorage.setItem('comScore', 0);
    } else if (perScore < comScore) {
        alert('You Lost! The scores will be reset to 0.');
        localStorage.setItem('perScore', 0);
        localStorage.setItem('comScore', 0);
        location.reload();
    } else {
        alert('Game Draw! The scores will be reset to 0.');
        localStorage.setItem('perScore', 0);
        localStorage.setItem('comScore', 0);
        location.reload();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll('.choice');
    const userChoiceDiv = document.getElementById('user-choice');
    const pcChoiceDiv = document.getElementById('pc-choice');
    const resultText = document.getElementById('result-text');
    const gameContainer = document.querySelector('.game-container');
    const triangle = document.querySelector('.triangle');
    const playAgainButton = document.getElementById('play-again');
    const pc = document.querySelector('.pc');
    const comScoreElement = document.getElementById('comscore');
    const perScoreElement = document.getElementById('perscore');
    const nextButton = document.querySelector('.Next');

    const choicesMap = {
        rock: 'images/icons8-fist-67 1.png',
        paper: 'images/icons8-hand-64 1.png',
        scissors: 'images/17911 1.png'
    };

    let comScore = localStorage.getItem('comScore') ? parseInt(localStorage.getItem('comScore')) : 0;
    let perScore = localStorage.getItem('perScore') ? parseInt(localStorage.getItem('perScore')) : 0;

    comScoreElement.textContent = comScore;
    perScoreElement.textContent = perScore;


    const getpcchoice = () => {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * choices.length)];
    };

    const getResult = (userChoice, pcChoice) => {
        if (userChoice === pcChoice) {
            playAgainButton.innerText = "REPLAY";
            pc.classList.add('hidden');
            return 'TIE UP';
        } else if (
            (userChoice === 'rock' && pcChoice === 'scissors') ||
            (userChoice === 'paper' && pcChoice === 'rock') ||
            (userChoice === 'scissors' && pcChoice === 'paper')
        ) {
            playAgainButton.innerText = "PLAY AGAIN";
            pc.classList.remove('hidden');
            perScore++;
            localStorage.setItem('perScore', perScore);
            perScoreElement.textContent = perScore;
            return 'YOU WIN';
        } else {
            playAgainButton.innerText = "PLAY AGAIN";
            pc.classList.remove('hidden');
            comScore++;
            localStorage.setItem('comScore', comScore);
            comScoreElement.textContent = comScore;
            return 'YOU LOST';
        }
    }

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const userChoice = choice.id;
            const pcChoice = getpcchoice();

            userChoiceDiv.innerHTML = `<img src="${choicesMap[userChoice]}"/>`;
            pcChoiceDiv.innerHTML = `<img src="${choicesMap[pcChoice]}"/>`;
            const result = getResult(userChoice, pcChoice);
            resultText.textContent = result;

            userChoiceDiv.className = 'choice winner-circle';
            pcChoiceDiv.className = 'choice winner-circle';
            userChoiceDiv.classList.add(`${userChoice}1`);
            pcChoiceDiv.classList.add(`${pcChoice}1`);

            if (result === "YOU WIN") {
                userChoiceDiv.classList.add('winner-circle');
                pcChoiceDiv.classList.remove('winner-circle');
            } else if (result === "YOU LOST") {
                pcChoiceDiv.classList.add('winner-circle');
                userChoiceDiv.classList.remove('winner-circle');
            } else {
                pcChoiceDiv.classList.remove('winner-circle');
                userChoiceDiv.classList.remove('winner-circle');
            }

            triangle.classList.add('hidden');
            gameContainer.classList.remove('hidden');
            nextButton.classList.remove('hidden');
        })
    });

    playAgainButton.addEventListener('click', () => {
        gameContainer.classList.add('hidden');
        triangle.classList.remove('hidden');
    })
})
