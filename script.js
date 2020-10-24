// Declaring variables referencing HTML elements
var pageTitle = document.querySelector('#title-element');
var bodyEl = document.querySelector('#body-el');
var timerDiv = document.querySelector('#timer-div');
var headerDiv = document.querySelector('#header-div');
var contentDiv1 = document.querySelector('#content-1-div');
var buttonsDiv = document.querySelector('#buttons-div');

// General variables
var userAns;
var qNum;
var score;
var timeLeft;
var timeRunning;
var testEnd;

// Object that will hold save score information
var scoreBoard = {
    names: [],
    scores: []
}

// Declaring Variables for questions and answers
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
var ansQ1 = ["<style>", "<script>", "<code>", "<body>", "<div>"]; // script
var ansQ2 = ["JavaScript Commands", "Folders", "Formatting Tags", "Stuff", "Files"]; // Formatting Tags
var ansQ3 = ["After the closing HTML tag","Inside the BODY tag","Before the HTML tag","Anywhere is fine","Inside the CSS file"]; // body
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
init();
goHome();

// Get High Scores from local storage (if any)
function init() {
  var storedNames = JSON.parse(localStorage.getItem("scoreBoard.names"));
  var storedScores = JSON.parse(localStorage.getItem("scoreBoard.scores"));
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
  buttonsDiv.innerHTML = "";
};

// Removes all child elements except the timerDiv... still just as savage as order 66
function executeOrder65() {
  pageTitle.innerHTML = "";
  headerDiv.innerHTML = "";
  contentDiv1.innerHTML = "";
  buttonsDiv.innerHTML = "";
};

//Function to check the user's answer
function checkAnswer() {
  // Swtich Case to get the correct answer for each question
  var correctAnswer;
  switch (qNum) {
    case 0: // Get the question number that the user is on
      correctAnswer = 1; // correct answer for this question
      break; // break out of switch case if user is on this question
    case 1:
      correctAnswer = 2;
      break;
    case 2:
      correctAnswer = 1;
      break;
    case 3:
      correctAnswer = 4;
      break;
    case 4:
      correctAnswer = 2;
      break;
    case 5:
      correctAnswer = 0;
      break;
    case 6:
      correctAnswer = 1;
      break;
    case 7:
      correctAnswer = 4;
      break;
    case 8:
      correctAnswer = 1;
      break;
    case 9:
      correctAnswer = 3;
      break;
    default:
      console.log("Fatal Error: Hmm, my program seems to have broken. I'll be honest, I have no idea how this message would ever appear...");
  }
  // Check the user's answer against the correct answer
  if (parseInt(userAns) === parseInt(correctAnswer)) {
    score += 10;
    qNum++;
    nextQuestion();
  } else {
    timeLeft -= 10;
    qNum++;
    nextQuestion();
  }
}

// Timer Function
function startTimer() {
  timeRunning = true;
  // Setup to write timer to page
  var timerEl = document.createElement('p');
  timerEl.setAttribute("style", "text-align: center; font-weight: bold; font-size: 30px; border: 2px solid black; margin: 25px; padding: 14px 40px; border-radius: 12px; background-color: #E8E8E8;");
  timerDiv.appendChild(timerEl);

  var setTimer = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Timer: " + timeLeft;
    // Change timer to red when there are 25 seconds left
    if (timeLeft < 26) {
      timerEl.setAttribute("style","text-align: center; color: red; font-weight: bold; font-size: 30px; border: 2px solid black; margin: 25px; padding: 14px 40px; border-radius: 12px; background-color: #E8E8E8;");
    }
    if (timeLeft <= 0 || testEnd === true) {
      timeRunning = false;
      clearInterval(setTimer);
      endQuiz();
    }
  }, 1000);
}

// Function to change page title
function titleText(title) {
  pageTitle.textContent = title;
}

// Function to go to home page
function goHome() {
  executeOrder66();
  titleText("Coding Quiz - Home");
  bodyEl.setAttribute('style', 'background-color: lightblue;');

  // Variable Reset
  qNum = 0;
  score = 0;
  timeLeft = 120;
  testEnd = false;
  timeRunning = false;
  
  // Creating and Styling elements
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

  // Writing elements to page
  headerDiv.appendChild(homeHeader);
  contentDiv1.appendChild(homeText);
  buttonsDiv.appendChild(startBtn);
  buttonsDiv.appendChild(leaderboardBtn);

  // Event Listeners for Begin Quiz & Leaderboard buttons
  startBtn.addEventListener('click', function() {
    event.stopPropagation();
    nextQuestion();
  });
  leaderboardBtn.addEventListener('click', function(){
    event.stopPropagation();
    showLeaderboard();
  });
}

// Move to next question
function nextQuestion() {
  if (qNum > 9) {
    testEnd = true;
  } else {
    executeOrder65();
    titleText("Coding Quiz - Quizzzzing!");
    // Start timer if it is not running
    if (!timeRunning) {
      startTimer();
    }
    // Change header to current question
    var qText = document.createElement('h1');
    qText.setAttribute('style', 'text-align: center; font-size: 25px; border: 2px solid #4CAF50; margin: 50px 25px 0px 25px; padding: 14px 40px; border-radius: 12px; background-color: #E8E8E8;');
    qText.textContent = questions[qNum];
    headerDiv.appendChild(qText);

    // Created ul element to write the answers to
    var listEl = document.createElement('ul');
    listEl.setAttribute('style', 'list-style: none;');
    contentDiv1.setAttribute('style', 'text-align: center; font-size: 25px; list-style: none;');
    contentDiv1.appendChild(listEl);

    // Loop to cycle through and write the answers for the question to the page
    for (let i = 0; i < answers[qNum].length; i++) {
      var ansItem = answers[qNum][i];
  
      var listItem = document.createElement("li");
      listItem.setAttribute("data-index", i);
  
      var button = document.createElement("button");
      button.textContent = ansItem;
      button.setAttribute("style","font-size: 25px; border: 2px solid black; margin: 25px; padding: 14px 40px; border-radius: 12px; background-color: #E8E8E8;");
  
      listItem.appendChild(button);
      listEl.appendChild(listItem);
    }
    // Answer selection event listener
    listEl.addEventListener("click", function (event) {
      var element = event.target;
      if (element.matches("button") === true) {
        userAns = element.parentElement.getAttribute("data-index");
      }
      checkAnswer();
    });
  }
}

// Function to be ran at the end of the quiz
function endQuiz() {
  executeOrder66();
  titleText("Coding Quiz - End of Quiz");

  // Create, style, & write elements to page
  var endHeader = document.createElement('h1');
  endHeader.setAttribute('style', 'text-align: center; font-size: 25px; border: 2px solid #4CAF50; margin: 50px 25px 0px 25px; padding: 14px 40px; border-radius: 12px; background-color: #E8E8E8;');
  endHeader.textContent = "End of Quiz";
  headerDiv.appendChild(endHeader);

  var resultsText = document.createElement('p');
  resultsText.setAttribute('style', 'text-align: center; font-size: 24px; margin: 50px 0px 50px 200px; margin-right: 200px;');
  resultsText.textContent = "Your final score is " + score + ". Enter your name and press submit to save your score!";
  contentDiv1.appendChild(resultsText);

  // Creating form element that the label & input will be written to
  var scoreForm = document.createElement('form');
  contentDiv1.appendChild(scoreForm);

  // Create the label element
  var nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "userName");
  nameLabel.textContent = "Name: ";
  nameLabel.setAttribute("style","font-size: 30px; background: transparent; border: none; margin: 5px 0px 5px;");
  scoreForm.appendChild(nameLabel);

  // Create the input element for user input
  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "score-input");
  nameInput.setAttribute("style", "background-color: #E8E8E8; color: black; padding: 14px 20px; margin: 8px 0; border: 2px solid black; border-radius: 4px; cursor: pointer;");
  scoreForm.appendChild(nameInput);

  var submitBtn = document.createElement('button');
  submitBtn.setAttribute('style', 'border: 2px solid yellow; margin: 50px 0px 0px 50px; padding: 14px 40px; border-radius: 8px; font-size: 24px; transition-duration: 0.4s;');
  submitBtn.textContent = "Submit";
  buttonsDiv.appendChild(submitBtn);

  // Event listeners for score submission
  submitBtn.addEventListener("click", function (event) {
    // Prevent default event
    event.preventDefault();
    event.stopPropagation();
    var nameText = nameInput.value.trim();
    // Return from function early if submitted text input is blank
    if (nameText === "") {
      return;
    }
    //Add new ScoreText to High Scores array
    scoreBoard.names.push(nameText);
    scoreBoard.scores.push(score);
    //nameInput.value = "";
    storeScores();
    showLeaderboard();
  });

  scoreForm.addEventListener("submit", function (event) {
    // Prevent default event
    event.preventDefault();
    event.stopPropagation();
    var nameText = nameInput.value.trim();
    // Return from function early if submitted text input is blank
    if (nameText === "") {
      return;
    }
    //Add new ScoreText to High Scores array
    scoreBoard.names.push(nameText);
    scoreBoard.scores.push(score);
    //nameInput.value = "";
    storeScores();
    showLeaderboard();
  });
}

// Show the leaderboard
function showLeaderboard() {
  executeOrder66();
  titleText("Coding Quiz - Leaderboard");
  // Create header
  var scoreHeader = document.createElement('h1');
  scoreHeader.setAttribute('style', 'text-align: center; font-size: 25px; border: 2px solid #4CAF50; margin: 50px 25px 0px 25px; padding: 14px 40px; border-radius: 12px; background-color: #E8E8E8;');
  scoreHeader.textContent = "High Scores";
  headerDiv.appendChild(scoreHeader);
  // Create Home Button
  var homeButton = document.createElement("button");
  homeButton.textContent = "Home";
  homeButton.setAttribute("style", "font-size: 25px; border: 2px solid #4CAF50; margin: 25px; padding: 14px 40px; border-radius: 12px; background-color: #E8E8E8;")
  buttonsDiv.appendChild(homeButton);

  contentDiv1.setAttribute('style', 'margin: 50px 0px 30px 0px;');
  // Loop to create the high scores list
  for (var i = 0; i < scoreBoard.names.length; i++) {
    var boardName = scoreBoard.names[i];
    var boardScore = scoreBoard.scores[i];
    
    var containerDiv = document.createElement('div');
    containerDiv.setAttribute("id", scoreBoard.scores[i]); // Setting element id ==== to score for easier sorting in the sortScore() function
    containerDiv.setAttribute("style", "background-color: #E8E8E8; text-align: center; width: 600px; height: auto; margin: 0 auto; padding: 14px 40px; border-radius: 8px;");
    contentDiv1.appendChild(containerDiv);

    var rowDiv = document.createElement('div');
    rowDiv.setAttribute("style", "position: relative; display: inline-block; width: 100%; height: 55px; border-bottom: 1px solid black;");
    containerDiv.appendChild(rowDiv);

    // This doesn't quite work as intended after high scores are recorded and new ones are added
    // var rankEl = document.createElement('p');
    // rankEl.textContent = ((i+1) + ": ");
    // rankEl.setAttribute("data-index", i);
    // rankEl.setAttribute("style", "width: 33.33%; position: relative; display: inline-block; font-size: 25px;");

    var nameEl = document.createElement('p');
    nameEl.textContent = boardName;
    nameEl.setAttribute("data-index", i);
    nameEl.setAttribute("style", "width: 50%; position: relative; display: inline-block; font-size: 25px;");

    var scoreEl = document.createElement('p');
    scoreEl.textContent = boardScore;
    scoreEl.setAttribute("data-index", i);
    scoreEl.setAttribute("style", "width: 50%; position: relative; display: inline-block; font-size: 25px;");
      
    //rowDiv.appendChild(rankEl);
    rowDiv.appendChild(nameEl);
    rowDiv.appendChild(scoreEl);
  }

  sortScores();

  // Country roads, take me home, To the place I belong, West Virginia, mountain mama, Take me home, country roads
  homeButton.addEventListener("click", function () {
    event.stopPropagation();
    goHome();
  });
}

// Function to sort the high scores and re-write them from highest to lowest score
function sortScores() {
  // Get all children of element
  var sortItems = contentDiv1.children;
  // Change from a NodeList to an array
  sortItems = Array.prototype.slice.call(sortItems, 0);
  // sort array based on element id
  sortItems.sort(function(a,b){
    var sorted = +b.id - +a.id;
    return sorted;
  });
  // Re-write the leaderboard in the new order
  for (let i = 0; i < sortItems.length; i++) {
    contentDiv1.appendChild(sortItems[i]);
  }
}