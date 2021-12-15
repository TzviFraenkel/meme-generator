'use strict'

var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d')


function renderMeme() {
    var meme = getMeme();
    var selectedLine = meme.lines[meme.selectedLineIdx];
    var img = document.querySelector(`.img${meme.selectedImgId}`);
    gCtx.drawImage(img, 0, 0)
    //render lines:
    meme.lines.forEach((line) => {
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.fillText(line.txt, 10, 50)
    })
}

function onTxtChange(txt) {
    setLineTxt(txt);
    renderMeme()
}

function onChangeColor(color) {
    setNewColor(color);
    renderMeme()
}

function onChangeSize(arg) {
    if (arg.dataset.sign === '+') changeSize(2);
    if (arg.dataset.sign === '-') changeSize(-2);
    renderMeme();
}

function onAddLine() {
    addLine();
}