
/* Rushing Attack */

/* Breakdown:
- draw field lines on canvas -done
- get box that will become sprite image to move with arrow keys- done
- create classes for user player and opponents 
these classes will need functions for players to move - class for defenders is done, will go back to user if time
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

// drawImage method: drawImage(imgsrc, srcx, srcy, srcw,scrh, destx, desty, destw, desth)


const userSprite = new Image();
userSprite.src = 'assets/player-stepright.png';

const defSprite = new Image();
defSprite.src = 'assets/defender-stepright.png';
console.log(defSprite)

//player (user) object
const player = {
    x: 175, // x = user images x starting point on canvas
    y: 600, // y - user images y starting point on canvas
    speed: 10,
}

// function to draw the player's sprite. params are x, y, width, and height dimensions of sprite img and where on canvas
function drawSprite(img, srcX, srcY, srcW, srcH, destX, destY, destW, desth) {
    c.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, desth);
}

// event listener for key control of user

document.addEventListener("keydown", function(event) { // event listener for player movement
    if (event.keyCode == 38){ // move player up
        player.y -= player.speed;
    }
    else if (event.keyCode == 37){ // move player left
        player.x -= player.speed;
    }
    else if (event.keyCode == 40){ // move player down
        player.y += player.speed;
    }
    else if (event.keyCode == 39){ // move player right
        player.x += player.speed;
    }
});


//creating defender class to add multiple defenders

class Defender {
    constructor(posX, posY, speed) { //posX and posY are for starting point of defender
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
    }
    drawSprite() { // draw the defender sprites at starting position
        c.drawImage(defSprite,  0, 0, 80, 88, this.posX, this.posY, 50, 52)
    }
    move() { 
        let randomNum = Math.floor(Math.random() * 100)
        
        if (randomNum >= 50) { // move defender down field 50% of time
            this.posY += this.speed; 
            this.drawSprite();
        }
        if (randomNum <= 49 && randomNum >= 30) { // move defender left 20% of time
            this.posX -= this.speed; 
            this.drawSprite();
        }
        if (randomNum <= 29 && randomNum >= 10) { // move defender right 20% of time
            this.posX += this.speed; 
            this.drawSprite();
        }
        if (randomNum < 10) { // move defender up field 10% of time
            this.posY -= this.speed; 
            this.drawSprite();
        }
    }
    
};

// give defenders different starting positions and different speeds
const defender1 = new Defender(75, 200, 1.2); 
const defender2 = new Defender(150, 175, 2);
const defender3 = new Defender(225, 190, 1.3);
const defender4 = new Defender(300, 200, 1.5);


// defenders array to loop through on tackle function
let defendersArray = [defender1, defender2, defender3, defender4];

// detects if one of defenders and user touch
function tackle(userPos, defPos) {
    return !(userPos.x > defPos.posX + 50 || userPos.x + 40 < defPos.posX || userPos.y > defPos.posY + 52 || userPos.y + 70 < 52)
        
    }
// loops through defenders to detect if user has been touched by defender
function tackleDetection() {
    
    for (let i = 0; i < defendersArray.length; i++) {
        if (tackle(player, defendersArray[i])){
            
    } 
  }  
}
//  checks if user has crossed the endzone
function touchDown() {
    if(player.y <= 30) {
        console.log("touchdown!")
    }
}

/* function resetGame() {
    animateGame
} */
// animates game 
function animateGame() { // will use to change picture of player every step if have time and canvas every time
    c.clearRect(0, 0, 400, 720) // clears the whole canvas every frame
    createField(); // recreates field lines every frame
    drawSprite(userSprite, 0, 0, 50, 95, player.x, player.y, 35, 70); //draws sprites every frame
    //drawSprite(defSprite, 0, 0, 80, 88, 160, 150, 50, 52);
    defender1.drawSprite();
    defender1.move();;            //calling defenders and their functions 
    defender2.drawSprite();
    defender2.move();
    defender3.drawSprite();
    defender3.move();
    defender4.drawSprite();
    defender4.move();
    tackleDetection();
    touchDown();
    requestAnimationFrame(animateGame);
}

animateGame();


