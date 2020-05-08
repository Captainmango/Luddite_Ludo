class Game{
    constructor(player){
        this.player = player;
        this.colours = ["red", "blue", "green", "yellow"];
        this.currentPosition = 44;
        this.step = 49.5;
        this.currentColour = "";
        this.numOfToken = "";
        this.roll = 0;
        this.clicked = false;
        this.currentToken = "";
        this.tokenOut = {red:0, blue:0, green:0, yellow:0};
        this.positions = {
            redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
            bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
            greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
            yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0}
        this.onboard = {
            redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
            bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
            greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
            yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0}
        this.stepsRed = [];
        this.stepsYellow = [];
        this.stepsBlue = [];
        this.stepsGreen = [];
}

    isSharingSpace(){
        let count = 0;
        let toKill = "";
        for (let i = 0; i < game.colours.length; i++) {
            for (let n = 1; n <= 4; n++) {
                let firstPawn = document.getElementById(game.colours[i] + "pawn" + n);
                let secondPawn = document.getElementById(game.currentToken);
                if (firstPawn.style.top == secondPawn.style.top && firstPawn.style.left == secondPawn.style.left && game.currentColour != game.colours[i] && game.currentPosition+num<44) {
                count++;
                toKill = game.colours[i] + "pawn" + n;
                return toKill;
            }
        }
    }
    return false;
    }

    changePlayer = () => {
        if (this.roll != 6){
        let text = document.getElementById('player');
        switch (text.innerText) {
            case "red": text.innerText = text.style.color = "blue"; break;
            case "blue": text.innerText = text.style.color = "yellow"; break;
            case "yellow": text.innerText = text.style.color = "green"; break;
            case "green": text.innerText = text.style.color = "red"; break;
        }
        }
        let message = document.getElementById('message');
        message.innerText = "";
        let dice = document.getElementById('dice');
        dice.style.backgroundImage = "";
    }

    dontHaveOtherFree() {
        let text = document.getElementById('player');
        for (var i = 1; i <=4; i++) {
            if (this.onboard[text.innerText + "pawn" + i] == 1 || this.positions[text.innerText + "pawn" + i] + this.roll >= 44) return false;
        }
        return true;
    }

    CheckForWinner() {
        if (this.tokenOut[this.currentColour] == 4) {
            let dice = document.getElementById("dice");
            let player = document.getElementById("player");
            let message = document.getElementById("message");
            dice.innerText = "";
            dice.style.visibility = "hidden";
            message.innerText = "";
            player.innerText = "The Winner is the "+ this.currentColour +" player";
        }
    }

    stepDown() {
        let doc = document.getElementById(this.currentToken);
        let space = Number(doc.style.top.replace(/[a-z]/g, ''));
        doc.style.top = (space + step)+'px';
        this.currentPosition++;
    }
    stepUp() {
        let doc = document.getElementById(this.currentToken);
        let space = Number(doc.style.top.replace(/[a-z]/g, ''));
        doc.style.top = (space - step) + 'px';
        this.currentPosition++;
    }
    stepLeft() {
        let doc = document.getElementById(this.currentToken);
        let space = Number(doc.style.left.replace(/[a-z]/g, ''));
        doc.style.left = (space - step) + 'px';
        this.currentPosition++;
    }
    stepRight() {
        let doc = document.getElementById(this.currentToken);
        let space = Number(doc.style.left.replace(/[a-z]/g, ''));
        doc.style.left = (space + step) + 'px';
        this.currentPosition++;
    }


    pushSteps(value, steps, count) {
        for (let i = 0; i < count; i++) steps.push(value);
    }

    //Red tokens path
    makeRedRoute(){
        this.pushSteps(this.stepDown, this.stepsRed, 4);
        this.pushSteps(this.stepRight, this.stepsRed, 4);
        this.pushSteps(this.stepDown, this.stepsRed, 2);
        this.pushSteps(this.stepLeft, this.stepsRed, 4);
        this.pushSteps(this.stepDown, this.stepsRed, 4);
        this.pushSteps(this.stepLeft, this.stepsRed, 2);
        this.pushSteps(this.stepUp, this.stepsRed, 4);
        this.pushSteps(this.stepLeft, this.stepsRed, 4);
        this.pushSteps(this.stepUp, this.stepsRed, 2);
        this.pushSteps(this.stepRight, this.stepsRed, 4);
        this.pushSteps(this.stepUp, this.stepsRed, 4);
        this.pushSteps(this.stepRight, this.stepsRed, 1);
        this.pushSteps(this.stepDown, this.stepsRed, 5);
    }

    //Yellow tokens path
    makeYellowRoute(){
        this.pushSteps(this.stepUp, this.stepsYellow, 4);
        this.pushSteps(this.stepLeft, this.stepsYellow, 4);
        this.pushSteps(this.stepUp, this.stepsYellow, 2);
        this.pushSteps(this.stepRight, this.stepsYellow, 4);
        this.pushSteps(this.stepUp, this.stepsYellow, 4);
        this.pushSteps(this.stepRight, this.stepsYellow, 2);
        this.pushSteps(this.stepDown, this.stepsYellow, 4);
        this.pushSteps(this.stepRight, this.stepsYellow, 4);
        this.pushSteps(this.stepDown, this.stepsYellow, 2);
        this.pushSteps(this.stepLeft, this.stepsYellow, 4);
        this.pushSteps(this.stepDown, this.stepsYellow, 4);
        this.pushSteps(this.stepLeft, this.stepsYellow, 1);
        this.pushSteps(this.stepUp, this.stepsYellow, 5);
    }

        //Blue tokens path
    makeBlueRoute(){
        this.pushSteps(this.stepLeft, this.stepsBlue, 4);
        this.pushSteps(this.stepDown, this.stepsBlue, 4);
        this.pushSteps(this.stepLeft, this.stepsBlue, 2);
        this.pushSteps(this.stepUp, this.stepsBlue, 4);
        this.pushSteps(this.stepLeft, this.stepsBlue, 4);
        this.pushSteps(this.stepUp, this.stepsBlue, 2);
        this.pushSteps(this.stepRight, this.stepsBlue, 4);
        this.pushSteps(this.stepUp, this.stepsBlue, 4);
        this.pushSteps(this.stepRight, this.stepsBlue, 2);
        this.pushSteps(this.stepDown, this.stepsBlue, 4);
        this.pushSteps(this.stepRight, this.stepsBlue, 4);
        this.pushSteps(this.stepDown, this.stepsBlue, 1);
        this.pushSteps(this.stepLeft, this.stepsBlue, 5);
    }
        //Green tokens path
    makeGreenRoutes(){
        this.pushSteps(this.stepRight, this.stepsGreen, 4);
        this.pushSteps(this.stepUp, this.stepsGreen, 4);
        this.pushSteps(this.stepRight, this.stepsGreen, 2);
        this.pushSteps(this.stepDown, this.stepsGreen, 4);
        this.pushSteps(this.stepRight, this.stepsGreen, 4);
        this.pushSteps(this.stepDown, this.stepsGreen, 2);
        this.pushSteps(this.stepLeft, this.stepsGreen, 4);
        this.pushSteps(this.stepDown, this.stepsGreen, 4);
        this.pushSteps(this.stepLeft, this.stepsGreen, 2);
        this.pushSteps(this.stepUp, this.stepsGreen, 4);
        this.pushSteps(this.stepLeft, this.stepsGreen, 4);
        this.pushSteps(this.stepUp, this.stepsGreen, 1);
        this.pushSteps(this.stepRight, this.stepsGreen, 5);
    }
    resetToken(victim) {
        this.onboard[victim] = 0;
        this.positions[victim] = 0;
        let pawnToMove = document.getElementById(victim);
        switch (victim) {
            case "redpawn1": pawnToMove.style.top = 310 + "px"; pawnToMove.style.left = 600 + "px"; break;
            case "redpawn2": pawnToMove.style.top = 260 + "px"; pawnToMove.style.left = 553 + "px"; break;
            case "redpawn3": pawnToMove.style.top = 215 + "px"; pawnToMove.style.left = 600 + "px"; break;
            case "redpawn4": pawnToMove.style.top = 260 + "px"; pawnToMove.style.left = 647 + "px"; break;
            case "bluepawn1": pawnToMove.style.top = 563 + "px"; pawnToMove.style.left = 600 + "px"; break;
            case "bluepawn2": pawnToMove.style.top = 609 + "px"; pawnToMove.style.left = 553 + "px"; break;
            case "bluepawn3": pawnToMove.style.top = 657 + "px"; pawnToMove.style.left = 600 + "px"; break;
            case "bluepawn4": pawnToMove.style.top = 609 + "px"; pawnToMove.style.left = 647 + "px"; break;
            case "greenpawn1": pawnToMove.style.top = 310 + "px"; pawnToMove.style.left = 250 + "px"; break;
            case "greenpawn2": pawnToMove.style.top = 215 + "px"; pawnToMove.style.left = 650 + "px"; break;
            case "greenpawn3": pawnToMove.style.top = 260 + "px"; pawnToMove.style.left = 203 + "px"; break;
            case "greenpawn4": pawnToMove.style.top = 260 + "px"; pawnToMove.style.left = 297 + "px"; break;
            case "yellowpawn1": pawnToMove.style.top = 609 + "px"; pawnToMove.style.left = 203 + "px"; break;
            case "yellowpawn2": pawnToMove.style.top = 609 + "px"; pawnToMove.style.left = 297 + "px"; break;
            case "yellowpawn3": pawnToMove.style.top = 563 + "px"; pawnToMove.style.left = 250 + "px"; break;
            case "yellowpawn4": pawnToMove.style.top = 657 + "px"; pawnToMove.style.left = 250 + "px"; break;
    
        }
    }
    
    rolldice() {
        if (!this.clicked) {
            this.roll = Math.floor((Math.random() * 6) + 1);
            let dice = document.getElementById('dice');
            dice.innerHTML = this.roll;
            this.clicked = true;
            console.log(this.roll);
        }
        if (this.roll != 6 && this.dontHaveOtherFree) {
            let message = document.getElementById('message');
            message.innerText = "You are stuck and cannot move";
            window.setTimeout(changePlayer, 1000);
            this.clicked = false;
        }
    }

    selectTokenAndMove(colour, token){
        let text = document.getElementById('player');
        this.numOfToken = token;
        this.currentColour = colour;
        this.currentToken = this.currentColour + "pawn" + this.numOfToken;
        this.currentPosition = this.positions[this.currentToken];
        if (this.roll + this.currentPosition > 44) {
            this.Stuck();
        }
        else {
            if (this.clicked) {
                let position = this.currentPosition;
                if (text.innerText == this.currentColour) {
                    if (this.onboard[this.currentToken] === 1 || this.roll === 6) {
                        if (this.onboard[this.currentToken] === 0) {
                            let doc = document.getElementById(this.currentToken);
                            let space = Number(doc.style.left.replace(/[a-z]/g, ''));
                            switch (colour) {
                                case "red":
                                    doc.style.left = 476 + 'px';
                                    doc.style.top = 189 + "px";
                                    break;

                                case "yellow":
                                    doc.style.left = 375 + 'px';
                                    doc.style.top = 680 + "px";
                                    break;

                                case "blue":
                                    doc.style.left = 672 + 'px';
                                    doc.style.top = 484 + "px";
                                    break;

                                case "green":
                                    doc.style.left = 515 + 'px';
                                    doc.style.top = 326 + "px";
                                    break;
                            }
                            this.onboard[currentToken] = 1;
                        }
                        else {
                            switch (colour) {
                                case "red":
                                    for (i = this.currentPosition; i < position + this.roll; i++) {
                                        this.stepsRed[i]();
                                    }
                                    break;

                                case "yellow":
                                    for (i = this.currentPosition; i < position + this.roll; i++) {
                                        this.stepsYellow[i]();
                                    }
                                    break;

                                case "blue":
                                    for (i = this.currentPosition; i < position + this.roll; i++) {
                                        stepsBlue[i]();
                                    }
                                    break;

                                case "green":
                                    for (i = this.currentPosition; i < position + this.roll; i++) {
                                        stepsGreen[i]();
                                    }
                                    break;
                            }
                            this.positions[this.currentToken] = this.currentPosition;
                            let victim = this.isSharingSpace();
                            if (victim != false) {
                                this.resetToken(victim);
                            }
                            if (this.currentPosition == 44) { this.tokenOut[this.currentColour]++; this.onboard[this.currentToken] = 0; this.positions[this.currentToken] = 0; document.getElementById(this.currentToken).style.visibility = "hidden"; };
                            this.CheckForWinner();
                            this.changePlayer();
                        }
                        this.roll = 0;
                        this.clicked = false;
                        let dice = document.getElementById('dice');
                        dice.style.backgroundImage = "";
                    }
                    else this.Stuck();
                }
            }
        }

    }

    


}

let game = new Game
let diceBtn = document.getElementById("diceBtn");


function startGame(){
    game.player = current_user();
    game.makeBlueRoute();
    game.makeRedRoute();
    game.makeGreenRoutes();
    game.makeYellowRoute();
    playGameBtn.classList.add("disabled");
    
}
diceBtn.addEventListener('click', game.rolldice);


let redTok1 = document.getElementById("redpawn1");
let redTok2 = document.getElementById("redpawn2");
let redTok3 = document.getElementById("redpawn3");
let redTok4 = document.getElementById("redpawn4");

redTok1.addEventListener('click', game.selectTokenAndMove("red",1));
redTok2.addEventListener('click', game.selectTokenAndMove("red",2));
redTok3.addEventListener('click', game.selectTokenAndMove("red",3));
redTok4.addEventListener('click', game.selectTokenAndMove("red",4));

let blueTok1 = document.getElementById("bluepawn1");
let blueTok2 = document.getElementById("bluepawn2");
let blueTok3 = document.getElementById("bluepawn3");
let blueTok4 = document.getElementById("bluepawn4");

blueTok1.addEventListener('click', game.selectTokenAndMove("blue",1));
blueTok2.addEventListener('click', game.selectTokenAndMove("blue,2"));
blueTok3.addEventListener('click', game.selectTokenAndMove("blue",3));
blueTok4.addEventListener('click', game.selectTokenAndMove("blue",4));

let greenTok1 = document.getElementById("greenpawn1");
let greenTok2 = document.getElementById("greenpawn2");
let greenTok3 = document.getElementById("greenpawn3");
let greenTok4 = document.getElementById("greenpawn4");

greenTok1.addEventListener('click', game.selectTokenAndMove("green",1));
greenTok2.addEventListener('click', game.selectTokenAndMove("green",2));
greenTok3.addEventListener('click', game.selectTokenAndMove("green",3));
greenTok4.addEventListener('click', game.selectTokenAndMove("green",4));

let yellowTok1 = document.getElementById("yellowpawn1");
let yellowTok2 = document.getElementById("yellowpawn2");
let yellowTok3 = document.getElementById("yellowpawn3");
let yellowTok4 = document.getElementById("yellowpawn4");

yellowTok1.addEventListener('click', game.selectTokenAndMove("yellow",1));
yellowTok2.addEventListener('click', game.selectTokenAndMove("yellow",2));
yellowTok3.addEventListener('click', game.selectTokenAndMove("yellow",3));
yellowTok4.addEventListener('click', game.selectTokenAndMove("yellow",4));


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

