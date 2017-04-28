const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
// const COLORS = ["#7C7C7C", "#0000FC", "#0000BC", "#4428BC", "#940084", "#A80020", "#A81000", "#881400", "#503000", "#007800", "#006800", "#005800", "#004058", "#BCBCBC", "#0078F8", "#0058F8", "#6844FC", "#D800CC", "#E40058", "#F83800", "#E45C10", "#AC7C00", "#00B800", "#00A800", "#00A844", "#008888", "#F8F8F8", "#3CBCFC", "#6888FC", "#9878F8", "#F878F8", "#F85898", "#F87858", "#FCA044", "#F8B800", "#B8F818", "#58D854", "#58F898", "#00E8D8", "#787878", "#FCFCFC", "#A4E4FC", "#B8B8F8", "#D8B8F8", "#F8B8F8", "#F8A4C0", "#F0D0B0", "#FCE0A8", "#F8D878", "#D8F878", "#B8F8B8", "#B8F8D8", "#00FCFC", "#F8D8F8", "#000000", "#FFFFFF"];

const COLORS = ["#000000", "#0000BC", "#0000FC", "#004058", "#005800", "#0058F8", "#006800", "#007800", "#0078F8", "#008888", "#00A800", "#00A844", "#00B800", "#00E8D8", "#00FCFC", "#3CBCFC", "#4428BC", "#503000", "#58D854", "#58F898", "#6844FC", "#6888FC", "#787878", "#7C7C7C", "#881400", "#940084", "#9878F8", "#A4E4FC", "#A80020", "#A81000", "#AC7C00", "#B8B8F8", "#B8F818", "#B8F8B8", "#B8F8D8", "#BCBCBC", "#D800CC", "#D8B8F8", "#D8F878", "#E40058", "#E45C10", "#F0D0B0", "#F83800", "#F85898", "#F87858", "#F878F8", "#F8A4C0", "#F8B800", "#F8B8F8", "#F8D878", "#F8D8F8", "#F8F8F8", "#FCA044", "#FCE0A8", "#FCFCFC", "#FFFFFF", ];
const DIV_LENGTH = 20;
const NUM_COLORS = COLORS.length;

var currentColor = "black";
var mousedownFlag = false;
var mouseoverFlag = false;


function setupCanvas() {
    document.addEventListener("mouseup", function() {
        mousedownFlag = false;
    });
    let canvas = document.querySelector(".canvasarea");
    canvas.style.height = CANVAS_HEIGHT + "px";
    canvas.style.width = CANVAS_WIDTH + "px";

    for (let i = 0; i < CANVAS_WIDTH / DIV_LENGTH; i++) {
        for (let j = 0; j < CANVAS_HEIGHT / DIV_LENGTH; j++) {
            let cell = document.createElement("div");
            cell.className = "canvasdiv";
            cell.setAttribute("onmousedown", "return false");
            cell.style.width = DIV_LENGTH + "px";
            cell.style.height = DIV_LENGTH + "px";
            if (i === (CANVAS_WIDTH / DIV_LENGTH) / 2) {
                cell.style.borderTop = "2px solid darkgray";
            }
            if (j === (CANVAS_HEIGHT / DIV_LENGTH) / 2) {
                cell.style.borderLeft = "2px solid darkgray";
            }
            cell.addEventListener("click", function() {
                cell.style.backgroundColor = currentColor;
            });
            cell.addEventListener("mousedown", function() {
                cell.style.backgroundColor = currentColor;
                mousedownFlag = true;
            });
            cell.addEventListener("mouseover", function() {
                if (mousedownFlag === true) {
                    cell.style.backgroundColor = currentColor;
                }
            });
            canvas.appendChild(cell);
        }
    }
}

function setupColorPicker() {
    let palette = document.querySelector(".pickerarea");
    for (let i = 0; i < NUM_COLORS; i++) {
        let cell = document.createElement("div");
        cell.className = "pickerdiv";
        cell.style.backgroundColor = COLORS[i];
        cell.addEventListener("click", function() {
            currentColor = cell.style.backgroundColor;
            document.querySelector(".selecteddiv").style.backgroundColor = currentColor;
        });
        palette.appendChild(cell);
    }
}

function setupControlPanel() {
    //Selected Color stuff
    let footer = document.querySelector(".pickerarea");
    let selectedColor = document.createElement("div");
    selectedColor.className = "selecteddiv";
    selectedColor.style.backgroundColor = currentColor;
    footer.appendChild(selectedColor);

    //Clear button stuff
    let clearButton = document.createElement("button");
    let buttonText = document.createTextNode("CLEAR");
    clearButton.className = "clearbutton";
    clearButton.appendChild(buttonText);
    footer.appendChild(clearButton);
    clearButton.addEventListener("click", function() {
        if (window.confirm("Are you sure you want to clear??")) {
            let canvasDivs = document.querySelectorAll(".canvasdiv");
            for (let i = 0; i < canvasDivs.length; i++) {
                canvasDivs[i].style.backgroundColor = "white";
            }
        }

    });
}

setupCanvas();
setupColorPicker();
setupControlPanel();
