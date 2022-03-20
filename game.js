var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

// variable to keep track of level
var level = 0;

// boolean variable to keep track of first keypress
var started = false;

// listen for keypresses, if first keypress then change level title and call nextSequence
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});

// listen for button clicks, add the corresponding button and play its sound
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // check the user's answer
  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  // randomly select a colour
  var randomChosenColour = buttonColours[randomNumber];

  // add the randomly-selected colour to the overall pattern
  gamePattern.push(randomChosenColour);

  // make the selected button flash
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // play the audio corresponding to the button
  playSound(randomChosenColour);

  level++;

  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    
    startOver();
  }
  console.log(gamePattern[currentLevel]);
  console.log(userClickedPattern[level - 1]);
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
