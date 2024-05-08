
const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

var height = 6;
var width = 5;
var row = 0;
var col = 0;
var GameOver = false
var equationPool = [
    "8*7-47=9",
    "8*7-49=7",
    "9*20=180",
    "100/5=20",
    "50+49=99",
    "2*5+4=14"
];



function randomeqchoose() {
   
    var randomIndex = Math.floor(Math.random() * equationPool.length);

    return equationPool[randomIndex];
}



const wordAle = randomeqchoose()

const keys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '+',
    '-',
    '*',
    '/',
    '=',
    'ENTER',
    'DEL',
]
const guessRows = [
    ['', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '',],
]
let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})


keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => {
    console.log('clicked', letter)
    if (letter === 'DEL') {
        deleteLetter()
        console.log('guessRows', guessRows)
        return
    }
    if (letter === 'ENTER') {
        checkRow()
        console.log('guessRows', guessRows)
        return
    }
    addLetter(letter)
    console.log('guessRows', guessRows)
}

const addLetter = (letter) => {
    if (currentTile < 8 && currentRow < 9) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    parts = guess.split("=")
    leftside = parts[0]
    rightside = parts[1]
    resultleft = eval(leftside)
    resultright = eval(rightside)
    if(resultleft==resultright){
        if (currentTile == 8) {
            console.log('guess is ' + guess, 'wordAle is ' + wordAle)
            flipTile()
            if (wordAle === guess) {
                showMessage('Congrats,You Won :)')
                isGameOver = true
                return
            } else {
                if (currentRow >= 5) {
                    isGameOver = false
                    showMessage('Ups, Your predictions was not true :(')
                    showMessage('The Equation was "6*9/3=18"')
                    return
            }
                if (currentRow < 5) {
                    currentRow++
                    currentTile = 0
            }
        }
    }
}else{
    showMessage("This equation does not valid")
}
}




const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 5000)
}

const addColorKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordAle = wordAle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'black-overlay' })
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordAle[index]) {
            guess.color = 'green-overlay'
            checkWordAle = checkWordAle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordAle.includes(guess.letter)) {
            guess.color = 'purple-overlay'
            checkWordAle = checkWordAle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}

userEffect(() => {
    setWordOfTheDay(getWordOfTheDay());
}, []);

function reward(){
    document.getElementById('respuesta').style.display = 'block';

}


