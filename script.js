var questions = [
    { 
        title: "What does var stand for?",
        choices: ["variable","volcano","value","volume"],
        answer: "variable"
    },
    { 
        title: "What are the 4 primitive types?",
        choices: ["integer,booleans,undefined,value","undefined,string,numbers,booleans","decimal,integer,modulus,comparison","arrays,decimal,undefined, string"],
        answer: "undefined,string,numbers,booleans"
    },
    { 
        title: "What is an array?",
        choices: ["allows you to test more than one condition","evaluates to true","Stores groups of data in a single variable","takes in two or more expressions"],
        answer: "Stores groups of data in a single variable"
    },
    { 
        title: "What are the 4 methods?",
        choices: ["add,subtract, multiply, and divide","sort,push,slice,and replace","commit, push, message, pull","if, if else, function, array"],
        answer: "sort,push,slice,and replace"
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
    var question1 = `
        <div>
            <h3>${q.title}</h3>
            <p class="choice">${q.choices[0]}</p>
            <p class="choice">${q.choices[1]}</p>
            <p class="choice">${q.choices[2]}</p>
            <p class="choice">${q.choices[3]}</p>
        </div>
    `;

    document.querySelector("#question-container").innerHTML = question1;
    
  
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