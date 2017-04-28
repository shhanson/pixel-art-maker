//CONSTANT VALUES
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const COLORS = ["#000000", "#0000BC", "#0000FC", "#004058", "#005800", "#0058F8", "#006800", "#007800", "#0078F8", "#008888", "#00A800", "#00A844", "#00B800", "#00E8D8", "#00FCFC", "#3CBCFC", "#4428BC", "#503000", "#58D854", "#58F898", "#6844FC", "#6888FC", "#787878", "#7C7C7C", "#881400", "#940084", "#9878F8", "#A4E4FC", "#A80020", "#A81000", "#AC7C00", "#B8B8F8", "#B8F818", "#B8F8B8", "#B8F8D8", "#BCBCBC", "#D800CC", "#D8B8F8", "#D8F878", "#E40058", "#E45C10", "#F0D0B0", "#F83800", "#F85898", "#F87858", "#F878F8", "#F8A4C0", "#F8B800", "#F8B8F8", "#F8D878", "#F8D8F8", "#F8F8F8", "#FCA044", "#FCE0A8", "#FCFCFC", "#FFFFFF"];
const DIV_LENGTH = 20;
const NUM_COLORS = COLORS.length;

//Global variables :(
var currentColor = "black";
var mousedownFlag = false;
var mouseoverFlag = false;

//Setup canvas (drawing area)
function setupCanvas() {

    //Add listener to the document to keep track of whether or not mouseup occurs anywhere on screen (fixes issue of mousedown over canvas -> mouseup outside of canvas)
    document.addEventListener("mouseup", function() {
        mousedownFlag = false;
    });

    //Grab canvasarea div
    let canvas = document.querySelector(".canvasarea");

    //Set height and width of canvas based on consts
    canvas.style.height = CANVAS_HEIGHT + "px";
    canvas.style.width = CANVAS_WIDTH + "px";

    //Loop to generate each cell div within the canvas
    for (let i = 0; i < CANVAS_WIDTH / DIV_LENGTH; i++) {
        for (let j = 0; j < CANVAS_HEIGHT / DIV_LENGTH; j++) {
            //Create each cell div
            let cell = document.createElement("div");
            cell.className = "canvasdiv";

            //Prevents browser "thinking" that the div is meant to be dragged
            cell.setAttribute("onmousedown", "return false");

            //Set div width and height based on DIV_LENGTH const
            cell.style.width = DIV_LENGTH + "px";
            cell.style.height = DIV_LENGTH + "px";

            //Distinguishes the x-axis
            if (i === (CANVAS_WIDTH / DIV_LENGTH) / 2) {
                cell.style.borderTop = "2px solid darkgray";
            }

            //Distinguishes the y-axis
            if (j === (CANVAS_HEIGHT / DIV_LENGTH) / 2) {
                cell.style.borderLeft = "2px solid darkgray";
            }

            //Event listener for clicking the cell
            cell.addEventListener("click", function() {
                cell.style.backgroundColor = currentColor;
                cell.style.borderColor = currentColor;
            });

            //Event listener for holding the mouse down, aids with click and drag functionality
            cell.addEventListener("mousedown", function() {
                cell.style.backgroundColor = currentColor;
                cell.style.borderColor = currentColor;
                mousedownFlag = true;
            });

            //Event listener for mousing over the div, aids with click and drag functionality
            cell.addEventListener("mouseover", function() {
                if (mousedownFlag) {
                    cell.style.backgroundColor = currentColor;
                    cell.style.borderColor = currentColor;
                }
            });

            //Appends each div to the canvasarea
            canvas.appendChild(cell);
        }
    }
}

//Setup color picker area (palette)
function setupColorPicker() {
    //Grab pickerarea div
    let palette = document.querySelector(".pickerarea");

    //Loop to create divs for each color in COLORS
    for (let i = 0; i < NUM_COLORS; i++) {

        //Create div
        let cell = document.createElement("div");
        cell.className = "pickerdiv";

        //Set div background color to color in COLORS
        cell.style.backgroundColor = COLORS[i];

        //Event listner for when a color is clicked.
        cell.addEventListener("click", function() {
            //When the color is clicked, set the global currentColor variable to the same color as the div's background color
            currentColor = cell.style.backgroundColor;

            //Also change the background color for the div designated to show the current color
            document.querySelector(".selecteddiv").style.backgroundColor = currentColor;
        });

        //Append each color div to the pickerarea
        palette.appendChild(cell);
    }
}

//Setup clear button + selectedColor indicator
//In the future: might separate these elements from the pickerarea
function setupControlPanel() {
    //Create the selectedColor div
    let footer = document.querySelector(".pickerarea");
    let selectedColor = document.createElement("div");
    selectedColor.className = "selecteddiv";
    selectedColor.style.backgroundColor = currentColor;
    footer.appendChild(selectedColor);

    //Create the clear button
    let clearButton = document.createElement("button");
    let buttonText = document.createTextNode("Clear");
    clearButton.className = "clearbutton";
    clearButton.appendChild(buttonText);
    footer.appendChild(clearButton);
    clearButton.addEventListener("click", function() {
        //First confirm if the user is sure they want to clear the canvas
        if (window.confirm("Are you sure you want to clear??")) {
            let canvasDivs = document.querySelectorAll(".canvasdiv");
            //Loop to reset the canvas divs to white and their borders to lightgray
            for (let i = 0; i < canvasDivs.length; i++) {
                canvasDivs[i].style.backgroundColor = "white";
                canvasDivs[i].style.borderColor = "lightgray"
            }
        }

    });
}

setupCanvas();
setupColorPicker();
setupControlPanel();
