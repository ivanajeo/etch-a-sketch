const drawingPad = document.querySelector(".drawingPad");
const squareBtn = document.querySelector(".squareBtn");
const eraserBtn = document.querySelector(".eraserBtn");

let eraserMode = false;

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

        const randomBgColor = getRandomBgColor();
        let hoverCount = 0;
        square.addEventListener("mouseenter", () => {
            if (eraserMode) {
                square.style.backgroundColor = "";
            } else {
                hoverCount += 1;
                let newOpacity = Math.min(hoverCount * 0.5, 1);

                square.style.backgroundColor = `${randomBgColor}${newOpacity}`;
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
})
createSquares(10);