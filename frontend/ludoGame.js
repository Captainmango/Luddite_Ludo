var canvas = document.getElementById("gameboard");
var ctx = canvas.getContext("2d");
var tileWidth = Math.ceil(canvasWidth / 16); 
var canvasWidth = window.innerHeight - 10;


CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}

function createMap() {
    var mapxy = new Array();
    //notile:0, purple:1,green:2,red:3,yellow:4;
    mapxy.push([0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 3, 0, 0, 4, 0, 0, 1, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 2, 0, 0, 4, 0, 0, 2, 0, 0, 0, 0]);
    mapxy.push([2, 3, 4, 1, 80, 0, 0, 4, 0, 0, 70, 3, 4, 1, 2]);
    mapxy.push([1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 3]);
    mapxy.push([4, 0, 0, 0, 0, 0, 5, 4, 6, 0, 0, 0, 0, 0, 4]);
    mapxy.push([3, 3, 3, 3, 3, 3, 3, 9, 1, 1, 1, 1, 1, 1, 1]);
    mapxy.push([2, 0, 0, 0, 0, 0, 7, 2, 8, 0, 0, 0, 0, 0, 2]);
    mapxy.push([1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3]);
    mapxy.push([4, 3, 2, 1, 0, 60, 0, 2, 0, 0, 50, 3, 2, 1, 4]);
    mapxy.push([0, 0, 0, 0, 4, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 3, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0]);
    mapxy.push([0, 0, 0, 0, 1, 4, 3, 2, 1, 4, 3, 0, 0, 0, 0]);
    return mapxy;
}

function drawARegularTile(color, width) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var x2 = x - Math.ceil(width / 2);
            var y2 = y - Math.ceil(width / 2);
            var distance = Math.ceil(Math.sqrt(x2 * x2 + y2 * y2));
            var circlewall = Math.ceil(width / 2 * 0.8);
            var circleWidth = Math.ceil(width / 20);
            ys = new Array();
            for (var j = 0; j < circleWidth; j++) {
                ys.push(y - Math.ceil(circleWidth / 2 * 0.9) - +circleWidth + j);
            }
            if ((circlewall - circleWidth) < distance && distance < circlewall) {
                setColor("white");
            }
            else {
                setColor(color);
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}


function drawTwoColorTile(color, width, keepColorSequence) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            if (x < width - y) {
                switch (color) {
                    case "yb": keepColorSequence ? setColor("yellow") : setColor("purple "); break;
                    case "rg": keepColorSequence ? setColor("red") : setColor("green"); break;
                    default: break;
                }
            }
            else {
                switch (color) {
                    case "yb": keepColorSequence ? setColor("purple ") : setColor("yellow"); break;
                    case "rg": keepColorSequence ? setColor("green") : setColor("red"); break;
                    default: break;
                }
            }
            if (x < y) {
                switch (color) {
                    case "ry": keepColorSequence ? setColor("yellow") : setColor("red"); break;
                    case "gb": keepColorSequence ? setColor("purple ") : setColor("green"); break;
                    default: break;
                }
            }
            else {
                switch (color) {
                    case "ry": keepColorSequence ? setColor("red") : setColor("yellow"); break;
                    case "gb": keepColorSequence ? setColor("green") : setColor("purple "); break;
                    default: break;
                }
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}

function drawCenterTile(width) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            if (x > y - 1 && x < width - y) {
                setColor("red");
            }
            else if (x < y && x > width - y - 1) {
                setColor("purple ");
            }
            else if (x > y - 1 && x < width) {
                setColor("green");
            }
            else {
                setColor("yellow");
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}

function drawTheBoard(){
    var boardmap = createMap();
        for (var x = 0; x < 15; x++) {
            for (var y = 0; y < 15; y++) {
                switch (boardmap[y][x]) {
                    case 0: break;
                    case 1: ctx.putImageData(drawARegularTile("purple ", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 2: ctx.putImageData(drawARegularTile("green", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 3: ctx.putImageData(drawARegularTile("red", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 4: ctx.putImageData(drawARegularTile("yellow", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 5: ctx.putImageData(drawTwoColorTile("ry", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 6: ctx.putImageData(drawTwoColorTile("yb", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 7: ctx.putImageData(drawTwoColorTile("rg", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 8: ctx.putImageData(drawTwoColorTile("gb", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 9: ctx.putImageData(drawCenterTile(tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 50: ctx.putImageData(drawTwoColorTile("ry", tileWidth, false), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 60: ctx.putImageData(drawTwoColorTile("yb", tileWidth, false), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 70: ctx.putImageData(drawTwoColorTile("rg", tileWidth, false), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    case 80: ctx.putImageData(drawTwoColorTile("gb", tileWidth, false), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                    default: break;
                }
            }
        }
    }

