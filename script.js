//just for better understanding
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
//scope wide variable to if it is circleTurn now
let circleTurn
//variable contains all cells 
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
//store all the winning combinations in single array
const WINNING_COMBINATIONS =  [
    //in a column
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //in a row
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //in cross line
    [0, 4, 8],
    [2, 4, 6]
]

//message when win occur
const winningMessageTextElement = document.querySelector('[data-wining-message-text]')
//restart button
const restartButton = document.getElementById('Button')


//initial the game
startGame()

//click button to re-start the game
restartButton.addEventListener('click', startGame)






function startGame() {
    circleTurn = false;
    //only triggered at once at per cell
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    //clear the state to restart the game
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    //check who's turn it is
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)    
    //check for win
    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
    
    
    
}

//place symbol based on turn
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

//swap turns after placeMark
function swapTurns() {
    circleTurn = !circleTurn
}

//revoke and apply hover
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    //if circleTurn == true
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

//check if wining
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        //check if the cells are in winning combination
        return combination.every(index => {
            //check the cells' belonging
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        //print message based on circleTurn var
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    //similar implementaion as checkWin
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}