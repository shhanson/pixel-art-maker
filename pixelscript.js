const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const COLORS = ["red", "darkorange", "orange", "gold", "yellow", "greenyellow", "green", "teal", "deepskyblue", "blue", "blueviolet", "purple", "magenta", "white", "gray", "black"];
const DIV_WIDTH = 30;
const NUM_COLORS = 16;

var currentColor = "white";

function setupCanvas() {
    let canvas = document.querySelector(".canvasarea");
    //console.log(canvas);
    for (let i = 0; i < CANVAS_WIDTH / DIV_WIDTH; i++) {
        for (let j = 0; j < CANVAS_HEIGHT / DIV_WIDTH; j++) {
            let cell = document.createElement("div");
            cell.className = "canvasdiv";
            cell.addEventListener("click", function() {
                cell.style.backgroundColor = currentColor;
            });
            canvas.appendChild(cell);
        }
    }
}

function setupColorPicker() {
    let palette = document.querySelector(".palettearea");
    for (let i = 0; i < NUM_COLORS; i++) {
        let cell = document.createElement("div");
        cell.className = "pickerdiv";
        cell.style.backgroundColor = COLORS[i];
        cell.addEventListener("click", function() {
            currentColor = cell.style.backgroundColor;

        });
        palette.appendChild(cell);
    }
}

function setupClearButton() {
    let footer = document.querySelector(".controlpanel");
    let clearButton = document.createElement("button");
    let buttonText = document.createTextNode("CLEAR");
    clearButton.className = "clearbutton";
    clearButton.appendChild(buttonText);
    footer.appendChild(clearButton);
    clearButton.addEventListener("click", function() {
        let canvasDivs = document.querySelectorAll(".canvasdiv");
        for (let i = 0; i < canvasDivs.length; i++) {
            canvasDivs[i].style.backgroundColor = "white";
        }
    });

}

setupCanvas();
setupColorPicker();
setupClearButton();
