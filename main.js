"use strict";
const squares = [];
const kansuji = ["一","二","三","四","五","六","七","八","九",];
const board = document.getElementById("board");
const result = document.getElementById("result");
const seikai = document.getElementById("seikai");
const seikairitsu = document.getElementById("seikairitsu");
const timer = document.getElementById("timer");
const modeSelect = document.getElementById("game_mode");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

const correctSE= document.getElementById("correct_se");
const wrongSE= document.getElementById("wrong_se");

//問題数、正解・不正解のカウント
let total = 0;
let correct = 0;
let wrong = 0;
//タイム測定用
let startTime;
let finishTime;
//ゲーム中か否かフラグ
let onGame = false;
//問題数
let gameMode = Number(modeSelect.value);


let seikaiCol = Math.floor(Math.random() * 9);
let seikaiRow = Math.floor(Math.random() * 9);

const allRecords = {
  5 : [],
  10 : [],
  100 : [],
};


window.onload = gameInit();

function gameInit() {//将棋盤の作成
  for (let i = 0; i < 9; i++) {
    squares[i] = [];
  }
  for (let i = 0; i < 9; i++) {
    const row = document.createElement("tr");
    board.appendChild(row);
    for (let j = 8; j >= 0; j--) {
      const col = document.createElement("td");
      row.appendChild(col);
      squares[j][i] = col;
      col.addEventListener("click", () =>{
        if(onGame){
          mainGame(j,i);
          finishCheck();
        }
      })
    }
  }
  draw();
}

function nextGame() {
  total +=1;
  seikaiCol = Math.floor(Math.random() * 9);
  seikaiRow = Math.floor(Math.random() * 9);
  seikai.innerHTML = `${seikaiCol + 1} ${kansuji[seikaiRow]}`;
}

function judgement(col, row) { //正誤判定
  if(col === seikaiCol && row === seikaiRow) {
    return true;
  } else {
    return false;
  }
}

function gameStart() {
  gameReset();
  gameMode = Number(modeSelect.value);
  modeSelect.disabled = true;
  startBtn.classList.add("btn-disabled");
  // currentTime;
  startTime = Date.now();
  onGame = true;
  seikai.innerHTML = `${seikaiCol + 1} ${kansuji[seikaiRow]}`;
}
function gameEnd() {
  // clearInterval(currentTime);
  modeSelect.disabled = false;
  startBtn.classList.remove("btn-disabled");
  finishTime = Date.now();
  onGame = false;
  seikai.innerHTML = "";
}
function finishCheck () {
  if (correct === gameMode) {
    gameEnd();
    const time = finishTime - startTime;
    timer.innerHTML = `${Math.floor(time / 1000)} ' ${time % 1000}`;
    if(allRecords[gameMode].every((record) => record > time)) timer.innerHTML += (" >New Record!<");
    allRecords[gameMode].push(time);
    
    console.log(allRecords);  
  }
}
// const currentTime = setInterval(() => {
//   const nowTime = Date.now() - startTime;
//   timer.innerHTML = `${Math.floor(nowTime / 1000)} ' ${nowTime % 1000}`;
// }, 1)
  



function mainGame(col, row){
  if (judgement(col, row)) {
    result.innerHTML = "正解！";
    correct += 1;
    correctSE.pause();
    correctSE.currentTime=0;
    correctSE.play();
    draw();
    nextGame();
  } else {
    result.innerHTML = "残念！";
    wrong += 1;
    wrongSE.pause();
    wrongSE.currentTime=0;
    wrongSE.play();
    draw();
  }
}

function gameReset() {
  onGame = false;
  modeSelect.disabled = false;
  startBtn.classList.remove("btn-disabled");
  total = 0;
  correct = 0;
  wrong = 0;
  seikaiCol = Math.floor(Math.random() * 9);
  seikaiRow = Math.floor(Math.random() * 9);
  seikai.innerHTML = "";
  result.innerHTML = "";
  timer.innerHTML = "";
  draw();
}

function draw() { //画面の描画
  const per = Math.round(correct * 1000 / (correct + wrong))/10 //正解率を小数第1桁まで
  if(per) {
    seikairitsu.innerHTML = `正解:${correct}回 不正解:${wrong}回 正答率:${per}％`
  } else if(wrong){
    seikairitsu.innerHTML = `正解:${correct}回 不正解:${wrong}回 正答率:0％`
  } else {
    seikairitsu.innerHTML = `正解:${correct}回 不正解:${wrong}回 正答率:-`
  }
}

// function GetCookies(){
//     const result = new Array();

//     const allcookies = document.cookie;
//     if( allcookies != '' )
//     {
//         const cookies = allcookies.split( '; ' );

//         for( let i = 0; i < cookies.length; i++ )
//         {
//             const cookie = cookies[ i ].split( '=' );

//             // クッキーの名前をキーとして 配列に追加する
//             result[ cookie[ 0 ] ] = decodeURIComponent( cookie[ 1 ] );
//         }
//     }
//     return result;
// }
