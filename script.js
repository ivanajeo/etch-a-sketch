const drawingPad = document.querySelector(".drawingPad");
const squareBtn = document.querySelector(".squareBtn");


function getRandomBgColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, `;
}

squareBtn.addEventListener("click", function() {
    drawingPad.textContent = "";

    let squaresPerRow;
    do {
        squaresPerRow = parseInt(prompt("number of squares? (max 100")); 
    } while (squaresPerRow > 100);
    
    let totalSquares = squaresPerRow**2;
    let squareWidth = `calc(100% / ${squaresPerRow})`;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.flexBasis = squareWidth;

        let randomBgColor = getRandomBgColor();
        
        let hoverCount = 0;
        square.addEventListener("mouseenter", function() {
            hoverCount += 1;
            let newOpacity = Math.min(hoverCount * 0.1, 1);
            let bgColor = `${randomBgColor}${newOpacity})`
            square.style.backgroundColor = bgColor;
        })
    drawingPad.appendChild(square);
};
})

    