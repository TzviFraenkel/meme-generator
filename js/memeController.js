'use strict'

var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d')


function renderMeme() {
    var meme = getMeme();
    // var selectedLine = meme.lines[meme.selectedLineIdx];
    var img = document.querySelector(`.img${meme.selectedImgId}`);
    gCtx.drawImage(img, 0, 0)
    //render lines:
    meme.lines.forEach((line) => {
        gCtx.textAlign = line.align;
        var align = gCanvas.width / 2;
        if (line.align === 'right') align = gCanvas.width-10; 
        if (line.align === 'left') align = 10; 
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = line.color;
        gCtx.fillText(line.txt, align, line.offsetY)
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

function onAlignChange(arg) {
    var align = arg.dataset.align;
    alignChange(align);
    renderMeme();
}

function onAddLine() {
    addLine();
    document.querySelector('.text-input').focus();
}

function onMoveline(diff) {
    moveline(diff);    
    var line = getLine();
    var elTxtInput = document.querySelector('.text-input');
    elTxtInput.value = line;
    elTxtInput.focus();
}