class Game{
    constructor(player, turns, turnCounter){
        this.player = current_user();
        this.turns = 0;
        this.turnCounter = 0;
        this.colours = ["red", "green", "yellow", "blue"]
    }
    selectColour(index){
        return this.colours[index]
    }

    rollDice(){
        return 1 + Math.floor(Math.random()*6)
    }

    selectToken(){
        if()

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
