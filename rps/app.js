//our array choices have corresponding images
// sets these values to the "alt" text of the element
var rock = document.getElementById("options1").alt;
var paper = document.getElementById("options2").alt;
var scissors = document.getElementById("options3").alt;


//list our choices in an array
var choices = [rock, paper, scissors];

//our computer choice is random
// sets it to one of the options in the "choices" array

//when user clicks on an image, they'll select a choice
var userChoice;

//lets make the choice darker when we click 
function changeColor(elm) {
    elm.style.backgroundColor = "#ff9191";
    
    if (userChoice) {
        userChoice.style.background = "";
    }
    
    userChoice = elm;
    // calls the "showMessage()" function
    showMessage();
    return userChoice;   
}


function letsPlay(){
    var itText;
    if (userChoice.alt === computerChoice) {
        itText = "It's a tie!";
    } else if (userChoice.alt === rock && computerChoice === "scissors") {
        itText = "You beat me with a rock!";
    } else if (userChoice.alt === rock && computerChoice === "paper") {
        itText = "Paper covered you! You lost!";
    } else if (userChoice.alt === paper && computerChoice === "rock") {
        itText = "We have a winner! You covered me up with paper!";
    } else if (userChoice.alt === paper && computerChoice === "scissors") {
        itText = "You lost, I cut you up.";
    } else if (userChoice.alt === scissors && computerChoice === "paper") {
        itText = "Why did you cut me up?.. You win.";
    } else if (userChoice.alt === scissors && computerChoice === "rock") {
        itText = "You lost, I crushed you with a rock.";
    } else {
        itText = "You lost...";
    }
	
    // this returns the text of the outcome to be used by "showMessage()"
    return itText;
}

function showMessage() {
    // when called, "showMessage()" will call "letsPlay()" and receive a text value
    document.getElementsByClassName("resultsOp")[0].innerHTML = letsPlay(); 
}

// playAgain cannot be above userChoice before it's declared
function playAgain() {
    // here we set the backgroundColor to none for the current choice
    userChoice.style.backgroundColor = "";
    
    // set userChoice to nothing to start over
    
    // this resets computerChoice. Idealy this would be in a function (DRY)
    computerChoice = choices[Math.floor(Math.random() * (choices.length))];
    
    // sets the response text to empty.
    document.getElementsByClassName("resultsOp")[0].innerHTML = "";
}