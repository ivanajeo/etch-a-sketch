const drawingPad = document.querySelector(".drawingPad");
const squareBtn = document.querySelector(".squareBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const clearBtn = document.querySelector(".clearBtn");
const colorBlackBtn = document.querySelector(".colorBlackBtn");
const colorRandomBtn = document.querySelector(".colorRandomBtn");

// variables to track the current mode of the drawing pad
let eraserMode = false;
let colorBlackMode = true;
let colorRandomMode = false;

function getRandomBgColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b})`;
}

// update the button states to indicate active/inactive status
function updateButtonState(activeBtn, inactiveBtn) {
    activeBtn.classList.add("colorBtn-active");
    inactiveBtn.classList.remove("colorBtn-active");
}

// create a grid of squares in the drawing pad
function createSquares(squaresPerRow) {
    drawingPad.innerHTML = ""; // clear existing squares

    const totalSquares = squaresPerRow ** 2;
    const squareWidth = `calc(100% / ${squaresPerRow})`;
    
    // loop to create each square and add event listener
    for(let i = 0; i < totalSquares; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.style.flexBasis = squareWidth;
       
        // event listener to change bgColor
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
   
// event listener for the squareBtn to prompt user for number of squares
// and create the squares
squareBtn.addEventListener("click", () => {
    let squaresPerRow;
    do {
        squaresPerRow = parseInt(prompt("Number of squares? (max 100)", 10));
    } while (isNaN(squaresPerRow) || squaresPerRow > 100 || squaresPerRow < 1);

    if (squaresPerRow) {
        createSquares(squaresPerRow);
    }
});

// event listener to switch to colorBlackMode
colorBlackBtn.addEventListener("click", () => {
    colorBlackMode = true;
    colorRandomMode = false;
    updateButtonState(colorBlackBtn, colorRandomBtn);
});

// event listener to switch to colorRandomMode
colorRandomBtn.addEventListener("click", () => {
    colorRandomMode = true;
    colorBlackMode = false;
    updateButtonState(colorRandomBtn, colorBlackBtn);
});

// event listener to toggle eraserMode and its class
eraserBtn.addEventListener("click", () => {
    eraserMode = !eraserMode;
    eraserBtn.classList.toggle("eraserBtn-active", eraserMode);
});

// event listener to reset drawing pad
clearBtn.addEventListener("click", () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.style.backgroundColor = "";
    });
});


// Initialize with 10 squares per row
createSquares(10); 