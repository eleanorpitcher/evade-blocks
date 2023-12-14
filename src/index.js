class Game {
    constructor(){
        this.player = null;
    }

    start(){
        this.player = new Player() //creates an instance of the player
        this.attachEventListeners() 
    }

    attachEventListeners(){
        window.addEventListener('keydown', (event) => { //this means that when you press the down button, the event will be console logged
            console.log(event.key) //this is a kind of object, so it will log the type of action, telling us what the user is doing
            const input = event.key // this will tell us what the player is doing
            if (input === "ArrowLeft"){ //checking which key the user is clicking
                this.player.moveLeft()
            } else if(input === "ArrowRight"){
                this.player.moveRight()
            }
        })
    }
}

class Player{ //creating properties to be used in the createPlayer method. This is a blueprint of the player
    constructor(){ //defining the parameters of the player. Just values inside of JS, doesn't mean anything on the screen
        this.width = 10;
        this.height = 5; //this will give a rectangle
        this.positionX = 50; //will control movement on horizonal axis (side to side). 50 will place them in the middle of the screen
        this.positionY = 50; //will control movement on vertical axis (up and down)

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
        this.domElement.style.left = `${this.positionX} vw` //this is how we repaint player on the screen. We need to access the reference to my div which is saved in my DOM element. what is stored in domELement is the actual div that IS my player. so anytime we change this.domElement css we are changing the appearance of my player
    }

    moveLeft(){
        this.positionX -= 1 // if you minus numbers then the player moves more to the left
        this.domElement.style.left = `${this.positionX} vw`
    }
}

// class Obstacle {}


const game = new Game()
game.start()