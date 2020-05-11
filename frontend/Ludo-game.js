let currPos = 44;
let step = 49.5;
let currcolour = "";
let numOfPawn = "";
let roll = 0;
let clicked = false;
let currpawn = "";
let colours = ["red", "blue", "green", "yellow"];
let pawnOut = {red:0,blue:0,green:0,yellow:0}
function HaveHover() {
    let count = 0;
    let toKill = "";
    for (let i = 0; i < colours.length; i++) {
        for (let n = 1; n <= 4; n++) {
            let firstPawn = document.getElementById(colours[i] + "pawn" + n);
            let secondPawn = document.getElementById(currpawn);
            if (firstPawn.style.top==secondPawn.style.top&&firstPawn.style.left==secondPawn.style.left&&currcolor!=colours[i]&&currPos+roll<44) {
                count++;
                toKill = colours[i] + "pawn" + n;
                return toKill;
            }
        }
    }
    return false;
}
function Stuck() {
    let text = document.getElementById('player');
    if (onboard[currpawn] == 0||currPos+roll>44) {
        if (DontHaveOtherFree()||currPos+roll>44) {
            let badtext = document.getElementById('badtext');
            badtext.innerText = "Unfortunatlly you stuck";
            clicked = false;
            let dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(Images/dice.gif)";
            window.setTimeout(changePlayer, 1000);
        }
    }
}
function changePlayer() {
    if (roll != 6){
    let text = document.getElementById('player');
    switch (text.innerText) {
        case "red": text.innerText = text.style.color = "blue"; break;
        case "blue": text.innerText = text.style.color = "yellow"; break;
        case "yellow": text.innerText = text.style.color = "green"; break;
        case "green": text.innerText = text.style.color = "red"; break;
    }
    }
    let badtext = document.getElementById('badtext');
    badtext.innerText = "";
    let dice = document.getElementById('dice');
    dice.style.backgroundImage = "url(Images/dice.gif)";
}
let positions = {
    redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
    bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
    greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
    yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};
let onboard = {
    redpawn1: 0, redpawn2: 0, redpawn3: 0, redpawn4: 0,
    bluepawn1: 0, bluepawn2: 0, bluepawn3: 0, bluepawn4: 0,
    greenpawn1: 0, greenpawn2: 0, greenpawn3: 0, greenpawn4: 0,
    yellowpawn1: 0, yellowpawn2: 0, yellowpawn3: 0, yellowpawn4: 0
};
function DontHaveOtherFree() {
    let text = document.getElementById('player');
    for (let i = 1; i <=4; i++) {
        if (onboard[text.innerText + "pawn" + i] == 1 || positions[text.innerText + "pawn" + i]+roll>=44) return false;
    }
    return true;
}
function CheckForWinner() {
    if (pawnOut[currcolor] == 4) {
        let dice = document.getElementById("dice");
        let player = document.getElementById("player");
        let uselesstext1 = document.getElementById("uselesstext1");
        let uselesstext2 = document.getElementById("uselesstext2");
        dice.innerText = "";
        dice.style.visibility = "hidden";
        uselesstext1.innerText = "";
        uselesstext2.innerText = "";
        player.innerText = "The Winner is the "+currcolor+" player";
    }
}
function stepDown() {
    let doc = document.getElementById(currcolor + "pawn"+numOfPawnn);
    let space = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (space+step)+'px';
    currPos++;
}
function stepUp() {
    let doc = document.getElementById(currpawn);
    let space = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (space - step) + 'px';
    currPos++;
}
function stepLeft() {
    let doc = document.getElementById(currpawn);
    let space = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (space - step) + 'px';
    currPos++;
}
function stepRight() {
    let doc = document.getElementById(currpawn);
    let space = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (space + step) + 'px';
    currPos++;
}
let stepsRed = [];
let stepsYellow = [];
let stepsBlue = [];
let stepsGreen = [];
function pushSteps(value, steps, count) {
    for (i = 0; i < count; i++) steps.push(value);
}
//Red pawns path
pushSteps(stepDown, stepsRed,4);
pushSteps(stepRight, stepsRed,4);
pushSteps(stepDown, stepsRed,2);
pushSteps(stepLeft, stepsRed,4);
pushSteps(stepDown, stepsRed,4);
pushSteps(stepLeft, stepsRed,2);
pushSteps(stepUp, stepsRed,4);
pushSteps(stepLeft, stepsRed,4);
pushSteps(stepUp, stepsRed,2);
pushSteps(stepRight, stepsRed,4);
pushSteps(stepUp, stepsRed,4);
pushSteps(stepRight, stepsRed,1);
pushSteps(stepDown, stepsRed,5);
//Yellow pawns path

pushSteps(stepUp, stepsYellow,4);
pushSteps(stepLeft, stepsYellow,4);
pushSteps(stepUp, stepsYellow,2);
pushSteps(stepRight, stepsYellow,4);
pushSteps(stepUp, stepsYellow,4);
pushSteps(stepRight, stepsYellow,2);
pushSteps(stepDown, stepsYellow,4);
pushSteps(stepRight, stepsYellow,4);
pushSteps(stepDown, stepsYellow,2);
pushSteps(stepLeft, stepsYellow,4);
pushSteps(stepDown, stepsYellow,4);
pushSteps(stepLeft, stepsYellow,1);
pushSteps(stepUp, stepsYellow,5);

//Blue pawns path
pushSteps(stepLeft, stepsBlue,4);
pushSteps(stepDown, stepsBlue,4);
pushSteps(stepLeft, stepsBlue,2);
pushSteps(stepUp, stepsBlue, 4);
pushSteps(stepLeft, stepsBlue,4);
pushSteps(stepUp, stepsBlue,2);
pushSteps(stepRight, stepsBlue,4);
pushSteps(stepUp, stepsBlue,4);
pushSteps(stepRight, stepsBlue,2);
pushSteps(stepDown, stepsBlue,4);
pushSteps(stepRight, stepsBlue,4);
pushSteps(stepDown, stepsBlue,1);
pushSteps(stepLeft, stepsBlue,5);

//Green pawns path
pushSteps(stepRight, stepsGreen,4);
pushSteps(stepUp, stepsGreen,4);
pushSteps(stepRight, stepsGreen,2);
pushSteps(stepDown, stepsGreen,4);
pushSteps(stepRight, stepsGreen,4);
pushSteps(stepDown, stepsGreen,2);
pushSteps(stepLeft, stepsGreen,4);
pushSteps(stepDown, stepsGreen,4);
pushSteps(stepLeft, stepsGreen,2);
pushSteps(stepUp, stepsGreen,4);
pushSteps(stepLeft, stepsGreen,4);
pushSteps(stepUp, stepsGreen,1);
pushSteps(stepRight, stepsGreen, 5);
function ResetPawn(victim) {
    onboard[victim] = 0;
    positions[victim] = 0;
    let pawnToMove = document.getElementById(victim);
    switch (victim) {
        case "redpawn1": pawnToMove.style.top = 310 + "px"; pawnToMove.style.left = 660 + "px"; break;
        case "redpawn2": pawnToMove.style.top = 260 + "px"; pawnToMove.style.left = 553 + "px"; break;
        case "redpawn3": pawnToMove.style.top = 215 + "px"; pawnToMove.style.left = 660 + "px"; break;
        case "redpawn4": pawnToMove.style.top = 260 + "px"; pawnToMove.style.left = 647 + "px"; break;
        case "bluepawn1": pawnToMove.style.top = 563 + "px"; pawnToMove.style.left = 600 + "px"; break;
        case "bluepawn2": pawnToMove.style.top = 609 + "px"; pawnToMove.style.left = 553 + "px"; break;
        case "bluepawn3": pawnToMove.style.top = 657 + "px"; pawnToMove.style.left = 600 + "px"; break;
        case "bluepawn4": pawnToMove.style.top = 609 + "px"; pawnToMove.style.left = 647 + "px"; break;
        case "greenpawn1": pawnToMove.style.top = 310 + "px"; pawnToMove.style.left = 250 + "px"; break;
        case "greenpawn2": pawnToMove.style.top = 215 + "px"; pawnToMove.style.left = 250 + "px"; break;
        case "greenpawn3": pawnToMove.style.top = 260 + "px"; pawnToMove.style.left = 203 + "px"; break;
        case "greenpawn4": pawnToMove.style.top = 260 + "px"; pawnToMove.style.left = 297 + "px"; break;
        case "yellowpawn1": pawnToMove.style.top = 609 + "px"; pawnToMove.style.left = 203 + "px"; break;
        case "yellowpawn2": pawnToMove.style.top = 609 + "px"; pawnToMove.style.left = 297 + "px"; break;
        case "yellowpawn3": pawnToMove.style.top = 563 + "px"; pawnToMove.style.left = 250 + "px"; break;
        case "yellowpawn4": pawnToMove.style.top = 657 + "px"; pawnToMove.style.left = 250 + "px"; break;

    }
}
function randomNum() {
    if (!clicked) {
        roll = Math.floor((Math.random() * 6) + 1);;
        let dice = document.getElementById('dice');
        dice.style.backgroundImage = "url(Images/" + roll + ".jpg)";
        clicked = true;
    }
    if (roll != 6&&DontHaveOtherFree()) {
        let bad = document.getElementById('badtext');
        bad.innerText = "Unfortunatlly you stuck";
        window.setTimeout(changePlayer, 1000);
        clicked = false;
    }
}
function randomMove(Color, paw) {
    let text = document.getElementById('player');
    numOfPawnn = paw;
    currcolor = Color;
    currpawn = currcolor + "pawn" + numOfPawnn;
    currPos = positions[currpawn];
    if (roll + currPos > 44) {
        Stuck();
    }
    else {
        if (clicked) {
            let position = currPos;
            if (text.innerText == currcolor) {
                if (onboard[currpawn] === 1 || roll === 6) {
                    if (onboard[currpawn] === 0) {
                        let doc = document.getElementById(currpawn);
                        switch (Color) {
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
                                doc.style.left = 178 + 'px';
                                doc.style.top = 385 + "px";
                                break;
                        }
                        onboard[currpawn] = 1;
                    }
                    else {
                        switch (Color) {
                            case "red":
                                for (i = currPos; i < position + roll; i++) {
                                    stepsRed[i]();
                                }
                                break;

                            case "yellow":
                                for (i = currPos; i < position + roll; i++) {
                                    stepsYellow[i]();
                                }
                                break;

                            case "blue":
                                for (i = currPos; i < position + roll; i++) {
                                    stepsBlue[i]();
                                }
                                break;

                            case "green":
                                for (i = currPos; i < position + roll; i++) {
                                    stepsGreen[i]();
                                }
                                break;
                        }
                        positions[currpawn] = currPos;
                        let victim = HaveHover();
                        if (victim != false) {
                            ResetPawn(victim);
                        }
                        if (currPos == 44) { pawnOut[currcolor]++; onboard[currpawn] = 0; positions[currpawn] = 0; document.getElementById(currpawn).style.visibility = "hidden"; };
                        CheckForWinner();
                        changePlayer();
                    }
                    roll = 0;
                    clicked = false;
                    let dice = document.getElementById('dice');
                    dice.style.backgroundImage = "url(Images/dice.gif)";
                }
                else Stuck();
            }
        }
    }
}



class Game {
    constructor(player){
        this.player = player;
    }
}

class Turn {
    constructor(game, colour, pawn, roll){
        this.game = game;
        this.colour = colour;
        this.pawn = pawn;
        this.roll = roll;
    }
}
