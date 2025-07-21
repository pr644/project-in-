let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // player X player O

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");

 const line = document.querySelector(".win-line");
  line.classList.add("hide");
  line.removeAttribute("style");

   boxes.forEach((box) => {
    box.classList.remove("winner"); // remove winning background
  });
};


const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box clicked");
    if (turnO) {
      // player 1
      box.innerText = "o";
      turnO = false;
    } else {
      // player 2
      box.innerText = "x";
      turnO = true;

      box.style.color = "blue";
    }
    box.disabled = true;

    checkWinner();
    if(!turnO){
      setTimeout(() => {
      aiMove(); // Let AI play
    }, 500);
    }
  });
});
const disabledBoxes  = () =>{
  for(let box of boxes){
    box.disabled = true;

  }

} 
const enableBoxes  = () =>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";

  }

} 
const showWinner = (winner) =>{
  msg.innerText = `congratulations , winner  is  ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();

  const winSound = document.getElementById("win-sound");
  winSound.play();

   updateScore(winner);
};

const checkWinner = () => {
  for (pattern of winPattern) {
    let pos1 =  boxes[pattern[0]].innerText;
    let pos2 =  boxes[pattern[1]].innerText;
    let pos3 =  boxes[pattern[2]].innerText;

    
    if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
      if(pos1 === pos2 && pos2 === pos3){
        console.log("winner",pos1);

        showWinner(pos1); 

        HighlightWinningBoxes(pattern);

        return;
  

      }
    }

  }
  let isDraw = true;
  for(let box of boxes){
    if(box.innerText === ""){
      isDraw = false;
      break;
    }
  }
  if(isDraw){
    msg.innerText = "It is a draw";
    msgContainer.classList.remove("hide");
    disabledBoxes();
  }
};
const HighlightWinningBoxes = (pattern) => {
  for(let index of pattern){
    boxes[index].classList.add("winner");
  }
   showWinLine(pattern);
}

const showWinLine = (pattern) => {
  const line = document.querySelector(".win-line");
  line.classList.remove("hide");


  const lineStyles  =  {
   "0,1,2": { top: "9vmin", left: "0", width: "54vmin", rotate: "0deg" },
    "3,4,5": { top: "28vmin", left: "0", width: "54vmin", rotate: "0deg" },
    "6,7,8": { top: "47vmin", left: "0", width: "54vmin", rotate: "0deg" },

    "0,3,6": { top: "0", left: "9vmin", width: "54vmin", rotate: "90deg" },
    "1,4,7": { top: "0", left: "28vmin", width: "54vmin", rotate: "90deg" },
    "2,5,8": { top: "0", left: "47vmin", width: "54vmin", rotate: "90deg" },

    "0,4,8": { top: "0", left: "0", width: "76vmin", rotate: "45deg" },
    "2,4,6": { top: "0", left: "0", width: "76vmin", rotate: "-45deg" },  
  };

   const key = pattern.slice().sort((a, b) => a - b).join(",");
  const style = lineStyles[key];

  if(style){
    line.style.top = style.top;
    line.style.left = style.left;
    line.style.width = style.width;
    line.style.transform = `rotate(${style.rotate})`;
  }
  setTimeout(() => {
      line.style.width = style.width;
    }, 100)
  };

  function aiMove(){
     let emptyBoxes = [...boxes].filter(box => box.innerText === "");
     if(emptyBoxes.length === 0) return;

      let box = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

      box.innerText = "X";
  box.style.color = "blue";
  box.disabled = true;

  turnO = true;
  checkWinner();
  }

  let xScore = 0;
  let oScore = 0;

  const updateScore  = (winner) =>{
    if(winner === "x"){
      xScore++;
      document.getElementById("x-score").innerText = xScore;
    }else if(winner === "o"){
      oScore++;
      document.getElementById("o-score").innerText = oScore;
    }

  }

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
