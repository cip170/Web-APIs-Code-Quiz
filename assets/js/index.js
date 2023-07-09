var startButton = document.querySelector("#startButton");
startButton.addEventListener("click", startGame);

var welcomeEl = document.querySelector(".welcome");
var quizEl = document.querySelector(".quiz");
var questionEl = document.querySelector('.question');
var endGameEl = document.querySelector('.endGame');
var secondsEl = document.querySelector('#seconds');
var timeSpentEl = document.querySelector('#timeSpent');
var scoreEl = document.querySelector('#score')

var currentQuestion = 0;
var secondsElapsed = 0;
var timer;
var score = 0;

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
    // start timer
    timer = setInterval(() => {
        secondsElapsed++;
        secondsEl.textContent = secondsElapsed
    }, 1000);

    // function(()=>{}, _)
}

function renderQuestion() {
    questionEl.innerHTML = `
        <h3>${myQuestions[currentQuestion].text}</h3>
            <ul>
            <li>
            <button class="option-btn" id="a">${myQuestions[currentQuestion].options.a}</button>
            </li>
            <li>
            <button class="option-btn" id="b">${myQuestions[currentQuestion].options.b}</button>
            </li>
            <li>
            <button class="option-btn" id="c">${myQuestions[currentQuestion].options.c}</button>
            </li>
            <li>
            <button class="option-btn" id="d">${myQuestions[currentQuestion].options.d}</button>
            </li>
            </ul>
    `

    var optionButtonsList = (document.querySelectorAll('.option-btn'))

    for (let i = 0; i < optionButtonsList.length; i++) {
        (optionButtonsList[i]).addEventListener('click', evaluateAnswer)
    }
}

function evaluateAnswer(e) {
    console.log(e.target.id === myQuestions[currentQuestion].answer)
    // correct or incorrect ?
    if (e.target.id === myQuestions[currentQuestion].answer){
        // increase score
        score+=1;
    }

    // move to next question if there are more
    if (currentQuestion < myQuestions.length - 1) {

        currentQuestion++;
        renderQuestion()

    } else {
        gameOver()
    }
}

function gameOver(){
 // add invisible to quizEl
quizEl.classList.add("invisible");
 // remove invisible from the endGameEl
 endGameEl.classList.remove("invisible");
 clearInterval(timer)

 timeSpentEl.textContent = secondsElapsed
 scoreEl.textContent = score
}