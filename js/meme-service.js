'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
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
            txt: 'I sometimes eat Falafel',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            stroke: true,
            offsetY: 50
        }
    ]
}

function chooseImage(id) {
    gMeme.selectedImgId = id;
}

function setLineTxt(txt) {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].txt = txt;
}

function setNewColor(color) {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].color = color;
}

function changeSize(size) {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].size += size;
}

function alignChange(align) {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].align = align;
}

function changeFont(font) {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].font = font;
}

function toggleStroke() {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].stroke = !gMeme.lines[lineIdx].stroke;
}
function moveline(diff) {
    var lineIdx = gMeme.selectedLineIdx;
    if (gMeme.lines[lineIdx].offsetY + diff - gMeme.lines[lineIdx].size < 0
        || gMeme.lines[lineIdx].offsetY + diff > getCanvasHeight()) return; //for now a bug because canvas is bigger then picture
    gMeme.lines[lineIdx].offsetY += diff;
}

function addLine() {
    if (gMeme.lines.length >= 2) return //sopports only two lines by now
    var newLine = {
        txt: '',
        size: 40,
        align: 'center',
        color: 'white',
        font: 'impact',
        stroke: true,
        offsetY: gCanvas.height - 40
    }
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine() {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
}

function selectLine(diff) {
    gMeme.selectedLineIdx += diff
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = gMeme.lines.length - 1;
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