'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gIsSecondLine = true
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            color: '#ffffff',
            font: 'impact',
            stroke: true,
            isDrag: false,
            offsetX: getCanvasWidth() / 2,
            offsetY: 50
        }
    ]
}

function chooseImage(id) {
    gMeme.selectedImgId = id;
}

function setLineTxt(txt) {
    getLine().txt = txt;
}

function setNewColor(color) {
    getLine().color = color;
}

function changeSize(size) {
    getLine().size += size;
}

function setLineDrag (val) {
    getLine().isDrag = val;
}

function alignChange(align) {
    var line = getLine();
    var canvasWidth = getCanvasWidth();
    var textWidth = getTextWidth();
    if (align === 'center') line.offsetX = canvasWidth / 2;
    if (align === 'right') line.offsetX = canvasWidth - 10 - (textWidth / 2);
    if (align === 'left') line.offsetX = 10 + (textWidth / 2);
}

function changeFont(font) {
    getLine().font = font;
}

function toggleStroke() {
    getLine().stroke = !getLine().stroke;
}
function moveline(diff) {
    if (getLine().offsetY + diff - getLine().size < 0
        || getLine().offsetY + diff > getCanvasHeight()) return; //for now a bug because canvas is bigger then picture
    getLine().offsetY += diff;
}

function moveLinePosition(pos) {
    getLine().offsetX = pos.x;
    getLine().offsetY = pos.y;
}

function addLine() {
    // if (gMeme.lines.length >= 2) return //sopports only two lines by now
    var canvasHeight = getCanvasHeight();
    var lineOffset;
    if (gIsSecondLine) lineOffset = canvasHeight - 40;
    else lineOffset = canvasHeight / 2 - 20;
    var newLine = {
        txt: '',
        size: 40,
        color: '#ffffff',
        font: 'impact',
        stroke: true,
        isDrag: false,
        offsetX: getCanvasWidth() / 2,
        offsetY: lineOffset
    }
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gIsSecondLine = false;
}

function deleteLine() {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
    gMeme.selectedLineIdx = 0;
}

function selectLine(index) {
    if (typeof index === 'number') { // number 0 is still false
        gMeme.selectedLineIdx = index;
    }
    else {
        gMeme.selectedLineIdx += 1
        if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    }
}

function getImages() {
    return gImgs;
}
function getMeme() {
    return gMeme;
}
function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}