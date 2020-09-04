
/* Rushing Attack */

/* Breakdown:
- draw field lines on canvas -done
- get box that will become sprite image to move with arrow keys- done
- create object for player and class for defenders  
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


const startBtn = document.getElementById("start");
const howPlayBtn = document.getElementById("how-to-play");
const howPlayCloseBtn = document.getElementById("how-play-close");
const tackledCloseBtn = document.getElementById("tackled-modal-close");
const touchdownCloseBtn = document.getElementById("touchdown-modal-close");
console.log(touchdownCloseBtn);


const menuButtons = function() {
    startBtn.addEventListener("click", function() {
        animateGame();
    });
    howPlayBtn.addEventListener("click", function() {
        document.querySelector(".modals").style.display = "flex";
    });
    howPlayCloseBtn.addEventListener("click", function() {
        document.querySelector(".modals").style.display = "none";
    });
    tackledCloseBtn.addEventListener("click", function() {
        document.getElementById("tackled-modal").style.display = "none";
    });
    touchdownCloseBtn.addEventListener("click", function() {
        document.getElementById("touchdown-modal").style.display = "none";
    }); 
};
menuButtons();

/* $body.on("click", function(){
    console.log('start game'); // full event obj
    ///console.log(this); // event.target
  });   */

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
    if (event.keyCode == 37){ // move player left
        player.x -= player.speed;
    }
    if (event.keyCode == 40){ // move player down
        player.y += player.speed;
    }
    if (event.keyCode == 39){ // move player right
        player.x += player.speed;
    }
    if (event.keyCode == 65){ // move player down
        player.x -= player.speed * 2.2;
    }
    if (event.keyCode == 83){ // move player right
        player.x += player.speed * 2.2;
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
        c.drawImage(defSprite,  0, 0, 80, 88, this.posX, this.posY, 35, 37)
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
const defender1 = new Defender(40, 175, 1.9); 
const defender2 = new Defender(110, 200, 1.7);
const defender3 = new Defender(190, 190, 2.4);
const defender4 = new Defender(300, 210, 1.5);
const defender5 = new Defender(150, 70, 1.3);
const defender6 = new Defender(310, 80, 2.2);
const defender7 = new Defender(50, 70, 1.6);
const defender8 = new Defender(250, 100, 2.0);


/* let requestAnimationFrame = window.requestAnimationFrame;
let cancelAnimationFrame= window.cancelAnimationFrame; */

// defenders array to loop through on tackle function
let defendersArray = [defender1, defender2, defender3, defender4, defender5, defender6, defender7, defender8];

// detects if one of defenders and user touch
const tackle = function(userPos, defPos) {
    if (userPos.x > defPos.posX + 30 || 
        userPos.x + 28 < defPos.posX || 
        userPos.y > defPos.posY + 30 || 
        userPos.y + 40 < defPos.posY) {
            return false;
    } else {
        return true;
    }
        // if users xposition on canvas is greater than the defenders x position + the width of the defender,
        // the user and defender hanvt touched on the left side of user,
        // if the users x position plus the users width is less than defenders x position, they havnt touched on left side of user
        // if the users y position is greater than the defenders y pos plus the defender height, they havnt touched on front of user
        // if the users y position plus the users height is less than the defenders y position they havnt touched on the bottom of the user
};

// loops through defenders to detect if user has been touched by defender
const tackleDetection = function() {

    
    for (let i = 0; i < defendersArray.length; i++) {
        if (tackle(player, defendersArray[i])){
            document.querySelector("#tackled-modal").style.display = "flex";
            return true;
        
    } 
  }          //cancelAnimationFrame(animateGame);
}


//  checks if user has crossed the endzone
const touchDown = function() {
    let points = 0;
    if (player.y <= 30) {
        points+= 7;
        document.querySelector("#touchdown-modal").style.display = "flex";
        window.cancelAnimationFrame(animateGame);
        //restartGame();
        return true;
    }
    //$("#points").text(`${points}`)
};

/* const restartGame = function() {
    if (touchDown() == true || tackleDetection() == true) {
        c.clearRect(0, 0, 400, 720)
        createField();
        menuButtons();
    }
}
restartGame(); */
/* function resetGame() {
    animateGame
} */
// animates game 
const animateGame = function() { // will use to change picture of player every step if have time and canvas every time
    c.clearRect(0, 0, 400, 720) // clears the whole canvas every frame
    createField(); // recreates field lines every frame
    drawSprite(userSprite, 0, 0, 50, 95, player.x, player.y, 30, 55); //draws sprites every frame
    //drawSprite(defSprite, 0, 0, 80, 88, 160, 150, 50, 52);
    defender1.drawSprite();
    defender1.move();;            //calling defenders and their functions 
    defender2.drawSprite();
    defender2.move();
    defender3.drawSprite();
    defender3.move();
    defender4.drawSprite();
    defender4.move();
    defender5.drawSprite();
    defender5.move();
    defender6.drawSprite();
    defender6.move();
    defender7.drawSprite();
    defender7.move();
    defender8.drawSprite();
    defender8.move();
    tackleDetection();
    if (tackleDetection()) return;
    touchDown();
    if (touchDown()) return;
    window.requestAnimationFrame(animateGame);
}





