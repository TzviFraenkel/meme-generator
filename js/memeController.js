'use strict'

var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d')
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var renderForDownload = false;

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function renderMeme() {
    var meme = getMeme();
    // render image:
    var img = document.querySelector(`.img${meme.selectedImgId}`);
    gCtx.drawImage(img, 0, 0)
    //render lines:
    meme.lines.forEach((line, index) => {
        gCtx.textAlign = 'center';
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillText(line.txt, line.offsetX, line.offsetY)
        if (line.stroke) {
            gCtx.lineWidth = 2;
            gCtx.strokeText(line.txt, line.offsetX, line.offsetY)
        }
        if (index === meme.selectedLineIdx && !renderForDownload) {
            drowrect(line);
        }

    })
}

function drowrect(line) {
    gCtx.fillStyle = '#d3cdcd5d';
    var textWidth = gCtx.measureText(line.txt).width;
    gCtx.fillRect(line.offsetX - (textWidth / 2) - 5, line.offsetY - line.size, textWidth + 10, line.size + 10)
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

function onLineSelect(index) {
    selectLine(index);
    setLinesData();
    renderMeme();
}

function setLinesData() {
    var line = getLine();
    var elTxtInput = document.querySelector('.text-input');
    if (line) {     //when last line removed can't implement
        elTxtInput.value = line.txt;
        elTxtInput.focus();
        document.querySelector('.input-font').value = line.font;
        document.querySelector('.color-input').value = line.color;
    }
}

function onMoveline(diff) {
    moveline(diff * 10);
    renderMeme();
}

function getCanvasHeight() {
    return gCanvas.height;
}
function getCanvasWidth() {
    return gCanvas.width;
}
function getTextWidth() {
    return gCtx.measureText(getLine().txt).width;

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

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true);
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (!getLine().isDrag) return
    const pos = getEvPos(ev)
    moveLinePosition(pos);
    renderMeme();
}

function onUp() {
    setLineDrag(false);
    document.body.style.cursor = 'auto'
}

function isLineClicked(pos) {
    var meme = getMeme();
    for (let i = 0; i < meme.lines.length; i++) {
        var line = meme.lines[i];
        var textWidth = gCtx.measureText(line.txt).width;
        if (pos.x > line.offsetX - (textWidth / 2) - 5 && pos.x < line.offsetX + (textWidth / 2) + 5
            && pos.y > line.offsetY - line.size && pos.y < line.offsetY + 10) {
            onLineSelect(i);
            return true;
        }
    };
    return false;
}
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}