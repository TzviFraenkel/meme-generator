'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
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

function addLine() {
    if (gMeme.lines.length >= 2) return //sopports only two lines by now
    var newLine = {
        txt: '',
        size: 40,
        align: 'center',
        color: 'white',
        font: 'impact',
        offsetY: gCanvas.height-80
    }
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length-1;
}

function moveline(diff) {
    gMeme.selectedLineIdx += diff
    if (gMeme.selectedLineIdx > gMeme.lines.length-1) gMeme.selectedLineIdx = 0;
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = gMeme.lines.length-1;
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