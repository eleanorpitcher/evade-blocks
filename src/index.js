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
        nodeDOM.style.bottom = this.positionY + `vh`
        nodeDOM.style.left = `${this.positionX}vw`

        
        const board = document.getElementById('board')
        board.appendChild(nodeDOM) //this should create our player
        return nodeDOM
    }
}

// class Obstacle {}


const game = new Game()
game.start()