

class Snake {
    constructor(config) {
        this.speed = typeof this.speed !== 'undefined' ? this.speed: 200;

        //only when multiplayer is active
        this.drawn = document.getElementById('content__game-game-over-headline');

        this.multiplayer = false;
        this.keyPL2 ='leftPL2';
        this.lastBallPL2 = [];
        this.scorePL2 = 0;
        this.scoreValuePL2 = document.getElementById('scoreResultPL2');
        this.highscorePL2 = document.getElementById('highscoreResultPL2'); 
        this.secondWinner = document.getElementById('content__game-winner-first');
        ///////////////////////////

        //only when multiplayerPL3 is active
        this.multiplayerPL3 = true;
        this.keyPL3 ='rightPL3';
        this.lastBallPL3 = [];
        this.scorePL3 = 0;
        this.scoreValuePL3 = document.getElementById('scoreResultPL3');
        this.highscorePL3 = document.getElementById('highscoreResultPL3'); 
        this.thirdWinner = document.getElementById('content__game-winner-first');

        //only when multiplayerPL4 is active
        this.multiplayerPL4 = true;
        this.keyPL4 ='leftPL4';
        this.lastBallPL4 = [];
        this.scorePL4 = 0;
        this.scoreValuePL4 = document.getElementById('scoreResultPL4');
        this.highscorePL4 = document.getElementById('highscoreResultPL4');
        this.fourthWinner = document.getElementById('content__game-winner-first');
        ///////////////////////////

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.keys = [];
        this.key = 'right';
        this.score = 0;
        this.balls = [];
        this.start = false;
        this.startClicked = false;
        this.running = false
        this.moveSnake = false;
        this.counter = false;
        this.food = '';
        this.alert = false;
        
        this.menu = document.getElementById('content__header-wrapper');
        this.intro = document.getElementById('content__header-intro-container');
        this.game = document.getElementById('content__game');
        this.wall = document.getElementById('wallCheck');
        this.scoreValue = document.getElementById('scoreResult');
        this.gameOverContainer = document.getElementById('content__game-game-over-container');
        this.firstWinner = document.getElementById('content__game-winner-first');

        this.highscore = document.getElementById('highscoreResult');
        this.totalHighscore = document.getElementById('content__header-intro-ths');
        this.difficulty = document.getElementById('difficultyDegreeValue');
        this.input = document.getElementById('range');
        this.pause = document.getElementById('content__game-pause');

        this.foodFirstPoint = 50;
        this.foodSecondPoint = 100;

        this.foodArrayWidth = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750];
        this.foodArrayHeight = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800];

        this.foodx = this.foodArrayWidth[Math.floor(Math.random() * this.foodArrayWidth.length)];
        this.foody = this.foodArrayHeight[Math.floor(Math.random() * this.foodArrayHeight.length)];

        this.snakeFoodxOne = this.foodFirstPoint + this.foodx;
        this.snakeFoodxTwo = this.foodSecondPoint + this.foodx;
        this.snakeFoodyOne = this.foodSecondPoint + this.foody;
        this.snakeFoodyTwo = this.foodFirstPoint + this.foody;	

        this.input.addEventListener('mousemove', () => this.rangeSlider(this.input.value));
        this.input.addEventListener('change', () => this.rangeSlider(this.input.value));
        this.input.addEventListener('change', () => this.rangeSliderReset());

        document.getElementById('startBtn').addEventListener('click', () => this.startSingleplayer());
        document.getElementById('multiplayer').addEventListener('click', () => this.startMultiplayer());
        this.wall.addEventListener('click', () => this.changeWall());

        document.addEventListener('keydown', (e) => {
            this.keyCode = e.keyCode;
            if(this.keyCode == 37 && this.key != 'right'){
                this.key = 'left';
            } 
            if(this.keyCode == 38 && this.key != 'down'){
                this.key = 'up';
            }
            if(this.keyCode == 39 && this.key != 'left'){
                this.key = 'right';
            }
            if(this.keyCode == 40 && this.key != 'up'){
                this.key = 'down';
            }
            if(this.keyCode == 27) {
                this.stopGame();
                this.input.style.display = "block";
            }
            if(this.keyCode == 32) {
                this.pauseGame();
            }
            //only when multiplayer is active
            if(this.multiplayer == true) {
                if(this.keyCode == 65 && this.keyPL2 != 'rightPL2'){
                    this.keyPL2 = 'leftPL2';
                } 
                if(this.keyCode == 87 && this.keyPL2 != 'downPL2'){
                    this.keyPL2 = 'upPL2';
                }
                if(this.keyCode == 68 && this.keyPL2 != 'leftPL2'){
                    this.keyPL2 = 'rightPL2';
                }
                if(this.keyCode == 83 && this.keyPL2 != 'upPL2'){
                    this.keyPL2 = 'downPL2';
                }
            }
            //only when multiplayerPL3 is active
            if(this.multiplayerPL3 == true) {
                if(this.keyCode == 72 && this.keyPL3 != 'rightPL3'){
                    this.keyPL3 = 'leftPL3';
                } 
                if(this.keyCode == 85 && this.keyPL3 != 'downPL3'){
                    this.keyPL3 = 'upPL3';
                }
                if(this.keyCode == 75 && this.keyPL3 != 'leftPL3'){
                    this.keyPL3 = 'rightPL3';
                }
                if(this.keyCode == 74 && this.keyPL3 != 'upPL3'){
                    this.keyPL3 = 'downPL3';
                }
            }
            //only when multiplayerPL4 is active
            if(this.multiplayerPL4 == true) {
                if(this.keyCode == 100 && this.keyPL4 != 'rightPL4'){
                    this.keyPL4 = 'leftPL4';
                } 
                if(this.keyCode == 104 && this.keyPL4 != 'downPL4'){
                    this.keyPL4 = 'upPL4';
                }
                if(this.keyCode == 102 && this.keyPL4 != 'leftPL4'){
                    this.keyPL4 = 'rightPL4';
                }
                if(this.keyCode == 101 && this.keyPL4 != 'upPL4'){
                    this.keyPL4 = 'downPL4';
                }
            }
        });
    }

    startGame() {
        if (this.startClicked == true) {
            this.resetGame();
        }
        if (this.start == false) {
            this.running = true;
            this.start = true;
            this.moveSnake = true;
            this.init();
            this.generateSnake();
            this.closeMenuToggle();
            this.input.style.display = "none";
            this.startClicked = true;
        }
    }

    startSingleplayer() {
        this.multiplayer = false;
        this.startGame();
    }

    startMultiplayer() {
        this.multiplayer = true;
        this.startGame();
    }

    resetGame() {
        if (this.start == true) {
            this.start = false;
            this.generateSnake();
            clearInterval(this.speedSetting);	
            this.ctx.clearRect(0, 0, 1850, 900);
        }
    }

    stopGame() {
        if (this.startClicked == true) {
            if (this.running == true) {
                this.running = false;
                clearInterval(this.speedSetting);
                this.openMenuToggle();
                this.counter = true; 
            } else {
                this.counter = false;
                this.resumeGame();
            }
        }
    }

    pauseGame() {
        if (this.startClicked == true) {
            if (this.running == true) {
                this.running = false;
                clearInterval(this.speedSetting);
                this.counter = true; 
                this.pause.style.display = 'block';
            } else {
                this.counter = false;
                this.resumeGame();
            }
        }
    }

    resumeGame() {
        if (this.running == false) {
            this.running = true;
            this.generateSnake();
            this.closeMenuToggle();
            this.pause.style.display = 'none';
        }
    }

    init(){
        this.alert = false;
        this.key = 'right';
        this.score = 0;
        this.balls = [
            {x:0, y:50},
            {x:50, y:50}, 
            {x:100, y:50}
        ];
        if (this.multiplayer == true) {
            this.keyPL2 = 'leftPL2';
            this.scorePL2 = 0;
            if (this.multiplayerPL4 == true) {
                this.ballsPL2 = [
                    {x:1800, y:100},   
                    {x:1750, y:100},
                    {x:1700, y:100}
                ];
            } else {
                this.ballsPL2 = [
                    {x:1800, y:800},   
                    {x:1750, y:800},
                    {x:1700, y:800}
                ];
            }
        }
        if (this.multiplayerPL3 == true) {
            this.keyPL3 = 'rightPL3';
            this.scorePL3 = 0;
            this.ballsPL3 = [
                {x:0, y:800},   
                {x:50, y:800},
                {x:100, y:800}
            ];
        }
        if (this.multiplayerPL4 == true) {
            this.keyPL4 = 'leftPL4';
            this.scorePL4 = 0;
            this.ballsPL4 = [
                {x:1800, y:750},   
                {x:1750, y:750},
                {x:1700, y:750}
            ];
        }
        this.createFood();
    }
    
    createFood() {
        this.foodx = this.foodArrayWidth[Math.floor(Math.random() * this.foodArrayWidth.length)];
        this.foody = this.foodArrayHeight[Math.floor(Math.random() * this.foodArrayHeight.length)];

        this.snakeFoodxOne = this.foodFirstPoint + this.foodx;
        this.snakeFoodxTwo = this.foodSecondPoint + this.foodx;
        this.snakeFoodyOne = this.foodSecondPoint + this.foody;
        this.snakeFoodyTwo = this.foodFirstPoint + this.foody;

        this.ctx.beginPath();
        this.ctx.moveTo(this.snakeFoodxOne, this.snakeFoodyTwo);
        this.ctx.lineTo(this.snakeFoodxTwo, this.snakeFoodyTwo);
        this.ctx.lineTo(this.snakeFoodxTwo, this.snakeFoodyOne);
        this.ctx.lineTo(this.snakeFoodxOne, this.snakeFoodyOne);
        this.ctx.closePath();
    }

    add(){
        if (this.food == 'PL1') {
            this.lastBall = this.balls[this.balls.length - 1];
            if(this.key == 'right'){
                this.balls.push({x:this.lastBall.x + 50, y:this.lastBall.y});
            }
            if(this.key == 'down'){
                this.balls.push({x:this.lastBall.x, y:this.lastBall.y + 50});
            }
            if(this.key == 'left'){
                this.balls.push({x:this.lastBall.x - 50, y:this.lastBall.y});
            }
            if(this.key == 'up'){
                this.balls.push({x:this.lastBall.x, y:this.lastBall.y - 50});
            }
        }
        if (this.multiplayer == true) {
            if (this.food == 'PL2') {
                this.lastBallPL2 = this.ballsPL2[this.ballsPL2.length - 1];
                if(this.keyPL2 == 'rightPL2'){
                    this.ballsPL2.push({x:this.lastBallPL2.x + 50, y:this.lastBallPL2.y});
                }
                if(this.keyPL2 == 'downPL2'){
                    this.ballsPL2.push({x:this.lastBallPL2.x, y:this.lastBallPL2.y + 50});
                }
                if(this.keyPL2 == 'leftPL2'){
                    this.ballsPL2.push({x:this.lastBallPL2.x - 50, y:this.lastBallPL2.y});
                }
                if(this.keyPL2 == 'upPL2'){
                    this.ballsPL2.push({x:this.lastBallPL2.x, y:this.lastBallPL2.y - 50});
                }
            }
        }
        if (this.multiplayerPL3 == true) {
            if (this.food == 'PL3') {
                this.lastBallPL3 = this.ballsPL3[this.ballsPL3.length - 1];
                if(this.keyPL3 == 'rightPL3'){
                    this.ballsPL3.push({x:this.lastBallPL3.x + 50, y:this.lastBallPL3.y});
                }
                if(this.keyPL3 == 'downPL3'){
                    this.ballsPL3.push({x:this.lastBallPL3.x, y:this.lastBallPL3.y + 50});
                }
                if(this.keyPL3 == 'leftPL3'){
                    this.ballsPL3.push({x:this.lastBallPL3.x - 50, y:this.lastBallPL3.y});
                }
                if(this.keyPL3 == 'upPL3'){
                    this.ballsPL3.push({x:this.lastBallPL3.x, y:this.lastBallPL3.y - 50});
                }
            }
        }
        if (this.multiplayerPL4 == true) {
            if (this.food == 'PL4') {
                this.lastBallPL4 = this.ballsPL4[this.ballsPL4.length - 1];
                if(this.keyPL4 == 'rightPL4'){
                    this.ballsPL4.push({x:this.lastBallPL4.x + 50, y:this.lastBallPL4.y});
                }
                if(this.keyPL4 == 'downPL4'){
                    this.ballsPL4.push({x:this.lastBallPL4.x, y:this.lastBallPL4.y + 50});
                }
                if(this.keyPL4 == 'leftPL4'){
                    this.ballsPL4.push({x:this.lastBallPL4.x - 50, y:this.lastBallPL4.y});
                }
                if(this.keyPL4 == 'upPL4'){
                    this.ballsPL4.push({x:this.lastBallPL4.x, y:this.lastBallPL4.y - 50});
                }
            }
        }
    }

    addEachTime(){
        this.lastBall = this.balls[this.balls.length - 1];
        if(this.key == 'right'){
            this.balls.push({x:this.lastBall.x + 50, y:this.lastBall.y});
        }
        if(this.key == 'down'){
            this.balls.push({x:this.lastBall.x, y:this.lastBall.y + 50});
        }
        if(this.key == 'left'){
            this.balls.push({x:this.lastBall.x - 50, y:this.lastBall.y});
        }
        if(this.key == 'up'){
            this.balls.push({x:this.lastBall.x, y:this.lastBall.y - 50});
        }
        if (this.multiplayer == true) {
            this.lastBallPL2 = this.ballsPL2[this.ballsPL2.length - 1];
            if(this.keyPL2 == 'rightPL2'){
                this.ballsPL2.push({x:this.lastBallPL2.x + 50, y:this.lastBallPL2.y});
            }
            if(this.keyPL2 == 'downPL2'){
                this.ballsPL2.push({x:this.lastBallPL2.x, y:this.lastBallPL2.y + 50});
            }
            if(this.keyPL2 == 'leftPL2'){
                this.ballsPL2.push({x:this.lastBallPL2.x - 50, y:this.lastBallPL2.y});
            }
            if(this.keyPL2 == 'upPL2'){
                this.ballsPL2.push({x:this.lastBallPL2.x, y:this.lastBallPL2.y - 50});
            }
        }
        if (this.multiplayerPL3 == true) {
            this.lastBallPL3 = this.ballsPL3[this.ballsPL3.length - 1];
            if(this.keyPL3 == 'rightPL3'){
                this.ballsPL3.push({x:this.lastBallPL3.x + 50, y:this.lastBallPL3.y});
            }
            if(this.keyPL3 == 'downPL3'){
                this.ballsPL3.push({x:this.lastBallPL3.x, y:this.lastBallPL3.y + 50});
            }
            if(this.keyPL3 == 'leftPL3'){
                this.ballsPL3.push({x:this.lastBallPL3.x - 50, y:this.lastBallPL3.y});
            }
            if(this.keyPL3 == 'upPL3'){
                this.ballsPL3.push({x:this.lastBallPL3.x, y:this.lastBallPL3.y - 50});
            }
        }
        if (this.multiplayerPL4 == true) {
            this.lastBallPL4 = this.ballsPL4[this.ballsPL4.length - 1];
            if(this.keyPL4 == 'rightPL4'){
                this.ballsPL4.push({x:this.lastBallPL4.x + 50, y:this.lastBallPL4.y});
            }
            if(this.keyPL4 == 'downPL4'){
                this.ballsPL4.push({x:this.lastBallPL4.x, y:this.lastBallPL4.y + 50});
            }
            if(this.keyPL4 == 'leftPL4'){
                this.ballsPL4.push({x:this.lastBallPL4.x - 50, y:this.lastBallPL4.y});
            }
            if(this.keyPL4 == 'upPL4'){
                this.ballsPL4.push({x:this.lastBallPL4.x, y:this.lastBallPL4.y - 50});
            }
        }
    }

    generateSnake() {
        if (this.moveSnake == true) {

            this.speedSetting = setInterval(() => {
                this.ctx.clearRect(0, 0, 1850, 900);
                this.balls.shift(); //delete the last ball
                if (this.multiplayer == true) {
                    this.ballsPL2.shift();
                }
                if (this.multiplayerPL3 == true) {
                    this.ballsPL3.shift();
                }
                if (this.multiplayerPL4 == true) {
                    this.ballsPL4.shift();
                }
                this.addEachTime();	
                this.lastBall = this.balls[this.balls.length - 1];

                if(this.lastBall.x == this.snakeFoodxOne && this.lastBall.y == this.snakeFoodyTwo){
                    this.score += 5;
                    this.scoreValue.innerHTML = this.score;
                    this.food = 'PL1';
                    this.add();
                    this.createFood();
                }
                if (this.multiplayer == true) {
                    this.lastBallPL2 = this.ballsPL2[this.ballsPL2.length - 1];

                    if(this.lastBallPL2.x == this.snakeFoodxOne && this.lastBallPL2.y == this.snakeFoodyTwo){
                        this.scorePL2 += 5;
                        this.scoreValuePL2.innerHTML = this.scorePL2;
                        this.food = 'PL2';
                        this.add();
                        this.createFood();
                    }
                }
                if (this.multiplayerPL3 == true) {
                    this.lastBallPL3 = this.ballsPL3[this.ballsPL3.length - 1];

                    if(this.lastBallPL3.x == this.snakeFoodxOne && this.lastBallPL3.y == this.snakeFoodyTwo){
                        this.scorePL3 += 5;
                        this.scoreValuePL3.innerHTML = this.scorePL3;
                        this.food = 'PL3';
                        this.add();
                        this.createFood();
                    }
                }
                if (this.multiplayerPL4 == true) {
                    this.lastBallPL4 = this.ballsPL4[this.ballsPL4.length - 1];

                    if(this.lastBallPL4.x == this.snakeFoodxOne && this.lastBallPL4.y == this.snakeFoodyTwo){
                        this.scorePL4 += 5;
                        this.scoreValuePL4.innerHTML = this.scorePL4;
                        this.food = 'PL4';
                        this.add();
                        this.createFood();
                    }
                }

                for(var i = 0; i < this.balls.length; i++){
                    this.ball = this.balls[i];

                    if(i == this.balls.length -1){
                        this.ctx.fillStyle = "maroon";
                    } else{
                        this.ctx.fillStyle = "green";
                    }
                    
                    if (document.getElementById('wallResult').innerHTML == 'An') {
                        if(this.ball.x > 1850){
                            this.ball.x = 0;
                        }
                        if(this.ball.x < 0){
                            this.ball.x = 1850;
                        }
                        if(this.ball.y > 900){
                            this.ball.y = 0;
                        }
                        if(this.ball.y < 0){
                            this.ball.y = 900;
                        }
                    } else {
                        if(this.ball.x > 1800){
                            this.scores();
                        }
                        if(this.ball.x < 0){
                            this.scores();
                        }
                        if(this.ball.y > 850){
                            this.scores();
                        }
                        if(this.ball.y < 0){
                            this.scores();
                        }
                    }

                    if(this.ball.x == this.lastBall.x && this.ball.y == this.lastBall.y && i < this.balls.length - 2){
                        this.scores();
                        this.init();
                    }
                    if (this.multiplayer == true) {
                        if(this.ball.x == this.lastBallPL2.x && this.ball.y == this.lastBallPL2.y && i < this.ballsPL2.length){
                            this.scores();
                            this.init();
                        }
                    }
                    if (this.multiplayerPL3 == true) {
                        if(this.ball.x == this.lastBallPL3.x && this.ball.y == this.lastBallPL3.y && i < this.ballsPL3.length){
                            this.scores();
                            this.init();
                        }
                    }
                    if (this.multiplayePL4 == true) {
                        if(this.ball.x == this.lastBallPL4.x && this.ball.y == this.lastBallPL4.y && i < this.ballsPL4.length){
                            this.scores();
                            this.init();
                        }
                    }
                   
                    if (this.start == true) {
                        this.ctx.fillRect(this.ball.x, this.ball.y, 49, 49);
                    }
                }

                if (this.multiplayer == true) {
                    for(var i = 0; i < this.ballsPL2.length; i++){
                        this.ballPL2 = this.ballsPL2[i];

                        if(i == this.ballsPL2.length - 1){
                            this.ctx.fillStyle = "lightblue";
                        } else{
                            this.ctx.fillStyle = "#69BF64";
                        }
                        
                        if (document.getElementById('wallResult').innerHTML == 'An') {
                            if(this.ballPL2.x > 1850){
                                this.ballPL2.x = 0;
                            }
                            if(this.ballPL2.x < 0){
                                this.ballPL2.x = 1850;
                            }
                            if(this.ballPL2.y > 900){
                                this.ballPL2.y = 0;
                            }
                            if(this.ballPL2.y < 0){
                                this.ballPL2.y = 900;
                            }
                        } else {
                            if(this.ballPL2.x > 1850){
                                this.scores();
                            }
                            if(this.ballPL2.x < 0){
                                this.scores();
                            }
                            if(this.ballPL2.y > 900){
                                this.scores();
                            }
                            if(this.ballPL2.y < 0){
                                this.scores();
                            }
                        }

                        if(this.ballPL2.x == this.lastBallPL2.x && this.ballPL2.y == this.lastBallPL2.y && i < this.ballsPL2.length - 2){
                            this.scores();
                            this.init();
                        }
                        if(this.ballPL2.x == this.lastBall.x && this.ballPL2.y == this.lastBall.y && i < this.balls.length){
                            this.scores();
                            this.init();
                        }
                        if (this.multiplayerPL3 == true) {
                            if(this.ballPL2.x == this.lastBallPL3.x && this.ballPL2.y == this.lastBallPL3.y && i < this.ballsPL3.length){
                                this.scores();
                                this.init();
                            }
                        }
                        if (this.multiplayePL4 == true) {
                            if(this.ballPL2.x == this.lastBallPL4.x && this.ballPL2.y == this.lastBallPL4.y && i < this.ballsPL4.length){
                                this.scores();
                                this.init();
                            }
                        }
                        if (this.start == true) {
                            this.ctx.fillRect(this.ballPL2.x, this.ballPL2.y, 49, 49);
                        }
                    }
                }
                if (this.multiplayerPL3 == true) {
                    for(var i = 0; i < this.ballsPL3.length; i++){
                        this.ballPL3 = this.ballsPL3[i];

                        if(i == this.ballsPL3.length - 1){
                            this.ctx.fillStyle = "grey";
                        } else{
                            this.ctx.fillStyle = "#8DB600";
                        }
                        
                        if (document.getElementById('wallResult').innerHTML == 'An') {
                            if(this.ballPL3.x > 1850){
                                this.ballPL3.x = 0;
                            }
                            if(this.ballPL3.x < 0){
                                this.ballPL3.x = 1850;
                            }
                            if(this.ballPL3.y > 900){
                                this.ballPL3.y = 0;
                            }
                            if(this.ballPL3.y < 0){
                                this.ballPL3.y = 900;
                            }
                        } else {
                            if(this.ballPL3.x > 1850){
                                this.scores();
                            }
                            if(this.ballPL3.x < 0){
                                this.scores();
                            }
                            if(this.ballPL3.y > 900){
                                this.scores();
                            }
                            if(this.ballPL3.y < 0){
                                this.scores();
                            }
                        }

                        if(this.ballPL3.x == this.lastBallPL3.x && this.ballPL3.y == this.lastBallPL3.y && i < this.ballsPL3.length - 2){
                            this.scores();
                            this.init();
                        }
                        if(this.ballPL3.x == this.lastBall.x && this.ballPL3.y == this.lastBall.y && i < this.balls.length){
                            this.scores();
                            this.init();
                        }
                        if(this.ballPL3.x == this.lastBallPL2.x && this.ballPL3.y == this.lastBallPL2.y && i < this.ballsPL2.length){
                            this.scores();
                            this.init();
                        }
                        if (this.multiplayePL4 == true) {
                            if(this.ballPL3.x == this.lastBallPL4.x && this.ballPL3.y == this.lastBallPL4.y && i < this.ballsPL4.length){
                                this.scores();
                                this.init();
                            }
                        }

                        if (this.start == true) {
                            this.ctx.fillRect(this.ballPL3.x, this.ballPL3.y, 49, 49);
                        }
                    }
                }
                if (this.multiplayerPL4 == true) {
                    for(var i = 0; i < this.ballsPL4.length; i++){
                        this.ballPL4 = this.ballsPL4[i];

                        if(i == this.ballsPL4.length - 1){
                            this.ctx.fillStyle = "purple";
                        } else{
                            this.ctx.fillStyle = "#287233";
                        }
                        
                        if (document.getElementById('wallResult').innerHTML == 'An') {
                            if(this.ballPL4.x > 1850){
                                this.ballPL4.x = 0;
                            }
                            if(this.ballPL4.x < 0){
                                this.ballPL4.x = 1850;
                            }
                            if(this.ballPL4.y > 900){
                                this.ballPL4.y = 0;
                            }
                            if(this.ballPL4.y < 0){
                                this.ballPL4.y = 900;
                            }
                        } else {
                            if(this.ballPL4.x > 1850){
                                this.scores();
                            }
                            if(this.ballPL4.x < 0){
                                this.scores();
                            }
                            if(this.ballPL4.y > 900){
                                this.scores();
                            }
                            if(this.ballPL4.y < 0){
                                this.scores();
                            }
                        }

                        if(this.ballPL4.x == this.lastBallPL4.x && this.ballPL4.y == this.lastBallPL4.y && i < this.ballsPL4.length - 2){
                            this.scores();
                            this.init();
                        }
                        if(this.ballPL4.x == this.lastBall.x && this.ballPL4.y == this.lastBall.y && i < this.balls.length){
                            this.scores();
                            this.init();
                        }
                        if(this.ballPL4.x == this.lastBallPL2.x && this.ballPL4.y == this.lastBallPL2.y && i < this.ballsPL2.length){
                            this.scores();
                            this.init();
                        }
                        if(this.ballPL4.x == this.lastBallPL3.x && this.ballPL4.y == this.lastBallPL3.y && i < this.ballsPL3.length){
                            this.scores();
                            this.init();
                        }

                        if (this.start == true) {
                            this.ctx.fillRect(this.ballPL4.x, this.ballPL4.y, 49, 49);
                        }
                    }
                }

                if (this.start == true) {
                    this.ctx.fillRect(this.snakeFoodxOne, this.snakeFoodyTwo, 49, 49);
                    this.ctx.fillStyle = "#DF7401";
                    this.ctx.fill();
                } 
    
            }, this.speed);
        }
    }

    scores() { ///muss geändert werden
        if (this.alert == false) {
            this.stopGame();
            this.input.style.display = "block";
            this.alert = true;
        }
        this.scoreValue.innerHTML = 0;
        // console.log('1')
        // console.log(this.scoreValue);
        // console.log(this.score);
        // console.log('1')
        if (this.score > this.highscore.textContent) {
            this.highscore.innerHTML = this.score;
        }
        if (this.score > this.totalHighscore.textContent) {
            this.totalHighscore.innerHTML = this.score;
        }
        if (this.multiplayer == true) {
            this.scoreValuePL2.innerHTML = 0;
            // console.log('2')
            // console.log(this.scoreValuePL2);
            // console.log(this.scorePL2);
            // console.log('2')
            if (this.scorePL2 > this.highscorePL2.textContent) {
                this.highscorePL2.innerHTML = this.scorePL2;
            }
            if (this.scorePL2 > this.totalHighscore.textContent) {
                this.totalHighscore.innerHTML = this.scorePL2;
            }
        }
        if (this.multiplayerPL3 == true) {
            this.scoreValuePL3.innerHTML = 0;
            // console.log('3')
            // console.log(this.scoreValuePL3);
            // console.log(this.scorePL3);
            // console.log('3')
            if (this.scorePL3 > this.highscorePL3.textContent) {
                this.highscorePL3.innerHTML = this.scorePL3;
            }
            if (this.scorePL3 > this.totalHighscore.textContent) {
                this.totalHighscore.innerHTML = this.scorePL3;
            }
        }
        if (this.multiplayerPL4 == true) {
            this.scoreValuePL4.innerHTML = 0;
            // console.log('4')
            // console.log(this.scoreValuePL4);
            // console.log(this.scorePL4);
            // console.log('4')
            if (this.scorePL4 > this.highscorePL4.textContent) {
                this.highscorePL4.innerHTML = this.scorePL4;
            }
            if (this.scorePL4 > this.totalHighscore.textContent) {
                this.totalHighscore.innerHTML = this.scorePL4;
            }
        }
        this.init();
    }
    
    rangeSlider(value) {
        document.getElementById('rangeValue').innerHTML = value;
        this.speed = value;
        if(this.speed < 200) {
            this.difficulty.innerHTML = 'Master:';
        }
        if (this.speed < 150) {
            this.difficulty.innerHTML = 'Legend:';
        }
        if(this.speed >= 200) {
            this.difficulty.innerHTML = 'Normal:';
        }
        if (this.speed > 300) {
            this.difficulty.innerHTML = 'Easy:';
        }
        if (this.speed > 350) {
            this.difficulty.innerHTML = 'Stoned:';
        }
    }

    rangeSliderReset() {
        this.resetGame();
        this.startGame();
    }

    changeWall() {
        if(this.wall.checked) {
            this.resetGame();
            this.startGame();
            document.getElementById('wallResult').innerHTML = 'An';
        } else {
            this.resetGame();
            this.startGame();
            document.getElementById('wallResult').innerHTML = 'Aus';
        }
    }

    closeMenuToggle() {
        this.menu.style.transition = '1s';
        this.menu.style.transform = 'translateX(-120%)';
        this.intro.style.transition = '1s';
        this.intro.style.transform = 'translateX(120%)';
        this.game.style.transition = '1s';
        this.game.style.transform = 'translateY(-101%)';
    }
    
    openMenuToggle() {
        this.menu.style.transition = '1s';
        this.menu.style.transform = 'translateX(0%)';
        this.intro.style.transition = '1s';
        this.intro.style.transform = 'translateX(0%)';
        this.game.style.transition = '1s';
        this.game.style.transform = 'translateY(101%)';
    }
}




