//var timeEl = document.querySelector(".time");
// var mainEl = document.getElementById("main");
// var addButton = document.querySelector("#start");

// var secondsLeft = 60;

// function setTime() {
//     var timerInterval = setInterval(function() {
//         secondsLeft--;
//         timeEl.textContent = secondsLeft + " seconds left till quiz ends!.";
    
//         if(secondsLeft === 0) {
//             clearInterval(timerInterval);
//             sendMessage();
//     }

//   }, 1000);
// }
// addButton.addEventListener("click", function() {

// }

var questions = [
    { 
        title: "What is you favorite color? 1",
        choices: ["red","blue","pink","green"],
        answer: "red"
    },
    { 
        title: "What is you favorite color? 2",
        choices: ["red","blue","pink","green"],
        answer: "blue"
    },
    { 
        title: "What is you favorite color? 3",
        choices: ["red","blue","pink","green"],
        answer: "pink"
    },
    { 
        title: "What is you favorite color? 4",
        choices: ["red","blue","pink","green"],
        answer: "green"
    },
]

var timer;
var time = 60;

document.querySelector("#start").addEventListener("click", function() {
    // hide the start elements
    document.querySelector("#start-container").classList.add("hide")
    // show the questions container
    document.querySelector("#question-container").classList.remove("hide")
    // start timerInterval
    timer = setInterval(function() {
        time--;
        document.querySelector("#time").textContent = time;
        if (time<= 0) {
            endGame();
        }
    },1000)
    // create the first question
    showQuestion();
});

var questionIndex = 0;
var showQuestion = function() {
    var q = questions[questionIndex];
    var template = `
        <div>
            <h3>${q.title}</h3>
            <p class="choice">${q.choices[0]}</p>
            <p class="choice">${q.choices[1]}</p>
            <p class="choice">${q.choices[2]}</p>
            <p class="choice">${q.choices[3]}</p>
        </div>
    `;

    document.querySelector("#question-container").innerHTML = template;
}

document.querySelector("#question-container").addEventListener("click", function(event) {
    if (event.target.classList.contains("choice")) {
        var q = questions[questionIndex];
        if (q.answer === event.target.textContent) {
            score++;
        } else {
            time = time - 5;
        }

        questionIndex++;

        if (q.length === questionIndex) {
            endGame();
        } else {
            showQuestion();
        }
    }
});

var endGame = function () {
    //hide the q container
    document.querySelector("#question-container").classList.add("hide")
    //show the end container
    document.querySelector("#end-container").classList.remove("hide")
    //show score
    document.querySelector("#score").textContent = score;
};

document.querySelector("#initials-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // get the old data
    var oldData = JSON.parse(localStorage.getItem("data")) || [];
    // get user input
    var userData = document.querySelector("#user").value;
    //create the new data entry
    var dataEntry = {
        initials: userData,
        score: score
    }
    oldData.push(dataEntry);
    //store it
    localStorage.setItem("data", JSON.stringify(dataEntry));
})