"use strict"

// Variables (const, let)

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let firstX, firstY, secondX, secondY, form, X, Y;
const inputColor = document.getElementById("chose-color");
const clearAll = document.getElementById("clear-all");
const panel = document.getElementById("panel");
const fillBackground = document.getElementById("fill-background");

// All events

fillBackground.addEventListener("click", fillBackgroundEvent);

panel.addEventListener("click", buttonEvent);

clearAll.addEventListener("click", clearEvent);

canvas.addEventListener("mousedown", MouseDOWNEvent);

canvas.addEventListener("mouseup", MouseUPEvent);

canvas.addEventListener("mouseover", canvasCursorOver);

document.addEventListener("mousemove", () => {
    addMouseColor();
});

canvas.addEventListener("mouseout", canvasCursorOut);

//Function

function fillBackgroundEvent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    canvas.style = "background-color: " + inputColor.value;
}

function canvasCursorOver() {
    document.body.style.cursor = "crosshair";
}

function canvasCursorOut() {
    document.body.style.cursor = "default";

    // Fix bug
    canvas.onmousemove = null;
}

function buttonEvent(e) {
    if(e.target.nodeName === "BUTTON") {
        form = e.target.name;
    }
}

function clearEvent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clear stroke elements 
    ctx.beginPath();
    canvas.style = "background-color: white";
}

function MouseUPEvent(e) {
    // Stop drawing after UP mouse
    canvas.onmousemove = null;

    // For square (second coordinates)
    secondX = e.offsetX,
    secondY = e.offsetY;

    switch(form) {
        case "fill" :
            ctx.fillRect(firstX, firstY, secondX - firstX, secondY - firstY);
            break;
        case "rect" :
            ctx.rect(firstX, firstY, secondX - firstX, secondY - firstY);
            break;  
    };
    
    ctx.stroke();
}

function MouseDOWNEvent(e) {
    // For square (first coordinates)
    firstX = e.offsetX,
    firstY = e.offsetY;

    switch(form) {
        case "little" :
            canvas.onmousemove = e => {
                X = e.offsetX - 3,
                Y = e.offsetY - 3;
                ctx.fillRect(X, Y, 6, 6);
            }
            break;
        case "big" :
            canvas.onmousemove = e => {
                X = e.offsetX - 4,
                Y = e.offsetY - 4;
                ctx.fillRect(X, Y, 8, 8);
            }; 
            break;  
    }
}

function addMouseColor() {
    switch(form) {
        case "rect" :
            ctx.strokeStyle = inputColor.value;   
        default : 
            // For "little", "big" and "fill"
            ctx.fillStyle = inputColor.value;   
    }
}