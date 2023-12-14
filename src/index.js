class Game {
    constructor(){
        this.player = null;
    }

    start(){
        this.player = new Player()
    }
}

class Player{ //creating properties to be used in the createPlayer method
    constructor(){
        this.width = 10;
        this.height = 5; //this will give a rectangle
        this.positionX = 50; //will control movement on horizonal axis (side to side). 50 will place them in the middle of the screen
        this.positionY = 0; //will control movement on vertical axis (up and down)

        this.domElement = this.createPlayer(); //idea is that we will create a div for my player and will save that div in this element in the DOM, so we can access it easier later on. this.domElement will be where we store the div that is my player that will be displayed in the html file
    }

    createPlayer(){
        const nodeDOM = document.createElement('div') //this creates a div and references our player
        nodeDOM.id = 'player' //gives the player an ID
        nodeDOM.style = `${this.width}vw`
        nodeDOM.style.height = `${this.height}vh`
        nodeDOM.style.bottom = this.positionY + `vh` //vh is the viewer height, the vertical space of our screen, it doesn't count the elements of browser
        nodeDOM.style.left = `${this.positionX}vw`

        
        const board = document.getElementById('board')
        board.appendChild(nodeDOM) //this should create our player
        console.log(nodeDOM.getBoundingClientRect()) // gives us a list of properties, helps us with collisions
        return nodeDOM
    }

    moveRight(){ //repaint player on screen, we are moving AWAY from the left
        this.positionX += 1 //you can also use ++ to move right
        this.domElement.style.left = this.positionX 'vw' //this is how we repaint player on the screen. We need to access the reference to my div which is saved in my DOM element. what is stored in domELement is the actual div that IS my player. so anytime we change this.domElement css we are changing the appearance of my player
    }

    moveLeft(){
        this.positionX -= 1
        this.domElement.style.left = this.positionX 'vw'
    }
}

// class Obstacle {}


const game = new Game()
game.start()