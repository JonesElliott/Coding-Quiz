// Declaring variables referencing HTML elements
var pageTitle = document.querySelector('#title-element');
var bodyEl = document.querySelector('#body-el');
var timerDiv = document.querySelector('#timer-div');
var headerDiv = document.querySelector('#header-div');
var contentDiv1 = document.querySelector('#content-1-div');
var contentDiv2 = document.querySelector('#content-2-div');
var buttonsDiv = document.querySelector('#buttons-div');

// General variables
var userAns;
var qNum = 0;
var score = 0;
var timeLeft = 0;
var testEnd = false;

// Object that will hold save score information
var scoreBoard = {
    names: [],
    scores: []
}

// Declating Variables for questions and answers
// Variables for questions
var q1 = "Which tag contains the JavaScript code?";
var q2 = "Which choice can be added within the text to be displayed?";
var q3 = 'Where is the "script" tag typically placed?';
var q4 = "What extension is used for the JavaScript file?";
var q5 = "How does the single line comment look like in JavaScript?";
var q6 = "Which keyword is used to denote a varible in JavaScript?";
var q7 = 'In JavaScript, what is the "=" (equal sign) called?';
var q8 = "Which of the following cannot be used in variable names?";
var q9 = "What is a floating point number?";
var q10 = "In order to create a string, text must be put inside...";
// Array containing all questions
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

// Arrays for answers
var ansQ1 = ["style", "script", "code", "body", "div"]; // script
var ansQ2 = ["JavaScript Commands", "Folders", "Formatting Tags", "Stuff", "Files"]; // Formatting Tags
var ansQ3 = ["After the closing HTML tag","Inside the HEAD tag","Before the HTML tag","Anywhere is fine","Inside the CSS file"]; // head
var ansQ4 = [".xml", ".html", ".json", ".css", ".js"]; // .js
var ansQ5 = ["<!--this is a comment-->", "%%this is a comment", "//This is a comment", "**This is a comment", "{?--This is a comment"]; // //This is a comment
var ansQ6 = ["var", "int", "variable", "vrb", "float"]; // var
var ansQ7 = ["Equal To", "Assignment Operator", "Is Equivalent", "Same As", "Opposite Of"]; // Assignment Operator
var ansQ8 = ["Underscore", "Numbers", "Letters", "Your Name", "Special Symbols"]; // Special Symbols
var ansQ9 = ["A Placeholder", "It Has A Decimal Place", "A Drifting Number", "A Prime Number","It Includes a Comma"]; //It Has A Decimal Place
var ansQ10 = ["/ Symbols", "<string></string> tag", "<!-- Here -->", "Quotation Marks", "{ Here }"]; // Quotation Marks
// Array containing all answer arrays... Array-ception
var answers = [ansQ1, ansQ2, ansQ3, ansQ4, ansQ5, ansQ6, ansQ7, ansQ8, ansQ9, ansQ10];


// Functions to execute upon page load
goHome();


// Get High Scores from local storage (if any)
function init() {
    var storedNames = JSON.parse(localStorage.getItem("scoreBoard.names"));
    var storedScores = JSON.parse(localStorage.getItem("scoreBoard.scores"));
    // if scoreBoard.names or .scores were retrieved from the localstorage, update the scoreBoard.names or .scores
    if (storedNames !== null) {
      scoreBoard.names = storedNames;
    }
    if (storedScores !== null) {
      scoreBoard.scores = storedScores;
    }
  }
  
  // Save high scores to local storage
  function storeScores() {
    localStorage.setItem("scoreBoard.names", JSON.stringify(scoreBoard.names));
    localStorage.setItem("scoreBoard.scores", JSON.stringify(scoreBoard.scores));
  }

  // Read the function in a "Palpatine Sith Voice"... it removes all child elements from the variables
  function executeOrder66() {
    pageTitle.innerHTML = "";
    timerDiv.innerHTML = "";
    headerDiv.innerHTML = "";
    contentDiv1.innerHTML = "";
    contentDiv2.innerHTML = "";
    buttonsDiv.innerHTML = "";
  };

  // Function to change page title
  function titleText(title) {
    pageTitle.textContent = title;
  }

  function goHome() {
    executeOrder66();
    titleText("Coding Quiz - Home");
    bodyEl.setAttribute('style', 'background-color: lightblue;')

    var homeHeader = document.createElement('h1');
    homeHeader.setAttribute('style', 'text-align: center; font-size: 25px; border: 2px solid #4CAF50; margin: 50px 25px 0px 25px; padding: 14px 40px; border-radius: 12px; background-color: #E8E8E8;');
    homeHeader.textContent = "Coding Quiz Challenge";

    var homeText = document.createElement('p');
    homeText.setAttribute('style', 'text-align: center; font-size: 24px; margin: 50px 200px 0px 200px;');
    homeText.textContent = "In this coding quiz challenge, you are tasked with answering questions as quickly and accurately as possible within the time limit. Correct answers will increase your score, while incorrect answers will decrease your remaining time. You can check out your ranking in the leaderboards by clicking High Scores. Quiz and timer will start when Begin Quiz is clicked. Good Luck!";

    var startBtn = document.createElement('button');
    startBtn.setAttribute('style', 'border: 2px solid #4CAF50; margin: 50px 50px 0px 0px; padding: 14px 40px; border-radius: 8px; font-size: 24px; transition-duration: 0.4s;');
    startBtn.textContent = "Begin Quiz";

    var leaderboardBtn = document.createElement('button');
    leaderboardBtn.setAttribute('style', 'border: 2px solid yellow; margin: 50px 0px 0px 50px; padding: 14px 40px; border-radius: 8px; font-size: 24px; transition-duration: 0.4s;');
    leaderboardBtn.textContent = "Leaderboard";

    headerDiv.appendChild(homeHeader);
    contentDiv1.appendChild(homeText);
    buttonsDiv.appendChild(startBtn);
    buttonsDiv.appendChild(leaderboardBtn);
    }