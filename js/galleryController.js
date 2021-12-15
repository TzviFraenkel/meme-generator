'use strict'

function loadImages(){
    let imgs = getImages();
    var strHTML = imgs.map(img => 
        `<img src="${img.url}" onclick="onImgClicked(${img.id})" class="img${img.id}"></img>`
    )
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function onImgClicked(id) {
    document.querySelector('.gallery').style = 'display: none;'
    document.querySelector('.meme-editor').style = 'display: flex;'
    chooseImage(id);
    renderMeme()
}