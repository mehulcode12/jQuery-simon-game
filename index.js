
let buttonColors = ["red", "blue", "green", "yellow"];

// Variables
let gamePattern = [];
let userPattern = [];
let level = 0;
let gameStarted = false;

// Event listeners
$(document).on("keypress", function() {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

$(".btn").on("click", function() {
  const userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  const currentLevel = userPattern.length - 1;
  checkAnswer(currentLevel);
});

// Functions
function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);

  const randomNum = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNum];
  gamePattern.push(randomColor);

  $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } 
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    startOver();
  }
}

function animatePress(color) {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => $(`#${color}`).removeClass("pressed"), 100);
}

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userPattern = [];
  gameStarted = false;
}
