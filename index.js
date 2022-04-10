const grid = document.querySelector('.grid')
const startReset = document.getElementById('startReset')
const scoreBoard = document.getElementById('score')
let lowlyWorm = [2, 1, 0]
const squares = []
let width = 10
let direction = 1
let appleIndex = 99
let score = 0
let interval = 700
let speed = 0.9

    //Display the board and a still snake
function createGrid() {
    
    for(i=0; i < width*width; i++) {
        let square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

function placeApple() {
    appleIndex = Math.floor(Math.random() * (width*width))
    if (squares[appleIndex].classList.contains('worm')) {
        placeApple()
    } else {
        squares[appleIndex].classList.add('apple')
    } 
}  

createGrid()
placeApple()

lowlyWorm.forEach(index => squares[index].classList.add('worm'))
squares[lowlyWorm[0]].classList.add('hat')
squares[lowlyWorm[1]].classList.add('face')

startReset.addEventListener('click', function() {
    lowlyWorm.forEach(index => squares[index].classList.remove('worm'))
    squares[lowlyWorm[0]].classList.remove('hat')
    squares[lowlyWorm[1]].classList.remove('face')
    squares[appleIndex].classList.remove('apple')
    lowlyWorm = [2, 1, 0]
    score = 0
    scoreBoard.innerHTML = " "
    direction = 1
    interval = 700
    placeApple()
    runGame = setInterval(move, interval);
})

    //Make the snake move automatically
function move() {
    // check for collision with the grid walls or itself
    if (
        (lowlyWorm[0] % width === width - 1 &&  direction === width/width) ||
        (lowlyWorm[0] % width === 0 && direction === -width/width) ||
        (lowlyWorm[0] + direction >= width * width && direction === width) ||
        (lowlyWorm[0] + direction <= 0 && direction === -width) ||
        (squares[lowlyWorm[0] + direction].classList.contains('worm')) 
    )   {
        return clearInterval(runGame)
    }

    //use direction to calculate and draw the worm in new position
    tail = lowlyWorm.pop()
    squares[tail].classList.remove('worm')
    squares[lowlyWorm[0]].classList.remove('hat')
    squares[lowlyWorm[1]].classList.remove('face')
    lowlyWorm.unshift(lowlyWorm[0] + direction)
    lowlyWorm.forEach(index => squares[index].classList.add('worm'))
    squares[lowlyWorm[0]].classList.add('hat')
    squares[lowlyWorm[1]].classList.add('face')

 
    //check if worm eats apple    
    if (lowlyWorm[0] === appleIndex) {
        lowlyWorm.push(lowlyWorm[(lowlyWorm.length - 1)] - direction)
        squares[appleIndex].classList.remove('apple')
        clearInterval(runGame)
        interval = interval * speed
        runGame = setInterval(move, interval)
        score++
        scoreBoard.innerHTML = " " + score
        placeApple()
    }
}

move()

let runGame = setInterval(move, interval);

    //Use arrow keys to change the snake’s direction
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight") {        
        direction = width/width
   } else if (event.key === "ArrowDown") {
       direction = width
    } else if (event.key === "ArrowLeft") {
        direction = -width/width
    } else if (event.key === "ArrowUp") {
        direction = -width
    } else {
        alert("Use arrow keys")
    }
})


    
    //Check if snake collides with sides or itself
    
    //Incorporate food and score

    //Wrap up and resources
