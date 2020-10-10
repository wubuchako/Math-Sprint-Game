// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time

// Scroll

// Get Random Number up to a max number
function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  console.log('correct equations:', correctEquations);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  console.log('wrong equations:', wrongEquations);
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9); //最大の数が９
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
 for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
  console.log('equations array:', equationsArray);
}

// Dynamically adding correct/incorrect equations
// function populateGamePage() {
//   // Reset DOM, Set Blank Space Above
//   itemContainer.textContent = '';
//   // Spacer
//   const topSpacer = document.createElement('div');
//   topSpacer.classList.add('height-240');
//   // Selected Item
//   const selectedItem = document.createElement('div');
//   selectedItem.classList.add('selected-item');
//   // Append
//   itemContainer.append(topSpacer, selectedItem);

//   // Create Equations, Build Elements in DOM

//   // Set Blank Space Below
//   const bottomSpacer = document.createElement('div');
//   bottomSpacer.classList.add('height-500');
//   itemContainer.appendChild(bottomSpacer);
// }


// Displays 3, 2, 1, GO! カウントダウン表示 1秒づつズレて表示
function countdownStart(){
    countdown.textContent = '3'; // テキスト３を表示
    setTimeout(() => {
        countdown.textContent = '2';
    }, 1000); //１０００は1秒
    setTimeout(() => {
        countdown.textContent = '1';
    }, 2000);　// 2秒遅れ
    setTimeout(() => {
        countdown.textContent = 'GO!';
    }, 3000); // 3秒遅れ
}

// Navigate from Splash Page to Countdown Page スタートボタン押したら、カウントダウンページになる
function showCountdown(){
    countdownPage.hidden = false;
    splashPage.hidden = true;
    countdownStart();
    createEquations();
}


// Get the value from selected radio button クリックすると選んだ質問数の情報をえる
function getRadioValue(){
    let radioValue;
    radioInputs.forEach((radioInput) => {
        if(radioInput.checked){
          radioValue = radioInput.value;
         
        }
    });
    return radioValue;
}

// Form that decides amount of questions 質問数を選んでスタートボタンクリック,カウントダウンページ開く
function selectQuestionAmount(e){
    e.preventDefault(); //初期設定を防ぐ
    questionAmount = getRadioValue();
    console.log('question amount:', questionAmount);
    // きちんと入力されたらカウントダウンページに行く
    if(questionAmount){
        showCountdown();
    }
}

//クリックすると背景色が水色になる
startForm.addEventListener('click', ()=> {
    radioContainers.forEach((radioEl) => {
        // Remove Selected Label Styling
        radioEl.classList.remove('selected-label');
        // Add it back if radio input is checked
        if(radioEl.children[1].checked){
            radioEl.classList.add('selected-label');
        }
    });
})

// Event Listeners　質問数選んでボタンをクリック
startForm.addEventListener('submit', selectQuestionAmount);