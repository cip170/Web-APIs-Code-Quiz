var startButton = document.querySelector("#startButton");
var welcomeEl = document.querySelector(".welcome");
var quizEl = document.querySelector(".quiz");
var questionEl = document.querySelector('.question');
var endGameEl = document.querySelector('.endGame');
var secondsEl = document.querySelector('#seconds');
var timeSpentEl = document.querySelector('#timeSpent');
var scoreEl = document.querySelector('#score')
var enterScoreForm = document.querySelector('#enterScoreForm')
var tableBody = document.querySelector("#tableBody");
var clearBtn = document.querySelector('#clear');
var restartGame = document.querySelector('#restartGame')

var currentQuestion = 0;
var secondsElapsed = 0;
var timer;
var score = 0;

startButton.addEventListener("click", startGame);
enterScoreForm.addEventListener('submit', recordScore)
clearBtn.addEventListener('click', ()=>{
    localStorage.setItem('quizScores', JSON.stringify([]))
    renderTable()
})

const myQuestions = [
    {
        text: "Which of the following keywords is used to define a variable",
        options: {
            a: "const",
            b: "var",
            c: "let",
            d: "All of the above",
        },
        answer: 'd'
    },
    {
        text: "When an operator's value is 'NULL', the typeof returned by the unary operator is - ",
        options: {
            a: "Boolean",
            b: "Object",
            c: "Integer",
            d: "Undefined",
        },
        answer: 'b'
    },
    {
        text: "What does the JavaScript 'debugger' statement do?",
        options: {
            a: "It acts as a breakpoint in the program",
            b: "It will debug error in the current statement if any",
            c: "It will debug the errors in the program at runtime",
            d: "It will solve all errors found in the program",
        },
        answer: 'a'
    },
    {
        text: "What function is used to convert an object into a JSON string in JavaScript?",
        options: {
            a: "convert()",
            b: "stringify()",
            c: "parse()",
            d: "None of the above",
        },
        answer: 'b'
    },
    {
        text: "What function would stop an interval timer in JavaScript?",
        options: {
            a: "intervalOver",
            b: "clearTimer",
            c: "clearInterval",
            d: "intervalClear",
        },
        answer: 'c'
    },
    {
        text: "What is the purpose of the querySelector method in JavaScript?",
        options: {
            a: "To search and return the first element within the document that matches the given selector",
            b: "To select all elements within the document that match the given selector",
            c: "To modify the document's properties of the given element",
            d: "To add event listeners to elements",
        },
        answer: 'a'
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
        <h3>Question ${currentQuestion + 1}: ${myQuestions[currentQuestion].text}</h3>
        <div class="options-container">
            <ul>
            <li>a.
            <button class="option-btn" id="a">${myQuestions[currentQuestion].options.a}</button>
            </li>
            <li>b.
            <button class="option-btn" id="b">${myQuestions[currentQuestion].options.b}</button>
            </li>
            </ul>
            <ul>
            <li>c.
            <button class="option-btn" id="c">${myQuestions[currentQuestion].options.c}</button>
            </li>
            <li>d.
            <button class="option-btn" id="d">${myQuestions[currentQuestion].options.d}</button>
            </li>
            </ul>
            </div>
    `

    var optionButtonsList = (document.querySelectorAll('.option-btn'))

    for (let i = 0; i < optionButtonsList.length; i++) {
        (optionButtonsList[i]).addEventListener('click', evaluateAnswer)
    }
}

function evaluateAnswer(e) {
    console.log(e.target.id === myQuestions[currentQuestion].answer)
    // correct or incorrect ?
    if (e.target.id === myQuestions[currentQuestion].answer) {
        // increase score
        score += 1;
    }

    // move to next question if there are more
    if (currentQuestion < myQuestions.length - 1) {

        currentQuestion++;
        renderQuestion()

    } else {
        gameOver()
    }
}

function gameOver() {
    // add invisible to quizEl
    quizEl.classList.add("invisible");
    // remove invisible from the endGameEl
    endGameEl.classList.remove("invisible");
    clearInterval(timer)

    timeSpentEl.textContent = secondsElapsed
    scoreEl.textContent = score

    renderTable()
}

function renderTable() {
    // read local Storage
    const scoresFromStorage =
        JSON.parse(
            localStorage.getItem('quizScores')
        )
        || []

    tableBody.innerHTML = ''

    scoresFromStorage.forEach((entry) => {
        var row = document.createElement('tr')
        row.innerHTML = `
            <td>${entry.initials}</td>
            <td>${entry.score}</td>
            `
        tableBody.append(row)
    })
}

restartGame.addEventListener("click", function() {
    welcomeEl.classList.remove("invisible");
    endGameEl.classList.add("invisible");

    currentQuestion = 0;
    score = 0;

    clearInterval(timer);
});

function recordScore(e) {
    e.preventDefault()
    const formData = new FormData(enterScoreForm)

    // read local Storage
    const scoresFromStorage =
        JSON.parse(
            localStorage.getItem('quizScores')
        )
        || []

    // modify
    scoresFromStorage.push({
        initials: formData.get('initials'),
        score
    })

    // write localStorage
    localStorage.setItem('quizScores', JSON.stringify(scoresFromStorage))

    enterScoreForm.reset()

    renderTable()

}
