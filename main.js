const nav = document.querySelector(".nav");
const canvas = document.querySelector(".canvas");

let array = [];

const ctx = canvas.getContext('2d');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let size = 5;
let startX;
let startY;
let endX;
let endY;

if(localStorage.getItem("drawings") !== null){
    let tmp = JSON.parse(localStorage.getItem("drawings"));
    for(let i = 0; i < tmp.length; i++){
        array.push(tmp[i]);
    }
}
var height = document.querySelector(".nav").getBoundingClientRect().height;

nav.addEventListener("click", e => {
    if (e.target.id === "clear") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

const lcolor = document.getElementById("color");
if(localStorage.getItem("color") !== null) {
    lcolor.value = JSON.parse(localStorage.getItem("color")); 
    ctx.strokeStyle = JSON.parse(localStorage.getItem("color"));
}

nav.addEventListener("change", e => {
    if(e.target.id === "color") {
        ctx.strokeStyle = e.target.value;
        localStorage.setItem("color", JSON.stringify(e.target.value));
    }

    if(e.target.id === "size") {
        size = e.target.value;
    }
    
});

const draw = (e) => {

        if(!isPainting) {
            return;
        }
        if(boolRect) {
            ctx.lineWidth = size;
            ctx.lineCap = 'round';
            return;
        }

        ctx.lineWidth = size;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - height);
        ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX - canvasOffsetX;
    startY = e.clientY - height;
});

canvas.addEventListener('mouseup', (e) => {
    isPainting = false;
    if(boolRect){
        endX = e.clientX - canvasOffsetX;
        endY = e.clientY - height;
        ctx.rect(startX, startY, endX - startX, endY - startY);
        ctx.stroke();
    }
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

//LOCAL STORAGE, SAVE, LOAD ...
const save = document.querySelector(".save");
save.addEventListener("click", () => {
    array.push(canvas.toDataURL("image/png"));
    localStorage.setItem("drawings", JSON.stringify(array));
});

const cislo = document.getElementById("cislo");
const load = document.querySelector(".load");
load.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let img = new Image();
    let c = cislo.value - 1;
    img.src = array[c];
    ctx.drawImage(img, 0, 0);
});

const clearButtonLocalStorage = document.querySelector(".clearLocalStorage");
clearButtonLocalStorage.addEventListener("click", () => {
    localStorage.clear();
    array.length = 0;
});
//LOCAL STORAGE, SAVE, LOAD ...

let boolRect = false;
const drawRect = document.querySelector(".rect");
drawRect.addEventListener("click", () => {
    if(boolRect){
        boolRect = false;
    }
    else{
        boolRect = true;
        drawRect.style.cursor = "crosshair";
    }
})
