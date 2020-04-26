
const STORE = {
  questions: [
    {
      question: "D2 players often say, “Thanks a lot, Bungie” but replace “Bungie” with which alias?",
      options: [
        "Bunghole",
        "Bungo",
        "Bun-Bun",
        "Bunchee"
      ],
      answer: "Bungo"
    },
    
    {
      question: "Ikora Rey is of which Guardian race?",
      options: [
      "Titan",
      "Hunter",
      "Colossus",
      "Warlock"
      ],
      answer: "Warlock"
    },
    
    {
      question: "Which activity is partially based on banking motes?",
      options: [
        "Trials of Osiris",
        "Gambit",
        "Control",
        "Vanguard Strike"
      ],
      answer: "Gambit"
    },
    
    {
      question: "In Season 9, which beloved D1 character was brought back to life?", 
      options: [
        "Cayde 6",
        "Saint-14",
        "Eva Levante",
        "Osiris"
      ],
      answer: "Saint-14"
    },
    
    {
      question: "Winning 7 rounds in a row during Trials of Osiris is referred to as going what?",
      options: [
       "Insane",
       "Platinum",
       "Flawless",
       "Hard"
      ],
      answer: "Flawless"
    },
  ],
};


//Declare global variables for question number and score tracker
let currentQuestionNumber = 0;
let currentScore = 0;


//Start the quiz
function startQuiz() {
  $("#startButton").focus();
  $('#startButton').click(function(event){
    $("#welMessage").hide();
    $("#startButton").hide();
    
    showNewQuestion();
});
}

//Populate new question and answer choices
function showNewQuestion() {
  currentQuestionNumber ++;

if(currentQuestionNumber > 5){
  $(".questionAndScore").hide();
 showFinalResults();
}

else {
$(".quizForm").html(`<legend class="displayedQuestion">${STORE.questions[currentQuestionNumber-1].question}</legend><br>`)

displayTestInfo();
showAnswerChoices();
}
}


// Populate answer choices for the question
function generateChoiceElement (choice) {
   return `<input class=questionSet${currentQuestionNumber} tabindex= 0 name="answerChoice" type="radio" value=${choice}>
  <label class=questionSet${currentQuestionNumber} for="question1">${choice}</label><br>`
}


function generateAnswerChoicesString(choiceList) {
  let choices = choiceList.map((choice) =>
  generateChoiceElement(choice));

  return choices.join("");
}


// Display answer choices
function showAnswerChoices () {

let answerChoiceString = generateAnswerChoicesString(STORE.questions[currentQuestionNumber-1].options);

$(".quizForm").append(`${answerChoiceString}<button type="Submit" class="submitAnswer">Submit</button>`);
}


//Check user-selected input for correctness
function checkAnswer() {

let selected = $("input:checked");
let selectedValue = selected.val();

 let correctAnswer = STORE.questions[currentQuestionNumber-1].answer;



if(correctAnswer == selectedValue) {
  $(".quizForm").append(`<p class="correctAnswer"><i class="fas fa-check-circle" style="color:#008000;"></i>\xa0That is correct!</p>`);
  currentScore++;
}
else {
$(".quizForm").append(`<p class="incorrectAnswer"><i class="fas fa-times-circle" style="color:#FF0000;"></i>\xa0Sorry, that is incorrect! The correct answer is <strong>${correctAnswer}</strong>.</p>`);

}
}


// Handle answer submission
function handleSubmit(){
   
   $('.quizForm').on("click",".submitAnswer", function(event){
     event.preventDefault();


let selected = $("input:checked");
let selectedValue = selected.val();
let correctAnswer = STORE.questions[currentQuestionNumber-1].answer;

if(selectedValue==undefined){
alert("Please select an option to continue!");
}



else {
   $(".submitAnswer").hide();
      $(".quizForm").append(`<button class="nextButton" name="submitButton" type="submit">Next &#8594;</button>`)
      $(".nextButton").focus();
      checkAnswer();
}
});
}


//Handle next question click
function handleNext(){
   
   $(".quizForm").on("click",".nextButton", function(event){
      event.preventDefault();
     $(".displayedQuestion").hide();
     $(".nextButton").hide();
     $(`.questionSet${currentQuestionNumber}`).hide();
  
     showNewQuestion();  
});
}


// Display what question the user is on and their current score
function displayTestInfo() {
  $(".questionAndScore").html(`<li>Question: ${currentQuestionNumber}/5</li><li>Score: ${currentScore}/5</li>`);
}

//Show final results of test and a custom message that's based on performance
function showFinalResults() {
 $(".correctAnswer").hide();
$(".incorrectAnswer").hide();

let message = "";

if (currentScore < 3) {
 message = "Cayde would be disappointed. Try again!";
}

else if(currentScore==3 || currentScore==4){
message = "You did ok, Guardian!";
}

else{
  message = "You got a perfect score! Shaxx would be proud!";
}


$(".quizForm").html(`<p class="finalMessage">Your final score is ${currentScore}/5. ${message}</p>`);

$(".quizForm").append(`<button type=button class="retakeQuiz">Retake Quiz</button>`)

currentQuestionNumber=0;
currentScore=0;

$(".retakeQuiz").focus();




}
//Start quiz over when retakeQuiz button is clicked
function retakeQuiz() {
$(".quizForm").on("click",".retakeQuiz", function(event) {
  $(".questionAndScore").show();
  showNewQuestion();
 
  
});
}

function handleApp(){
  startQuiz();
  handleSubmit();
  handleNext();
  retakeQuiz();
  }

$(handleApp);





