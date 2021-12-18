'use strict'

var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d')

var renderForDownload = false;


function renderMeme() {
    var meme = getMeme();
    // render image:
    var img = document.querySelector(`.img${meme.selectedImgId}`);
    gCtx.drawImage(img, 0, 0)
    //render lines:
    meme.lines.forEach((line, index) => {
        gCtx.textAlign = line.align;
        var align = gCanvas.width / 2;
        if (line.align === 'right') align = gCanvas.width - 10;
        if (line.align === 'left') align = 10;
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillText(line.txt, align, line.offsetY)
        if (line.stroke) {
            gCtx.lineWidth = 2;
            gCtx.strokeText(line.txt, align, line.offsetY)
        }
        if (index === meme.selectedLineIdx && !renderForDownload) {
            drowrect(line, align);
        }

    })
}

function drowrect(line, align) {
    gCtx.fillStyle = '#d3cdcd5d';
    var textWidth = gCtx.measureText(line.txt).width;
    if (line.align === 'left') {
        gCtx.fillRect(align - 5, line.offsetY - line.size, textWidth + 10, line.size + 10)
    }
    if (line.align === 'right') {
        gCtx.fillRect(align - textWidth - 5, line.offsetY - line.size, textWidth + 10, line.size + 10)
    }
    if (line.align === 'center') {
        gCtx.fillRect(align - (textWidth/2) - 5, line.offsetY - line.size, textWidth + 10, line.size + 10)
    }
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

function onToggleStroke() {
    toggleStroke()
    renderMeme();
}

function onAlignChange(arg) {
    var align = arg.dataset.align;
    alignChange(align);
    renderMeme();
}

function onChangeFont(font) {
    changeFont(font);
    renderMeme();
}

function onAddLine() {
    addLine();
    setLinesData();
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    setLinesData()
    renderMeme();
}

function onLineSlect(diff) {
    selectLine(diff);
    setLinesData()
    renderMeme();
}

function setLinesData() {
    var line = getLine();
    var elTxtInput = document.querySelector('.text-input');
    elTxtInput.value = line.txt;
    elTxtInput.focus();
    document.querySelector('.input-font').value = line.font;
}

function onMoveline(diff) {
    moveline(diff * 10);
    renderMeme();
}

function getCanvasHeight() {
    return gCanvas.height
}

function onGalleryChoice() {
    document.querySelector('.gallery').style = 'display: grid;'
    document.querySelector('.meme-editor').style = 'display: none;'
}

function downloadImg(elLink) {
    renderForDownload = true;
    renderMeme()

    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
    
    renderForDownload = false;
    renderMeme()
}