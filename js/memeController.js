'use strict'

var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d')

var renderForDownload = false;

function addListeners() {
    // addMouseListeners();
    // addTouchListeners();
}

function renderMeme() {
    var meme = getMeme();
    // render image:
    var img = document.querySelector(`.img${meme.selectedImgId}`);
    gCtx.drawImage(img, 0, 0)
    //render lines:
    meme.lines.forEach((line, index) => {
        gCtx.textAlign = line.offsetX;
        var offsetX = gCanvas.width / 2;
        if (line.offsetX === 'right') offsetX = gCanvas.width - 10;
        if (line.offsetX === 'left') offsetX = 10;
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillText(line.txt, offsetX, line.offsetY)
        if (line.stroke) {
            gCtx.lineWidth = 2;
            gCtx.strokeText(line.txt, offsetX, line.offsetY)
        }
        if (index === meme.selectedLineIdx && !renderForDownload) {
            drowrect(line, offsetX);
        }

    })
}

function drowrect(line, offsetX) {
    gCtx.fillStyle = '#d3cdcd5d';
    var textWidth = gCtx.measureText(line.txt).width;
    if (line.offsetX === 'left') {
        gCtx.fillRect(offsetX - 5, line.offsetY - line.size, textWidth + 10, line.size + 10)
    }
    if (line.offsetX === 'right') {
        gCtx.fillRect(offsetX - textWidth - 5, line.offsetY - line.size, textWidth + 10, line.size + 10)
    }
    if (line.offsetX === 'center') {
        gCtx.fillRect(offsetX - (textWidth / 2) - 5, line.offsetY - line.size, textWidth + 10, line.size + 10)
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

function onLineSlect() {
    selectLine();
    setLinesData()
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
    if (!isCircleClicked(pos)) return
    setCircleDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const circle = getCircle();
    if (!circle.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveCircle(dx, dy)
    gStartPos = pos
    renderCanvas()

}

function onUp() {
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
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