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

function createSquares(squaresPerRow) {
    drawingPad.innerHTML = "";

    const totalSquares = squaresPerRow ** 2;
    const squareWidth = `calc(100% / ${squaresPerRow})`;
    
    for(let i = 0; i < totalSquares; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.style.flexBasis = squareWidth;
       
        let hoverCount = 0;
        square.addEventListener("mouseenter", () => {
            if (eraserMode) {
                square.style.backgroundColor = "";

            } else {
                let bgColor;
                if (colorBlackMode) {
                    bgColor = `rgba(0, 0, 0)`;
                } else if (colorRandomMode) {
                    bgColor = getRandomBgColor();
                }
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
    } while (isNaN(squaresPerRow) || squaresPerRow > 100);

    if (squaresPerRow) {
        createSquares(squaresPerRow);
    }
})

eraserBtn.addEventListener("click", () => {
    eraserMode = !eraserMode;
    if (eraserMode) {
        eraserBtn.classList.add("eraserBtn-active");
    } else {
        eraserBtn.classList.remove("eraserBtn-active");
    }
})

clearBtn.addEventListener("click", () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.style.backgroundColor = "";
    });
});

colorBlackBtn.addEventListener("click", () => {
    colorBlackMode = true;
    colorRandomMode = false;
    colorBlackBtn.classList.add("colorBtn-active");
    colorRandomBtn.classList.remove("colorBtn-active");
})

colorRandomBtn.addEventListener("click", () => {
    colorRandomMode = true;
    colorBlackMode = false;
    colorRandomBtn.classList.add("colorBtn-active");
    colorBlackBtn.classList.remove("colorBtn-active");
})
createSquares(10);