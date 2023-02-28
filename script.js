window.addEventListener("load", init)

let max = 999
let numbersToPlace = 10
let number = 0
let html = ''
let selectedNumber
let placedNumbers = new Array(numbersToPlace + 1)
let win
let loss

function ID(elem) {
    return document.getElementById(elem);
}

function CLASS(elem) {
    return document.getElementsByClassName(elem);
}

function QS(elem) {
    return document.querySelectorAll(elem);
}

function init() {
    html = ''
    ID('start').addEventListener('click', onStart)
    ID('new').addEventListener('click', onNew)
    number = 0
    ID('win').style.display = 'none'
    ID('lose').style.display = 'none'
    placeDefaultNumber()

    /* for (let index = 5; index <= 20; index += 5) {
        html = html += `<button id="btn${index}">${index}</button>`

    }
    ID('setButtons').innerHTML = html

    for (let index = 5; index <= 20; index += 5) {
        ID(`btn${index}`).addEventListener('click', function () {
            numbersToPlace = index
        })

    } */
}

function generateNumber() {
    number = Math.floor(Math.random() * max) + 1;
    //number++
    placeDefaultNumber()
}

function onStart() {
    console.log('started game');
    ID('start').style.display = "none"
    ID('new').style.display = "block"
    generateNumber()
    createBoard()

}

function onNew() {
    win = true
    loss = false
    console.log('new game');
    ID('start').style.display = "block"
    ID('new').style.display = "none"
    number = 0
    html = ''
    ID('number').innerHTML = number;
    ID('board').innerHTML = html
    ID('win').style.display = 'none'
    ID('lose').style.display = 'none'
    placedNumbers = new Array(numbersToPlace + 1)

}

function placeDefaultNumber() {
    ID('number').innerHTML = number;
}

function onPlaceNumber(event) {
    let currentNumber = event.target.id
    ID(currentNumber).removeEventListener('click', onPlaceNumber)
    ID(currentNumber).style.cursor = 'default'
    ID(`p${currentNumber}`).innerHTML = number
    checkForWinOrLoss(currentNumber)
    generateNumber()


}

function createBoard() {
    html = `<div id="numbers"></div><div id="placedNumbers"></div>`
    ID('board').innerHTML = html
    html = ''
    for (let index = 1; index < numbersToPlace + 1; index++) {
        html = html + `<p id="${index - 1}">${index}</p>`

    }
    ID('numbers').innerHTML = html
    html = ''
    for (let index = 1; index < numbersToPlace + 1; index++) {
        html = html + `<p id="p${index - 1}">?</p>`

    }
    ID('placedNumbers').innerHTML = html

    for (let index = 0; index < numbersToPlace; index++) {
        ID(index).addEventListener('click', onPlaceNumber)
    }
}

function checkForWinOrLoss(indexToChange) {
    let i = parseInt(indexToChange)
    placedNumbers[i] = number
    let win = true
    let loss = false
    /* console.log(indexToChange);
    console.log(typeof parseInt(indexToChange));
    console.log('index: ' + indexToChange);
    console.log('pn index + 1: ' + placedNumbers[indexToChange + 1]); 
    console.log('pn index: ' + placedNumbers[indexToChange]);   */
    /* let i = 0
    while (i < numbersToPlace 
        && placedNumbers[index + 1] >= placedNumbers[index]) 
        {
        i++
    }
 */
    for (let index = 0; index < placedNumbers.length - 1; index++) {
        if (placedNumbers[index] > placedNumbers[index + 1]) {
            loss = true
        }

        if (!placedNumbers[index]) {
            win = false
        }

    }

    if (win && !loss) {
        ID('win').style.display = 'block'
    }

    if (loss) {
        ID('lose').style.display = 'block'
    }

    console.log(win);
    console.log(loss);
    console.log(placedNumbers);
}


