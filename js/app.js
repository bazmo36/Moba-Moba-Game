function init() {

    /*-------------- Constants -------------*/
    const cells = []
    const gridWidth = 10
    const numberOfCells = gridWidth * gridWidth

    /*---------- Variables (state) ---------*/
    let score = 0
    let bestScore = Number(localStorage.getItem('bestScore')) || 0
    let monkeyPosition = 95
    let lives = 3
    let fallingItems
    // let itemType = null
    // let fallingItem = null
    let fallInterval
    let dropSpeed = 250
    let isPaused = false



    /*----- Cached Element References  -----*/
    const startScreen = document.querySelector('#start-screen')
    const gridElem = document.querySelector('.grid')
    const scoreElem = document.querySelector('#score')
    const livesElem = document.querySelector('#lives')
    const gameOverScreen = document.querySelector('#game-over')
    const finalScoreEl = document.querySelector('#final-score')
    const bestScoreEl = document.querySelector('#best-score')

    //buttons
    const startBtn = document.querySelector('#start-btn')
    const leftBtnEl = document.querySelector('#left-btn')
    const rightBtnEl = document.querySelector('#right-btn')
    const playAgainBtn = document.querySelector('#play-again')
    const pauseBtn = document.querySelector('#pause-btn')


    // sounds
    const restartBtn = document.querySelector('#restart-btn')
    const bananaSound = document.querySelector('#banana-sound')
    const rottenSound = document.querySelector('#rotten-sound')
    const goldSound = document.querySelector('#gold-sound')
    const stepSound = document.querySelector('#step-sound')
    const heartSound = document.querySelector('#heart-sound')
    const bombSound = document.querySelector('#bomb-sound')
    const gameOverSound = document.querySelector('#game-over-sound')
    const backgroundSound = document.querySelector('#background-sound')

    /*-------------- Functions -------------*/

    function render() {
        cells.forEach(cell => cell.classList.remove('monkey', 'banana', 'gold', 'rotten', 'bomb', 'heart'))
        cells[monkeyPosition].classList.add('monkey')

        if (fallingItems) {
            fallingItems.forEach(item => {
                cells[item.position].classList.add(item.type)

            })

        }

        // if (fallingItem !== null) {
        //     cells[fallingItem].classList.add(itemType)
        // }

        let hearts = ''
        for (let i = 0; i < lives; i++) {
            hearts += '❤️'
        }
        livesElem.textContent = hearts

        scoreElem.textContent = score

    }

    function createGrid() {
        for (let i = 0; i < numberOfCells; i++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            gridElem.appendChild(cell)
            cells.push(cell)
        }
    }

    function moveMonkey(direction) {
        cells[monkeyPosition].classList.remove('monkey')
        if (direction === 'left' && monkeyPosition % gridWidth !== 0) {
            monkeyPosition--
             stepSound.play()
        } else if (direction === 'right' && monkeyPosition % gridWidth !== 9) {
            monkeyPosition++
             stepSound.play()
        }
        render()
    }


    function pickItem() {
        const types = ['banana', 'banana', 'gold', 'rotten', 'bomb', 'bomb']
        if (lives < 3) {
            types.push('heart')
        }

         const type = types[Math.floor(Math.random() * types.length)];
         const position = Math.floor(Math.random() * gridWidth)

        // const randIndex = Math.floor(Math.random() * types.length)
        // itemType = types[randIndex]
        // fallingItems = Math.floor(Math.random() * gridWidth)

        return { position, type }
    }

    // function dropItem() {
    // if (fallingItem !== null && fallingItem < numberOfCells - gridWidth) {
    //     fallingItem += gridWidth
    // } else {
    //     if (fallingItem === monkeyPosition) {
    //         handleCatch(itemType)
    //     }
    //         pickItem()
    //     }
    //     render()
    // }


    function dropItems() {
        for (let i = fallingItems.length - 1; i >= 0; i--) {
            let item = fallingItems[i];

            if (item.position < numberOfCells - gridWidth) {
                item.position += gridWidth
            } else {
                if (item.position === monkeyPosition) {
                    handleCatch(item.type);
                }

                fallingItems.splice( i, 1 )
                fallingItems.push(pickItem())

            }

        }
        render()
    }



    function handleCatch(type) {
        switch (type) {
            case 'banana':
                score += 5
                bananaSound.play()
                break
            case 'gold':
                score += 50
                goldSound.play()
                break
            case 'rotten':
                if (score > 0)
                    score -= 10
                if (score <= 0)
                    score = 0
                rottenSound.play()
                break
            case 'bomb':
                lives--
                bombSound.play()
                break
            case 'heart':
                if (lives < 3) lives++
                heartSound.play()
                break
        }

        if (lives <= 0) {
            gameOver()
        }

        // item speed
        if (score >=1200){
            updateSpeed(55)
        }
        else if (score >=1000){
            updateSpeed(70)
        }
        else if (score >=800){
            updateSpeed(90)
        }
        else if (score >= 600) {
            updateSpeed(110)
        } else if (score >= 500) {
            updateSpeed(150)
        } else if (score >= 300) {
            updateSpeed(190)
        } else if (score >= 200) {
            updateSpeed(220)
        } else {
            updateSpeed(250)
        }

    }

    console.log(dropSpeed)

    function updateSpeed(newSpeed) {
        if (newSpeed !== dropSpeed) {
            dropSpeed = newSpeed
            clearInterval(fallInterval);
            fallInterval = setInterval(dropItems, dropSpeed);
        }
    }

    function updateBestScore() {
        if (score > bestScore) {
            bestScore = score
            localStorage.setItem('bestScore', bestScore)
        }
    }

    function startGame() {
        fallingItems = [pickItem(), pickItem(), pickItem()]
        fallInterval = setInterval(dropItems, dropSpeed)
    }

    function gameOver() {
        clearInterval(fallInterval)
        fallingItems = null
        itemType = null
        render()
        gameOverSound.play()
        updateBestScore()

        finalScoreEl.textContent = score
        bestScoreEl.textContent = bestScore
        gameOverScreen.classList.remove('hidden')
        // gameOverScreen.style.display('flex')
    }


    function resetGame() {
        clearInterval(fallInterval)
        monkeyPosition = 95
        score = 0
        lives = 3
        fallingItems = []
        pickItem()
        startGame()
        // gameOverScreen.style.display('none')
        gameOverScreen.classList.add('hidden')

    }
    // gameOverScreen.classList.add('hidden')
    console.log(gameOverScreen)

    /*----------- Event Listeners ----------*/

    leftBtnEl.addEventListener('click', () => moveMonkey('left'))
    rightBtnEl.addEventListener('click', () => moveMonkey('right'))
    restartBtn.addEventListener('click', resetGame)
    playAgainBtn.addEventListener('click', resetGame)
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            moveMonkey('left')
        } else if (event.key === 'ArrowRight') {
            moveMonkey('right')
        }
    }
    )

    pauseBtn.addEventListener('click', () => {
        if (!isPaused) {
            clearInterval(fallInterval)
            pauseBtn.textContent = 'Resume'
            isPaused = true
        } else {
            startGame()
            pauseBtn.textContent = 'Pause'
            isPaused = false
        }
    })

    startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none'
    startGame();
})

    // init game
    gameOverScreen.classList.add('hidden')
    createGrid()
    pickItem()
    render()
    // startGame()
}


document.addEventListener('DOMContentLoaded', init)