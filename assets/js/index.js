var startButton = document.querySelector("#startButton");
startButton.addEventListener("click", startGame);

var welcomeEl = document.querySelector(".welcome");
var quizEl = document.querySelector(".quiz");
var questionEl = document.querySelector('.question');

const myQuestions = [
    {
        text: 'Which of the following keywords is used to define a variable',
        options: {
            a: 'const',
            b: 'var',
            c: 'let',
            d: 'All of the above'
        },
        answer: 'd'
    },
    {
        text: 'Who said "onions have layers"?',
        options: {
            a: 'Donkey',
            b: 'Shrek',
            c: 'Lord Farquaad',
            d: 'Fiona',
        },
        answer: 'b'
    },
    {
        text: "What is Jude's favourite colour",
        options: {
            a: 'Orange',
            b: 'Yellow',
            c: 'Purple',
            d: 'Green',
        },
        answer: 'c'
    },
]

function startGame() {
    // add invisible class to 'welcomeEl'
    welcomeEl.classList.add('invisible')
    // remove invisible class from 'quizEl'
    quizEl.classList.remove('invisible')

    renderQuestion()
}

function renderQuestion() {
    questionEl.innerHTML = `
        <h3>${myQuestions[0].text}</h3>
            <ul>
            <li><button>${myQuestions[0].options.a}</button></li>
            <li><button>${myQuestions[0].options.b}</button></li>
            <li><button>${myQuestions[0].options.c}</button></li>
            <li><button>${myQuestions[0].options.d}</button></li>
            </ul>
    `
}