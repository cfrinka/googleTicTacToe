// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// Game Constants 

const xSymbol = '×';
const oSymbol = '○';

// Game Variables

let gameIsLive = true;
let xIsNext = true;


//functions

const letterToSymbol = (letter) => letter === 'X' ? xSymbol : oSymbol
const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === 'X') {
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`
    } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!`
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1]
    const topMiddle = cellDivs[1].classList[1]
    const topRight = cellDivs[2].classList[1]
    const middleLeft = cellDivs[3].classList[1]
    const middleMiddle = cellDivs[4].classList[1]
    const middleRight = cellDivs[5].classList[1]
    const bottomLeft = cellDivs[6].classList[1]
    const bottomMiddle = cellDivs[7].classList[1]
    const bottomRight = cellDivs[8].classList[1]

    //check horizontal winner
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft)
        cellDivs[0].classList.add('won')
        cellDivs[1].classList.add('won')
        cellDivs[2].classList.add('won')
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft)
        cellDivs[3].classList.add('won')
        cellDivs[4].classList.add('won')
        cellDivs[5].classList.add('won')
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomMiddle === bottomRight) {
        handleWin(bottomLeft)
        cellDivs[6].classList.add('won')
        cellDivs[7].classList.add('won')
        cellDivs[8].classList.add('won')
    }
    // check vertical winner     
    else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft)
        cellDivs[0].classList.add('won')
        cellDivs[3].classList.add('won')
        cellDivs[6].classList.add('won')
    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle)
        cellDivs[1].classList.add('won')
        cellDivs[4].classList.add('won')
        cellDivs[7].classList.add('won')
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight)
        cellDivs[2].classList.add('won')
        cellDivs[5].classList.add('won')
        cellDivs[8].classList.add('won')
    }
    // check diagonal winner
    else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft)
        cellDivs[0].classList.add('won')
        cellDivs[4].classList.add('won')
        cellDivs[8].classList.add('won')
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight)
        cellDivs[2].classList.add('won')
        cellDivs[4].classList.add('won')
        cellDivs[6].classList.add('won')
    }
    // check draw
    else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is a draw!'
    } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            statusDiv.innerHTML = `${xSymbol} is next!`
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} is next! </span>`
        }
    }

};


// event handlers
const handleReset = (e) => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next!`
    gameIsLive = true
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('X');
        cellDiv.classList.remove('O');
        cellDiv.classList.remove('won')

    }
}

const handleCellClick = (e) => {
    const classList = e.target.classList


    if (!gameIsLive || classList[1] === 'X' || classList[1] === 'O') {
        return
    }

    if (xIsNext) {
        classList.add('X')
        checkGameStatus()

    } else {
        classList.add('O')
        checkGameStatus()

    }
}


// event listeners
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
}
