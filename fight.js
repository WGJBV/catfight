'use strict';

//Over 9000 variables
var fightData = [];
var playerOneAtt = document.getElementById('pOneAtt');
var playerOneDef = document.getElementById('pOneDef');
var playerTwoAtt = document.getElementById('pTwoAtt');
var playerTwoDef = document.getElementById('pTwoDef');
var allCats = [];
var playerOne = [];
var playerTwo = [];
var leaderboard = [];
var score = 1000;
var endScreen = document.getElementById('endScreen');
var userForm = document.getElementById('userForm');
var fighterOne = document.getElementById('PlayerOne');
var fighterTwo = document.getElementById('PlayerTwo');

//Making the game over screen invisible
endScreen.style.visibility = 'hidden';

//Starting on player one's turn
pOneTurn();

//Loading fight data from local storage
fightData = JSON.parse(localStorage.getItem('fightData'));

//Loading loal storage
if (fightData === null || fightData.length < 2) {
  alert('You have arrived here in error.  Return to character select screen!');
  window.location.href = 'index.html';
}

if (localStorage.getItem('leaderboard') !== null) {
  console.log('Data found');
  leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
}

//Character  and User constructor functions
function Fighter(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.health = 100;
  allCats.push(this);
}

function User(username, score) {
  this.username = username;
  this.score = score;
  leaderboard.push(this);
}

//Instancing starter users
new User('Will','9999');
new User('Kat','700');

//All characters being instanced
new Fighter('Cute-Cat', 'images/kitty1.jpg');
new Fighter('Grumpy-Cat', 'images/GrumpyCat.jpg');
new Fighter('Spookie','images/spookie.jpg');
new Fighter('Nova','images/nova.jpg');
new Fighter('Gary', 'images/gary.jpg');
new Fighter('Charlotte', 'images/charlotte.jpg');
new Fighter('Demi', 'images/demi.png');

//Assigning characters to players
for (var i in allCats){
  if (fightData[0] === allCats[i].name){
    playerOne = allCats[i];
  }
  if (fightData[1] === allCats[i].name){
    playerTwo = allCats[i];
  }
}

//Loading character images, appending names and HP
fighterOne.src = playerOne.filepath;
fighterTwo.src = playerTwo.filepath;
document.getElementById('playerOneName').innerHTML = playerOne.name;
document.getElementById('playerTwoName').innerHTML = playerTwo.name;
document.getElementById('playerOneHP').innerHTML = playerOne.health;
document.getElementById('playerTwoHP').innerHTML = playerTwo.health;

//Functions to handle turns
function pOneTurn(){
  document.getElementById('pOneAtt').style.visibility = 'visible';
  document.getElementById('pOneDef').style.visibility = 'visible';
  document.getElementById('pTwoAtt').style.visibility = 'hidden';
  document.getElementById('pTwoDef').style.visibility = 'hidden';
}

function pTwoTurn(){
  document.getElementById('pOneAtt').style.visibility = 'hidden';
  document.getElementById('pOneDef').style.visibility = 'hidden';
  document.getElementById('pTwoAtt').style.visibility = 'visible';
  document.getElementById('pTwoDef').style.visibility = 'visible';
}

//Function to make game over screen visible
function addUser() {
  endScreen.style.visibility = 'visible';
}

//Event Handlers for character attacks, heals, and HP display updates

function pOneAttHandler() {
  var randomAttack = 0;
  randomAttack = Math.floor(Math.random() * (50 - 20 + 1) + 20);
  score = score + randomAttack;
  console.log(randomAttack);
  playerTwo.health = playerTwo.health - randomAttack;
  document.getElementById('playerTwoHP').innerHTML = playerTwo.health;
  if (playerTwo.health <= 0) {
    console.log('Below Zero Triggered');
    addUser();
  } else {
    pTwoTurn();
  }
}

function pOneDefHandler() {
  var randomHeal = 0;
  randomHeal = Math.floor(Math.random() * (12 - 2) + 3);
  playerOne.health = playerOne.health + randomHeal;
  document.getElementById('playerOneHP').innerHTML = playerOne.health;
  pTwoTurn();
}

function pTwoAttHandler() {
  var randomAttack = 0;
  randomAttack = Math.floor(Math.random() * (50 - 20 + 1) + 20);
  score = score + randomAttack;
  console.log(randomAttack);
  playerOne.health = playerOne.health - randomAttack;
  document.getElementById('playerOneHP').innerHTML = playerOne.health;
  if (playerOne.health <= 0) {
    addUser();
  } else {
    pOneTurn();
  }
}

function pTwoDefHandler() {
  var randomHeal = 0;
  randomHeal = Math.floor(Math.random() * (12 - 2) + 3);
  score = score - randomHeal;
  playerTwo.health = playerTwo.health + randomHeal;
  document.getElementById('playerTwoHP').innerHTML = playerTwo.health;
  pOneTurn();
}

//Event Handler for leaderboard data and moving to leaderboard.html
function leaderboardHandler (event) {
  event.preventDefault();
  var user = event.target.submitUser.value;
  new User(user, score);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  window.location.href = 'leaderboard.html';
}

//Event Listeners for attacks and username submit
playerOneAtt.addEventListener('click', pOneAttHandler);
playerOneDef.addEventListener('click', pOneDefHandler);
playerTwoAtt.addEventListener('click', pTwoAttHandler);
playerTwoDef.addEventListener('click', pTwoDefHandler);
userForm.addEventListener('submit', leaderboardHandler);
