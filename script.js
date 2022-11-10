const pixelCelBoard = document.querySelector("#pixel-board");
const btnChangeSize = document.querySelector("#generate-board");
const btnChangeColors = document.querySelector("#button-random-color");
const colorContainer = document.querySelectorAll(".color");
const colorPalette = document.querySelector("#color-palette")
const btnErase = document.querySelector("#clear-board");
const pixelSize = document.querySelector("#board-size");
let selectedColor;
//Verifica se nenhum valor for colocado no input ao clicar no botão, um `alert` é exibido com o texto: 'Board inválido!'
//colocar em funcoes os elses e ifs 
const validadeInput = () => pixelSize.value.trim().length > 0;

function validateInput(pixelSize) {
    if (pixelSize.value.trim().length === '') {
        alert("Board inválido!")
    } else if (pixelSize.value.trim().length < 5) {
        alert("pequeno demais")
    } else if (pixelSize.value.trim().length > 50) {
        alert("grande demais")
    }
}

//console.warn
function createPixel() {
    let matriz = localStorage.getItem('boardSize')
    if (!matriz) {
        matriz = 5;
    }
    pixelSize.value = matriz
    if (matriz < 5 && matriz >= 1) {
        pixelCelBoard.innerHTML = '';
        matriz = 5;
        let table = [];
        let sizeTable = matriz * matriz;
        for (let index = 0; index < sizeTable; index++) {
            let pixelCel = document.createElement('div');
            pixelCel.setAttribute("class", "pixel");
            pixelCel.style.backgroundColor = getTableColor(index);
            pixelCel.setAttribute('data-index', index)
            pixelCelBoard.appendChild(pixelCel);
            pixelCelBoard.style.gridTemplateColumns = `repeat(${matriz}, 1fr)`
            table.push(getTableColor(index))
        }
        localStorage.setItem('pixelBoard', JSON.stringify(table));
    } else if (matriz >= 50) {
        pixelCelBoard.innerHTML = '';
        matriz = 50;
        let table = [];
        let sizeTable = matriz * matriz;
        for (let index = 0; index < sizeTable; index++) {
            let pixelCel = document.createElement('div');
            pixelCel.setAttribute("class", "pixel");
            pixelCel.style.backgroundColor = 'getTableColor(index)';
            pixelCel.setAttribute('data-index', index)
            pixelCelBoard.appendChild(pixelCel);
            pixelCelBoard.style.gridTemplateColumns = `repeat(${matriz}, 1fr)`
            table.push(getTableColor(index))
        }
        localStorage.setItem('pixelBoard', JSON.stringify(table));
    } else if (matriz == 0) {
        alert("Board inválido!")
    } else {
        pixelCelBoard.innerHTML = '';
        let table = [];
        let sizeTable = matriz * matriz;
        for (let index = 0; index < sizeTable; index++) {
            let pixelCel = document.createElement('div');
            pixelCel.setAttribute("class", "pixel");
            pixelCel.style.backgroundColor = 'white' //getTableColor(index);
            pixelCel.setAttribute('data-index', index)
            pixelCelBoard.appendChild(pixelCel);
            pixelCelBoard.style.gridTemplateColumns = `repeat(${matriz}, 1fr)`
            pixelCelBoard.style.width = `${matriz*40}px`;
            pixelCelBoard.style.height = `${matriz*40}px`;
            table.push(getTableColor(index))
        }
        localStorage.setItem('pixelBoard', JSON.stringify(table));
    }
}

function getTable() {
    if (localStorage.getItem('pixelBoard')) {
        return JSON.parse(localStorage.getItem('pixelBoard'));
    } else {
        return [];
    }
}

function getTableColor(index) {
    let table = getTable();
    if (table.length) {
        return table[index];
    }
    return 'white';
}

function changeColors() {
    let pallette = [];
    for (let index = 0; index < colorContainer.length; index++) {
        let arrayColors = [];
        const cores = 3;
        for (let index2 = 0; index2 < cores; index2++) {
            arrayColors.push(Math.floor(Math.random() * 254));
        }
        // if (index == 0) {
        //     arrayColors = [0, 0, 0]
        // }
        
        pallette.push(arrayColors)
        colorContainer[index].style.backgroundColor = `rgb(${arrayColors})`
        localStorage.setItem(`colors-${index}`, JSON.stringify(arrayColors))
        colorContainer[0].classList.add('selected')
        localStorage.setItem('colorPalette', JSON.stringify(pallette));
    }
    location.reload(); //recharge the page again to do the function again, in this case, the one to change the body color 
}

const eraseColors = () => {
    btnErase.addEventListener('click', () => {
        const divPixel = document.querySelectorAll(".pixel")
        for (let index = 0; index < divPixel.length; index++) {
            divPixel[index].style.backgroundColor = 'white'
            saveColor(index, 'white');
        }
    })
}

function colorSelector(event) {
    for (let index = 0; index < colorContainer.length; index++) {
        colorContainer[index].classList.remove('selected');
    }
    event.target.classList.toggle('selected')
    selectedColor = event.target.style.backgroundColor
}

function changePixelColor(event) {
    event.target.style.backgroundColor = selectedColor;
    saveColor(event.target.dataset.index, selectedColor);
}

function saveColor(index, color) {
    let table = getTable();
    table[index] = color;
    localStorage.setItem('pixelBoard', JSON.stringify(table));
}

function reloadColors() {
    for (let index = 0; index < colorContainer.length; index++) {
        let arrayColors = JSON.parse(localStorage.getItem(`colors-${index}`));
        colorContainer[index].style.backgroundColor = `rgb(${arrayColors})`
    }
    colorContainer[0].classList.add('selected')
    if (!localStorage.getItem('colors-0')) {
        changeColors();
    }
}

function btnCreatePixel() {
    localStorage.setItem('boardSize', pixelSize.value);
    createPixel();
}

function changingBackgroundBodyColor() {
    document.body.style.background =
        "linear-gradient(to bottom right, "
        + colorContainer[0].style.backgroundColor
        + ", "
        + colorContainer[1].style.backgroundColor
        + ", "
        + colorContainer[2].style.backgroundColor
        + ", "
        + colorContainer[3].style.backgroundColor
        + ", "
        + colorContainer[4].style.backgroundColor
        + ", "
        + colorContainer[5].style.backgroundColor
        + ", "
        + colorContainer[6].style.backgroundColor
        + ", "
        + colorContainer[7].style.backgroundColor
        + ")";
}
window.onload = function () {
    changingBackgroundBodyColor();

}
createPixel();
eraseColors();
colorPalette.addEventListener('click', colorSelector)
pixelCelBoard.addEventListener('click', changePixelColor);
btnChangeColors.addEventListener('click', changeColors);
btnChangeSize.addEventListener('click', btnCreatePixel);
reloadColors();
selectedColor = colorContainer[0].style.backgroundColor;