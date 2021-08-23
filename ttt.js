const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const win_comb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMess = document.querySelector('[data-winning-mess-text]')
const winMessElement = document.getElementById('winningmess')
const restartButton = document.getElementById('restartButton')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function getRandomInt(num) 
{
    return Math.floor(Math.random() * num);
}

function startGame() {
    if (getRandomInt(4) === 0 || getRandomInt(4) === 1) {
        circleTurn = false
        alert("X's Turn")
        //console.log(getRandomInt(4))
    }

    else {
        circleTurn = true
        alert("O's Turn")
        //console.log(getRandomInt(4))
    }

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winMessElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {
        swapTurns()

        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winMess.innerText = 'Draw'
    }
    else {
        winMess.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winMessElement.classList.add('show')
}


function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass)
{
    return win_comb.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}