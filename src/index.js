class Game {
    constructor(){
        this.player = null;
        this.obstacles = [] //we will have multiple obstacles so we can call it as an array, we will iterate through the array and every 60ms we act on an object in the array
    }

    attachEventListeners(){
        window.addEventListener('keydown', (event) => { //this means that when you press the down button, the event will be console logged
            // console.log(event.key) //this is a kind of object, so it will log the type of action, telling us what the user is doing
            const input = event.key // this will tell us what the player is doing
            if (input == "ArrowLeft"){ //checking which key the user is clicking
                this.player.moveLeft()
            } else if (input == "ArrowRight"){
                this.player.moveRight()
            }
        })
    }

    start(){
        this.player = new Player() //creates an instance of the player
        this.attachEventListeners()

        this.createObstacles()
        this.moveObstacles()
    }

    detectCollision(obstacle){ //pass obstacle as an argument. The method is inside of the game class
        const player = this.player.domElement.getBoundingClientRect() //domElement is a property inside of the player that is a reference to the div and then we can call the method (getBounding..)
        const obstacleInstance = obstacle.domElement.getBoundingClientRect() // the obstacle will change over time, which is why we aren't using the this.obstacle. This means we can pass different obstacles. Every obstacle has a DOM element
//these will give me two sets of coordinates

        if (
            player.top < obstacleInstance.bottom &&
            player.left < obstacleInstance.right &&
            player.right > obstacleInstance.left &&
            player.bottom > obstacleInstance.top
        ){
            // this.player.domElement.style.backgroundColor = 'blue'
            clearInterval(this.moveInterval)
            window.alert('You crashed')
            window.location.reload()
        }
    }


    moveObstacles(){ //we want the obstacles to move on their own
        this.moveInterval = setInterval(() => {
            this.obstacles.forEach((obstacle) => {
                obstacle.moveDown()
                this.detectCollision(obstacle)
            })
        }, 60)
    }

    createObstacles(){
        setInterval(() => {
            const obstacle = new Obstacle()
            this.obstacles.push(obstacle) // pushes obstacles to an array that holds all the obstacles in our game

        }, 1000)
    }
}

class Player{ //creating properties to be used in the createPlayer method. This is a blueprint of the player
    constructor(){ //defining the parameters of the player. Just values inside of JS, doesn't mean anything on the screen
        this.width = 10;
        this.height = 5; //this will give a rectangle
        this.positionX = 50; //will control movement on horizonal axis (side to side). 50 will place them in the middle of the screen
        this.positionY = 0; //will control movement on vertical axis (up and down)

        this.domElement = this.createPlayer(); //the value of this.domElement is the return of the create player method. The idea is that we will create a div for my player and will save that div in this element in the DOM, so we can access it easier later on. this.domElement will be where we store the div that is my player that will be displayed in the html file
    }

    createPlayer(){ //takes the parameters and prints it in the screen by creating the player
        const nodeDOM = document.createElement('div') //this creates a div and references our player. We can call this anything, like 'player'
        nodeDOM.id = 'player' //gives the div the ID of player. Basically here we are just creating the div and defining it
        nodeDOM.style.width = `${this.width}vw`
        nodeDOM.style.height = `${this.height}vh`
        nodeDOM.style.bottom = `${this.positionY}vh` //vh is the viewer height, the vertical space of our screen, it doesn't count the elements of browser
        nodeDOM.style.left = `${this.positionX}vw`

        
        const board = document.getElementById('board') //we take the board
        board.appendChild(nodeDOM) //this should create our player as a child of the board
        console.log(nodeDOM.getBoundingClientRect()) // we want to save the reference of the div, so this gives us a list of properties, helps us with collisions
        return nodeDOM
    }

    moveRight(){ //repaint player on screen, we are moving AWAY from the left
        this.positionX += 1 //you can also use ++ to move right. If we add numbers to the left, it moves to the right, and vice versa. Same with bottom, if we add to the bottom it goes up (but that's not relevant for now)
        this.domElement.style.left = `${this.positionX}vw` //this is how we repaint player on the screen. We need to access the reference to my div which is saved in my DOM element. what is stored in domELement is the actual div that IS my player. so anytime we change this.domElement css we are changing the appearance of my player
    }

    moveLeft(){
        this.positionX -= 1 // if you minus numbers then the player moves more to the left
        this.domElement.style.left = `${this.positionX}vw` //updates the visual information that we have to the new position, it updates the value of the variable
    }
}

class Obstacle {
    constructor(){
        this.width = 10;
        this.height = 5; //creating an obstacle that is the same size as the player
        this.positionX = 50;
        this.positionY = 95; //this is so the obstacle starts at the top of the screen

        this.domElement = this.createElement();
    }

    createElement() {
        const obstacleDOM = document.createElement('div') //creating a div and saving it in obstacleDOM
        obstacleDOM.className = 'obstacles' //we need to use a class name instead of an ID because we will have multiple obstacles
        obstacleDOM.style.width = `${this.width}vw`
        obstacleDOM.style.height = `${this.height}vh`
        obstacleDOM.style.left = `${this.positionX}vw`
        obstacleDOM.style.bottom = `${this.positionY}vh`

        const board = document.getElementById('board')
        board.appendChild(obstacleDOM)
        return obstacleDOM
    }

    moveDown(){
        this.positionY -= 1 //moves the div down
        this.domElement.style.bottom = `${this.positionY}vh`
    }
}


const game = new Game()
game.start()