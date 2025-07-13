function init() {

    /*-------------- Constants -------------*/
    const cells = []
    const gridWidth = 10
    const numberOfCells = gridWidth * gridWidth

    /*---------- Variables (state) ---------*/
    let score = 0
    // let highscore = 0
    let monkeyPosition = 95
    let lives = 3
    let itemType = null
    let fallingItem = null
    let fallInterval



    /*----- Cached Element References  -----*/
    const gridElem = document.querySelector('.grid')
    const scoreElem = document.querySelector('#score')
    const livesElem = document.querySelector('#lives')
    const leftBtnEl = document.querySelector('#left-btn')
    const rightBtnEl = document.querySelector('#right-btn')
    // const highScoreEl = document.querySelector('#hi-score')
    const restartBtn = document.querySelector('#restart-btn')

    /*-------------- Functions -------------*/

    function render() {
        cells.forEach(cell => cell.classList.remove('monkey', 'banana', 'golden', 'rotten', 'bomb'))
        cells[monkeyPosition].classList.add('monkey')
        if (fallingItem !== null) {
            cells[fallingItem].classList.add(itemType)
        }

        let hearts = '';
        for (let i = 0; i < lives; i++) {
            hearts += '❤️';
        }
        livesElem.textContent = hearts;

        scoreElem.textContent = score

    }

    function createGrid() {
        for (let i = 0; i < numberOfCells; i++) {
            const cell = document.createElement('div')
            cell.textContent = i
            cell.classList.add('cell');
            gridElem.appendChild(cell);
            cells.push(cell);
        }
    }

    function moveMonkey(direction) {
        cells[monkeyPosition].classList.remove('monkey')
        if (direction === 'left' && monkeyPosition % gridWidth !== 0) {
            monkeyPosition--
        } else if (direction === 'right' && monkeyPosition % gridWidth !== 9) {
            monkeyPosition++
        }
        render()
    }


    function pickItem() {
        const types = ['banana', 'banana', 'golden', 'rotten', 'bomb','bomb']
        if (lives < 3) {
            types.push('heart')}

        const randIndex = Math.floor(Math.random() * types.length)
        itemType = types[randIndex]
        fallingItem = Math.floor(Math.random() * gridWidth)


    }

    function dropItem() {
        if (fallingItem !== null && fallingItem < numberOfCells - gridWidth) {
            fallingItem += gridWidth
        } else {
            if (fallingItem === monkeyPosition) {
                handleCatch(itemType)
            }
            pickItem()
        }
        render()
    }

    function handleCatch(type) {
        switch (type) {
            case 'banana':
                score += 5
                break
            case 'golden':
                score += 50
                break
            case 'rotten':
                if (score > 0) 
                    score -= 10
                if (score === 0) 
                    score = 0
                break
            case 'bomb':
                lives--
                break
            case 'heart':
                if (lives < 3) lives++
                break
        }

        if (lives <= 0) {
            gameOver()
        }
    }

    function startGame() {
        pickItem()
        fallInterval = setInterval(dropItem, 400)
    }

    function gameOver() {
        clearInterval(fallInterval)
        fallingItem = null
        itemType = null
        render()
        scoreElem.textContent = `Game Over - Score: ${score}`

    }


    function resetGame() {
        clearInterval(fallInterval)
        monkeyPosition = 95
        score = 0
        lives = 3
        fallingItem = null
        pickItem()
        startGame()
    }

    /*----------- Event Listeners ----------*/

    leftBtnEl.addEventListener('click', () => moveMonkey('left'))
    rightBtnEl.addEventListener('click', () => moveMonkey('right'))
    restartBtn.addEventListener('click', resetGame)

    // init game
    createGrid()
    pickItem()
    render()
    startGame()
}


document.addEventListener('DOMContentLoaded', init)