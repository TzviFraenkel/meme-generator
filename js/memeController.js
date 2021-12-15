'use strict'

var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d')


function renderMeme(id) {
    var img = document.querySelector(`.img${id}`);
    gCtx.drawImage(img, 0, 0)
}

function loadImages(){
    let imgs = getImages();
    var strHTML = imgs.map(img => 
        `<img src="${img.url}" onclick="imgClicked(${img.id})" class="img${img.id}"></img>`
    )

    document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function imgClicked(id) {
    document.querySelector('.gallery').style = 'display: none;'
    document.querySelector('.meme-editor').style = 'display: block;'
    renderMeme(id)
}