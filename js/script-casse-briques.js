var links = document.querySelector('.links');
var casseBrique = document.getElementById('casse-brique');
var canvasFrame = document.createElement("canvas");
canvasFrame.height = 320;
canvasFrame.width = 480;
canvasFrame.id = "myCanvas";
function isEmpty(tag) {
    return document.querySelector(tag).innerHTML.trim() === "";
}
function onResize() {
    if("matchMedia" in window) {
        if(window.matchMedia("(min-width:992px)").matches)
        {
            if(isEmpty("#casse-brique"))
            {
                casseBrique.appendChild(canvasFrame);
                document.location.reload(true);
            }
        }
    }
}

if(window.matchMedia("(min-width:992px)").matches)
{
    casseBrique.appendChild(canvasFrame);
}


window.addEventListener('resize', onResize, false);

// Settings / Game
var gameOverNotify = document.getElementById('game-over-notify');
var successNotify = document.getElementById('success-notify');
var success = false;
var score = 0;
var lives = 3;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// La balle
var ballRadius = 10;     // Rayon de la balle
var x = canvas.width/2;      // Position initiale X
var y = canvas.height-30;      // Position initiale Y
var dx = 2;    // Direction X (nombre de px décalés vers gauche/droite)
var dy = -2;     // Direction Y (nombre de px décalés vers haut/bas)
// Le paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;  // Pour qu'il soit au centre
// Bouger le paddle
var rightPressed = false;
var leftPressed = false;
// Les briques
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    }
    else if(e.keyCode === 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
// Game Over
gameOverNotify.addEventListener("click", function() {
    document.location.reload();
});
// Success
successNotify.addEventListener("click", function() {
    document.location.reload();
});

function collisionDetection() {
    success=false;
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status===1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status=0;
                    score++;
                    if (score === brickColumnCount*brickRowCount)
                    {
                        success=true;
                    }
                }
            }
        }
    }
}
// *********** Affichage du score ***********
function drawScore() {
    ctx.font = "19px Times";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 8, 20);
}

// *********** Affichage des vies ***********
function drawLives() {
    ctx.font = "19px Times";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawTheBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawThePaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;     // PosX brique = (nb colones * largeur brique + padding) + offset
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;     // PosY brique = (nb lignes = hauteur brique + padding) + offset
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function playGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawTheBall();
    drawThePaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if (success)
    {
        successNotify.innerHTML = "<div class='successContent'>" +
            "<p>Bravo !<br>Vous avez accès au contenu secret</p>" +
            "<a href='hidden-content.html'><button id=\"continue-button\">Continuer</button></a>" +
            "</div>";
        successNotify.style.display = 'flex';
        return;
    }
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) // Si (position balle + direction) (> largeur cadre (droite) OU < rayon de la balle (gauche))
    {      
        dx = -dx;                                                       // La direction s'inverse
    } 
    if(y + dy < ballRadius) 
    {                                     // Si (position balle + direction) (> hauteur cadre (haut) 
        dy = -dy;
    } 
    else if ( y + dy > canvas.height-ballRadius ) // Si (position balle + direction) (<  rayon de la balle (bas) 
    {             
        if (x > paddleX && x < paddleX + paddleWidth) 
        {
            dy = -dy;
        } 
        else 
        {
            lives--;
            switch (lives) 
            {
                case 2 : 
                x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width-paddleWidth)/2;
                break;
                case 1 :  
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 4;
                    dy = -4;
                    paddleX = (canvas.width-paddleWidth)/2;
                break;
                case 0 :
                    gameOverNotify.innerHTML = "<div class='gameOverContent'><p>Vous n'avez pas réussi à finir le jeu.<br>Cliquez pour recommencer.</p>" +
                        "</div>";
                    gameOverNotify.style.display = 'flex';

                    return;
            }
        }
    }

    // Direction du paddle
    if(rightPressed && paddleX < canvas.width-paddleWidth) // Si la touche droite est pressée et que la position du paddle dépasse pas du cadre
    {            
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) 
    {
        paddleX -= 7;
    }

    // Les valeurs s'incrémentent de la direction pour la prochaine image     
    x += dx;
    y += dy;
    requestAnimationFrame(playGame);
}


playGame();