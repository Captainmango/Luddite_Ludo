class Game{
    constructor(player){
        this.player = player;
        this.colours = ["red", "blue", "green", "yellow"];
        this.currentPosition = 0;
        this.currentColour = "";
        this.numOfToken = "";
        this.roll = 0;
        this.clicked = false;
        this.currentToken = "";
        this.tokenOut = {red:0, blue:0, green:0, yellow:0};

    }

    rollDice(){
        
    }

    selectToken(){
        

    }

    gameTurn(){
        this.turns++
        let colour = selectColour(turnCounter);
        let roll = rollDice();
        let token = selectToken();
        moveToken();
        let nu_turn = new Turn(colour, token, roll);
        if(this.turnCounter >= 4){
            this.turnCounter=0
        } else {
            this.turnCounter++
        }

    }

    gameWon(){
        //if token is in win zone end game with confirm to replay
    }

    gameStart(){
        //start the game by rolling dice. Red always goes first.

    }

    static getLastGame(){
        // the turns for the last game
    }

    static replayGame(){
        // game using gameplay loop
    }



}

class Turn {
    constructor(colour, token, roll){
        this.colour = colour;
        this.token = token;
        this.roll = roll;
    }
    submitTurn(){
       let formData = {colour: this.colour,
            token: this.token,
            roll: this.roll}
        console.log(formData);

    }
}

