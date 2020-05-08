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
        for (let i = 0; i < colours.length; i++) {
            for (let n = 1; n <= 4; n++) {
                let firstPawn = document.getElementById(this.colours[i] + "pawn" + n);
                let secondPawn = document.getElementById(this.currentToken);
                if (firstPawn.style.top == secondPawn.style.top && firstPawn.style.left == secondPawn.style.left && currentColour != colours[i] && currentPosition+num<44) {
                count++;
                toKill = this.colours[i] + "pawn" + n;
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
        let doc = document.getElementById(currentToken);
        let space = Number(doc.style.top.replace(/[a-z]/g, ''));
        doc.style.top = (space + step)+'px';
        this.currentPosition++;
    }
    stepUp() {
        let doc = document.getElementById(currentToken);
        let space = Number(doc.style.top.replace(/[a-z]/g, ''));
        doc.style.top = (space - step) + 'px';
        this.currentPosition++;
    }
    stepLeft() {
        let doc = document.getElementById(currentToken);
        let space = Number(doc.style.left.replace(/[a-z]/g, ''));
        doc.style.left = (space - step) + 'px';
        this.currentPosition++;
    }
    stepRight() {
        let doc = document.getElementById(currentToken);
        let space = Number(doc.style.left.replace(/[a-z]/g, ''));
        doc.style.left = (space + step) + 'px';
        this.currentPosition++;
    }


    pushSteps(value, steps, count) {
        for (i = 0; i < count; i++) steps.push(value);
    }

    //Red tokens path
    makeRedRoute(){
        this.pushSteps(stepDown, stepsRed, 4);
        this.pushSteps(stepRight, stepsRed, 4);
        this.pushSteps(stepDown, stepsRed, 2);
        this.pushSteps(stepLeft, stepsRed, 4);
        this.pushSteps(stepDown, stepsRed, 4);
        this.pushSteps(stepLeft, stepsRed, 2);
        this.pushSteps(stepUp, stepsRed, 4);
        this.pushSteps(stepLeft, stepsRed, 4);
        this.pushSteps(stepUp, stepsRed, 2);
        this.pushSteps(stepRight, stepsRed, 4);
        this.pushSteps(stepUp, stepsRed, 4);
        this.pushSteps(stepRight, stepsRed, 1);
        this.pushSteps(stepDown, stepsRed, 5);
    }

    //Yellow tokens path
    makeYellowRoute(){
        this.pushSteps(stepUp, stepsYellow, 4);
        this.pushSteps(stepLeft, stepsYellow, 4);
        this.pushSteps(stepUp, stepsYellow, 2);
        this.pushSteps(stepRight, stepsYellow, 4);
        this.pushSteps(stepUp, stepsYellow, 4);
        this.pushSteps(stepRight, stepsYellow, 2);
        this.pushSteps(stepDown, stepsYellow, 4);
        this.pushSteps(stepRight, stepsYellow, 4);
        this.pushSteps(stepDown, stepsYellow, 2);
        this.pushSteps(stepLeft, stepsYellow, 4);
        this.pushSteps(stepDown, stepsYellow, 4);
        this.pushSteps(stepLeft, stepsYellow, 1);
        this.pushSteps(stepUp, stepsYellow, 5);
    }

        //Blue tokens path
    makeBlueRoute(){
        this.pushSteps(stepLeft, stepsBlue, 4);
        this.pushSteps(stepDown, stepsBlue, 4);
        this.pushSteps(stepLeft, stepsBlue, 2);
        this.pushSteps(stepUp, stepsBlue, 4);
        this.pushSteps(stepLeft, stepsBlue, 4);
        this.pushSteps(stepUp, stepsBlue, 2);
        this.pushSteps(stepRight, stepsBlue, 4);
        this.pushSteps(stepUp, stepsBlue, 4);
        this.pushSteps(stepRight, stepsBlue, 2);
        this.pushSteps(stepDown, stepsBlue, 4);
        this.pushSteps(stepRight, stepsBlue, 4);
        this.pushSteps(stepDown, stepsBlue, 1);
        this.pushSteps(stepLeft, stepsBlue, 5);
    }
        //Green tokens path
    makeGreenPaths(){
        this.pushSteps(stepRight, stepsGreen, 4);
        this.pushSteps(stepUp, stepsGreen, 4);
        this.pushSteps(stepRight, stepsGreen, 2);
        this.pushSteps(stepDown, stepsGreen, 4);
        this.pushSteps(stepRight, stepsGreen, 4);
        this.pushSteps(stepDown, stepsGreen, 2);
        this.pushSteps(stepLeft, stepsGreen, 4);
        this.pushSteps(stepDown, stepsGreen, 4);
        this.pushSteps(stepLeft, stepsGreen, 2);
        this.pushSteps(stepUp, stepsGreen, 4);
        this.pushSteps(stepLeft, stepsGreen, 4);
        this.pushSteps(stepUp, stepsGreen, 1);
        this.pushSteps(stepRight, stepsGreen, 5);
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
        if (!clicked) {
            this.roll = Math.floor((Math.random() * 6) + 1);
            let dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(../Images/" + this.roll + ".jpg)";
            this.clicked = true;
        }
        if (roll != 6 && this.DontHaveOtherFree()) {
            let message = document.getElementById('message');
            bad.innerText = "You are stuck and cannot move";
            window.setTimeout(changePlayer, 1000);
            this.clicked = false;
        }
    }

    selectTokenAndMove(colour, token){
        let text = document.getElementById('player');
        this.numOfToken = token;
        this.currentColour = colour;
        this.currentToken = this.currentColour + "pawn" + this.numOfToken;
        this.currentPosition = this.positions[currentToken];
        if (this.roll + this.currentPosition > 44) {
            this.Stuck();
        }
        else {
            if (clicked) {
                let position = this.currentPosition;
                if (text.innerText == this.currentColour) {
                    if (this.onboard[this.currentToken] === 1 || this.roll === 6) {
                        if (this.onboard[this.currentToken] === 0) {
                            let doc = document.getElementById(currentToken);
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
                            onboard[currentToken] = 1;
                        }
                        else {
                            switch (colour) {
                                case "red":
                                    for (i = currentPosition; i < position + roll; i++) {
                                        stepsRed[i]();
                                    }
                                    break;

                                case "yellow":
                                    for (i = currentPosition; i < position + roll; i++) {
                                        stepsYellow[i]();
                                    }
                                    break;

                                case "blue":
                                    for (i = currentPosition; i < position + roll; i++) {
                                        stepsBlue[i]();
                                    }
                                    break;

                                case "green":
                                    for (i = currentPosition; i < position + roll; i++) {
                                        stepsGreen[i]();
                                    }
                                    break;
                            }
                            positions[currentToken] = currentPosition;
                            let victim = isSharingSpace();
                            if (victim != false) {
                                resetToken(victim);
                            }
                            if (currentPosition == 44) { pawnOut[currcolor]++; onboard[currpawn] = 0; positions[currpawn] = 0; document.getElementById(currpawn).style.visibility = "hidden"; };
                            CheckForWinner();
                            changePlayer();
                        }
                        roll = 0;
                        clicked = false;
                        let dice = document.getElementById('dice');
                        dice.style.backgroundImage = "";
                    }
                    else Stuck();
                }
            }
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

