const drawingPad = document.querySelector(".drawingPad");
const squareBtn = document.querySelector(".squareBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const clearBtn = document.querySelector(".clearBtn");
const colorBlackBtn = document.querySelector(".colorBlackBtn");
const colorRandomBtn = document.querySelector(".colorRandomBtn");

let eraserMode = false;
let colorMode = "black";

function getRandomBgColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, `;
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
                hoverCount += 1;
                let newOpacity = Math.min(hoverCount * 0.5, 1);
                let bgColor;
                if (colorMode === "black") {
                    bgColor = `rgba(0, 0, 0, `;
                } else if (colorMode === "random") {
                    bgColor = getRandomBgColor();
                }
                square.style.backgroundColor = `${bgColor}${newOpacity}`;
            }
        })
        drawingPad.appendChild(square);
    }
}
   

squareBtn.addEventListener("click", () => {
    let squaresPerRow;
    do {
        squaresPerRow = parseInt(prompt("Number of squares? (max 100), 10"));
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
    colorMode = "black";
})

colorRandomBtn.addEventListener("click", () => {
    colorMode = "random";

})
createSquares(10);