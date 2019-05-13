

class Snake {
    constructor(config) {
        console.log(this.speed);
        this.speed = typeof this.speed !== 'undefined' ? this.speed: 200;

        //only when multiplayer is active
        this.multiplayer = false;
        this.keyPL2 ='leftPL2';
        this.ballsPL2 = [
            {x:1800, y:800},   
            {x:1750, y:800},
            {x:1850, y:800}
        ];
        this.lastBallPL2 = [];
        this.scorePL2 = 0;
        this.scoreValuePL2 = document.getElementById('scoreResultPL2');
        this.highscorePL2 = document.getElementById('highscoreResultPL2'); 
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
        this.food == 'none';
        
        this.menu = document.getElementById('content__header-wrapper');
        this.intro = document.getElementById('content__header-intro-container');
        this.game = document.getElementById('content__game');
        this.wall = document.getElementById('wallCheck');
        this.scoreValue = document.getElementById('scoreResult');
        // this.totalScoreValue = document.getElementById('content__header-intro-tcs'); //only when pause is active
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
            this.ballsPL2 = [
                {x:1800, y:800},   
                {x:1750, y:800},
                {x:1700, y:800}
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
    }

    generateSnake() {
        if (this.moveSnake == true) {
            console.log(this.speed);
            this.speedSetting = setInterval(() => {
                this.ctx.clearRect(0, 0, 1850, 900);
                this.balls.shift(); //delete the last ball
                if (this.multiplayer == true) {
                    this.ballsPL2.shift();
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
                            this.ctx.fillStyle = "green";
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
                        if (this.start == true) {
                            this.ctx.fillRect(this.ballPL2.x, this.ballPL2.y, 49, 49);
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
        alert("Game Over! Your Score Is: " + this.score);
        this.scoreValue.innerHTML = 0;
        if (this.score > this.highscore.textContent) {
            this.highscore.innerHTML = this.score;
        }
        if (this.score > this.totalHighscore.textContent) {
            this.totalHighscore.innerHTML = this.score;
        }
        if (multiplayer == true) {
            this.scoreValuePL2.innerHTML = 0;
            if (this.scorePL2 > this.highscorePL2.textContent) {
                this.highscorePL2.innerHTML = this.scorePL2;
            }
            if (this.scorePL2 > this.totalHighscore.textContent) {
                this.totalHighscore.innerHTML = this.scorePL2;
            }
        }
        this.init();
        
    }
    
    rangeSlider(value) {
        document.getElementById('rangeValue').innerHTML = value;
        this.speed = value;
        console.log(this.speed);
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




