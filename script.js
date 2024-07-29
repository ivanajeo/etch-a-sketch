const drawingPad = document.querySelector(".drawingPad");
const squareBtn = document.querySelector(".squareBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const clearBtn = document.querySelector(".clearBtn");
const colorBlackBtn = document.querySelector(".colorBlackBtn");
const colorRandomBtn = document.querySelector(".colorRandomBtn");

let eraserMode = false;
let colorBlackMode = true;
let colorRandomMode = false;

function getRandomBgColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b})`;
}

function updateButtonState(activeBtn, inactiveBtn) {
    activeBtn.classList.add("colorBtn-active");
    inactiveBtn.classList.remove("colorBtn-active");
}

function createSquares(squaresPerRow) {
    drawingPad.innerHTML = "";

    const totalSquares = squaresPerRow ** 2;
    const squareWidth = `calc(100% / ${squaresPerRow})`;
    
    for(let i = 0; i < totalSquares; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.style.flexBasis = squareWidth;
       
        square.addEventListener("mouseenter", () => {
            if (eraserMode) {
                square.style.backgroundColor = "";

            } else {
                let bgColor = colorBlackMode ? "#000" : getRandomBgColor();
                square.style.backgroundColor = `${bgColor}`;
            }
        })
        drawingPad.appendChild(square);
    }
}
   

squareBtn.addEventListener("click", () => {
    let squaresPerRow;
    do {
        squaresPerRow = parseInt(prompt("Number of squares? (max 100)", 10));
    } while (isNaN(squaresPerRow) || squaresPerRow > 100 || squaresPerRow < 1);

    if (squaresPerRow) {
        createSquares(squaresPerRow);
    }
});

colorBlackBtn.addEventListener("click", () => {
    colorBlackMode = true;
    colorRandomMode = false;
    updateButtonState(colorBlackBtn, colorRandomBtn);
});

colorRandomBtn.addEventListener("click", () => {
    colorRandomMode = true;
    colorBlackMode = false;
    updateButtonState(colorRandomBtn, colorBlackBtn);
});

eraserBtn.addEventListener("click", () => {
    eraserMode = !eraserMode;
    eraserBtn.classList.toggle("eraserBtn-active", eraserMode);
});

clearBtn.addEventListener("click", () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.style.backgroundColor = "";
    });
});


createSquares(10); // Initialize with 10 squares per row