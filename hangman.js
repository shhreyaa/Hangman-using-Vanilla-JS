var languages = [
  "python",
  "javascript",
  "mongodb",
  "json",
  "java",
  "html",
  "css",
  "c",
  "csharp",
  "golang",
  "kotlin",
  "php",
  "sql",
  "ruby",
];
var guess = [];
var mistakes = 0;
var count = 0;
var html = "";
var letters = "";
var answer = "";
var c;
var correct = false;
var populate = [];
var present = 0;
var wins= 0;



//creating random word
function randomWord() {
  answer = languages[Math.floor(Math.random() * languages.length)];
  return answer;
}
 
function keyboard(){
//keyboard UI
for (var i = 65; 90 >= i; i++) {
  // A-65, Z-90
  c = String.fromCharCode(i);
  html += "<button onclick=\"setLetter('" + c + "');\">" + c + "</button>";
}
document.getElementById("container").innerHTML = html;
}

//set Letter

var setLetter = function (x) {
  document.getElementById("keyboard").innerHTML += x;
  checkLetters(x, answer);
  guessedWord(x)
  if (populate.length == answer.length) {
    correctAnswer(populate, answer);
  }
  drawHangman(mistakes)
};

//creating dash
function guessedWord() {
  wordStatus = answer.split('').map(letter => (populate.indexOf(letter) >= 0 ? letter : " _ ")).join('');
console.log(wordStatus)
  document.getElementById('wordSpotlight').innerHTML = wordStatus;

}

//check if the letter is in the word
function checkLetters(letter, answer) {
  letters = [...answer];
  letter = letter.toLowerCase();

  console.log(answer);
  console.log(letter);
  present = 0;

  for (i = 0; i < letters.length; i++) {
      
    if (letter === letters[i]) {

      ans = letter;
      checkposition(letters, ans);
      present = 1;
    }
  }
  if (present === 0) {
    mistakes++;
   
  }

}


//If present check the position of the word

function checkposition(letters, ans) {
  for (i = 0; i < letters.length; i++) {
    if (ans === letters[i]) {
      populate[i] = ans;
      

    }
  }
  return populate;
}



//for drawing hangman

function drawHangman(mistakes){
    console.log(mistakes);
    console.log( `/images/hangman${mistakes}.png`)
    chance=document.getElementById("mistakes")
    chance.innerHTML = mistakes
   
  document.getElementById("hangman").src = `/images/hangman${mistakes}.png`;
  if(mistakes > 6){
    document.getElementById("hangman").src = "/images/hangman6.png";
    document.getElementById('wordSpotlight').innerHTML ="The answer is :" + answer;
    

  }

}

//check if the answer is correct

function correctAnswer(populate, answer) {
  console.log(populate);
  populates = populate.join("");
  console.log(populates);
  console.log(answer);

  if (populates === answer) {
    win= document.getElementById("win")
    win.innerHTML = "YOU WIN";
    win.style.fontSize= '50px';
    win++;
    // Saving number of wins in local storage
     localStorage.setItem('wins',wins);

  }

};

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangman').src = './images/hangman0.png';
  html=""
  console.log(mistakes);
  document.getElementById("keyboard").innerHTML = "";


  randomWord();
  guessedWord();
  drawHangman(mistakes);


  
}


keyboard();
randomWord();
guessedWord();

