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
        this.positions = {
            redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
            bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
            greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
            yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
        };
        this.onboard = {
            redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
            bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
            greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
            yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0

    }

    isSharingSpace(){
        let count = 0;
        let toKill = "";
        for (let i = 0; i < colours.length; i++) {
            for (let n = 1; n <= 4; n++) {
                let firstPawn = document.getElementById(colours[i] + "pawn" + n);
                let secondPawn = document.getElementById(currentToken);
                if (firstPawn.style.top == secondPawn.style.top && firstPawn.style.left == secondPawn.style.left && currentColour != colours[i] && currentPosition+num<44) {
                count++;
                toKill = colours[i] + "pawn" + n;
                return toKill;
            }
        }
    }
    return false;
    }

    stuck(){
        let text = document.getElementById('player');
        if (onboard[currentToken] == 0 || currentPosition + num > 44) {
            if (DontHaveOtherFree() || currPos + num > 44) {
                let message = document.getElementById('message');
                message.innerText = "You are stuck and cannot move";
                clicked = false;
                let dice = document.getElementById('dice');
                dice.style.backgroundImage = "";
                window.setTimeout(changePlayer(), 1000);
            }
        }
    changePlayer() {
        if (roll != 6){
        let playerColour = document.getElementById('playerColour');
        switch (playerColour.innerText) {
            case "red": text.innerText = text.style.color = "blue"; break;
            case "blue": text.innerText = text.style.color = "yellow"; break;
            case "yellow": text.innerText = text.style.color = "green"; break;
            case "green": text.innerText = text.style.color = "red"; break;
        }
        }
        let message = document.getElementById('message');
        message.innerText = "";
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "";
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

    rollDice(){
        if (!clicked) {
            num = Math.floor((Math.random() * 6) + 1);
            let dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(../Images/" + num + ".jpg)";
            clicked = true;
        }
        if (num != 6&&DontHaveOtherFree()) {
            var bad = document.getElementById('badtext');
            bad.innerText = "Unfortunatlly you stuck";
            window.setTimeout(changePlayer, 1000);
            clicked = false;
        }
    }

    selectToken(colour, token){
        let text = document.getElementById('player');
        numOfToken = token;
        currColour = colour;
        currentToken = currentColour + "pawn" + numOfToken;
        currentPosition = positions[currentToken];
        if (roll + currentPosition > 44) {
            Stuck();
        }
        else {
            if (clicked) {
                let position = currentPosition;
                if (text.innerText == currentColour) {
                    if (onboard[currentToken] === 1 || roll === 6) {
                        if (onboard[currentToken] === 0) {
                            let doc = document.getElementById(currentToken);
                            let curr = Number(doc.style.left.replace(/[a-z]/g, ''));
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
                            onboard[currentToken] = 1;
                        }
                        else {
                            switch (colour) {
                                case "red":
                                    for (i = currPos; i < position + num; i++) {
                                        stepsRed[i]();
                                    }
                                    break;

                                case "yellow":
                                    for (i = currPos; i < position + num; i++) {
                                        stepsYellow[i]();
                                    }
                                    break;

                                case "blue":
                                    for (i = currPos; i < position + num; i++) {
                                        stepsBlue[i]();
                                    }
                                    break;

                                case "green":
                                    for (i = currPos; i < position + num; i++) {
                                        stepsGreen[i]();
                                    }
                                    break;
                            }
                            positions[currpawn] = currPos;
                            var victim = HaveHover();
                            if (victim != false) {
                                ResetPawn(victim);
                            }
                            if (currPos == 44) { pawnOut[currcolor]++; onboard[currpawn] = 0; positions[currpawn] = 0; document.getElementById(currpawn).style.visibility = "hidden"; };
                            CheckForWinner();
                            changePlayer();
                        }
                        num = 0;
                        clicked = false;
                        var dice = document.getElementById('dice');
                        dice.style.backgroundImage = "url(Images/dice.gif)";
                    }
                    else Stuck();
                }
            }
        }

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

