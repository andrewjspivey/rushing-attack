
/* Rushing Attack */

/* Breakdown:
- draw field lines on canvas -done
- get box that will become sprite image to move with arrow keys- done
- create classes for user player and opponents
these classes will need functions for players to move 
- create function for being "tackled",
-  create function for scoring TD,
- create function to place user and opponents on field and begin moving
- create functions for menu buttons to start game and look at how to play
- create function for scoreboard updating 
- 
 */

// drawing lines on the field to create canvas
let canvas = document.querySelector('canvas'); //selected canvas stored in canvas
console.log(canvas);

canvas.width = 400; // setting dimensions of canvas
canvas.height = 720;

const c = canvas.getContext('2d'); // setting canvas context to 2d



// c.fillRect(x, y, width, height)
// creating football field lines
/* c.fillStyle = "#AA0000";
c.fillRect(0, 0, 400, 60); // creates top endzone
c.fillStyle = "#AA0000"; //creates bottom endzone
c.fillRect(0, 660, 400, 60); */

/* c.beginPath(); // initiates a line to be drawn
c.moveTo(0, 60); // tells line where to start on canvas moveTo(x, y)
c.lineTo(400, 60); // tells where to draw the line to from moveTo lineTo(x, y)
c.strokeStyle = "white" // tells line to be white
c.stroke(); // tells line to be drawn or shown */ 

// draws lines on the field with for loop

const createField = function () {
    c.fillStyle = "#AA0000";
    c.fillRect(0, 0, 400, 60); // creates top endzone
    c.fillStyle = "#AA0000"; 
    c.fillRect(0, 660, 400, 60);//creates bottom endzone
    let x = 0;
    let y = 60;
    for (i = 1; i < 12; i++) {
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(400, y);
        c.strokeStyle = "white";
        c.stroke();
        y += 60;
    }     
 
};
createField();


// creating box that represents player to move with keys
// Key codes: left arrow is 37 and right arrow is 39, up arraow is 38 and down arrow is 40
// drawImage method: drawImage(imgsrc, srcx, srcy, srcw,scrh, destx, desty, destw, desth)

/* canvas.addEventListener('keydown', move, true) */


/* let xPos = 175;
let yPos = 650;

let box = c.fillRect(xPos, yPos, 40, 40);
c.stroke(); */ 

//let userSprite = new Image();
//userSprite.src = 'https://jvin825.files.wordpress.com/2012/07/all_football_sprite.jpg';

/* userSprite.onload = function() {
  initDraw();
};


const initDraw = function () {
    c.drawImage(userSprite, 25, 50, 50, 95, 170, 600, 50, 100);
} */

// function init() {
   // c.drawImage(userSprite, 25, 50, 50, 95, 170, 600, 50, 100)
//}

/* let xPos = 175;
let yPos = 650;

let box = c.fillRect(xPos, yPos, 40, 40);
c.stroke(); 


function move(e) {
    
    if (e.keyCode == 38){ // move box up
        yPos -= 10;
        
    }
    if (e.keyCode == 37){ // move box left
        xPos -= 10;
        
    }
    if (e.keyCode == 40){ // move box down
        yPos += 10;
        
    }
    if (e.keyCode == 39){ // move box right
        xPos += 10;
    
    }
    canvas.width = canvas.width;
    createField();
    c.fillRect(xPos, yPos, 40, 40);
    c.stroke();
}
document.onkeydown = move;  */ 

//creating user controlled player class

/*class User {
    constructor(image, speed) {
        this.image = image;
        this.speed = speed;
        this.xPos = 170;
        this.yPos = 600; 

    }
    initImage() {
        c.drawImage(this.image, 25, 50, 50, 95, this.xPos, this.yPos, 50, 100);
    }
     move() {
        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 38){ // move player up
                this.yPos -= 10;
                c.drawImage(userSprite, 25, 50, 50, 95, this.xPos, this.yPos, 50, 100);
            }
            else if (e.keyCode == 37){ // move player left
                this.xPos -= 10;
                c.drawImage(userSprite, 25, 50, 50, 95, this.xPos, this.yPos, 50, 100);
            }
            else if (e.keyCode == 40){ // move player down
                this.yPos += 10;
                c.drawImage(userSprite, 25, 50, 50, 95, this.xPos, this.yPos, 50, 100);
            }
            else if (e.keyCode == 39){ // move player right
                this.xPos += 10;
                c.drawImage(userSprite, 25, 50, 50, 95, this.xPos, this.yPos, 50, 100);
        
            }
            canvas.width = canvas.width;
            createField(); 
            this.initDraw();
            c.drawImage(userSprite, 25, 50, 50, 95, this.xPos, this.yPos, 50, 100);
    }); 
    //document.onkeydown = this.move;
    }
    display() {
        c.drawImage(userSprite, 25, 50, 50, 95, this.xPos, this.yPos, 50, 100);
    } 

}; 
};*/

const player = {
    x: 175,
    y: 600,
    width: 50,
    height: 95, 
    speed: 10,
}


const userSprite = new Image();
userSprite.src = 'https://jvin825.files.wordpress.com/2012/07/all_football_sprite.jpg';

function drawSprite(img, srcX, srcY, srcW, srcH, destX, destY, destW, desth) {
    c.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, desth);
}

function animate() { // will use to change picture of player every step if have time and canvas every time
    createField();
    drawSprite(userSprite, 25, 50, player.width, player.height, player.x, player.y, player.width, player.height);
    requestAnimationFrame(animate);
}
animate();


document.addEventListener("keydown", function(event) { // event listener for player movement
    if (event.keyCode == 38){ // move player up
        player.y -= player.speed;
        drawSprite(userSprite, 25, 50, 50, 95, player.x, player.y, 50, 100);
    }
    else if (event.keyCode == 37){ // move player left
        player.x -= player.speed;
        drawSprite(userSprite, 25, 50, 50, 95, player.x, player.y, 50, 100);
    }
    else if (event.keyCode == 40){ // move player down
        player.y += player.speed;
        drawSprite(userSprite, 25, 50, 50, 95, player.x, player.y, 50, 100);
    }
    else if (event.keyCode == 39){ // move player right
        player.x += player.speed;
        drawSprite(userSprite, 25, 50, 50, 95, player.x, player.y, 50, 100);
    }
});

console.log('apple')

//const player = new User(userSprite, 10);

/* const startGame = function () {
    player.initImage();
    //player.move();
    //player.display();
    console.log(player);
}; */
//startGame();

//document.onkeydown = move;