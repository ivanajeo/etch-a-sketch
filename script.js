const drawingPad = document.querySelector(".drawingPad");
const squareBtn = document.querySelector(".squareBtn");


squareBtn.addEventListener("click", function() {
    drawingPad.textContent = "";
    let squaresPerRow = parseInt(prompt("number of squares?"));
    let totalSquares = squaresPerRow**2;
    let squareWidth = `calc(100% / ${squaresPerRow})`;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.flexBasis = squareWidth;

        let hoverCount = 0;
        square.addEventListener("mouseenter", function() {
            hoverCount += 1;
            let newOpacity = Math.min(hoverCount * 0.1, 1);
            square.style.backgroundColor = `rgba(0, 255, 0, ${newOpacity})`;
        })
    drawingPad.appendChild(square);
};
})

    