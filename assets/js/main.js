

class Snake {
    constructor(config) {
        // this.speed = config.elvalue;

        this.speed = typeof this.speed !== 'undefined' ? this.speed: 200;

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
        
        this.menu = document.getElementById('content__header');
        this.wall = document.getElementById('wallCheck');
        this.scoreValue = document.getElementById('scoreResult');
        this.highscore = document.getElementById('highscoreResult');
        this.difficulty = document.getElementById('difficultyDegreeValue');
        this.input = document.getElementById('range');

        this.balls = [
            {x:50, y:50},
            {x:100, y:50},
            {x:150, y:50}
        ];
        this.lastBall = [];

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

        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
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
            if(this.keyCode == 27 || this.keyCode == 32) {
                this.stopGame();  
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
                this.menu.style.display = 'block';
                this.counter = true; 
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
            this.menu.style.display = 'none';
        }
    }

    init(){
        this.key = 'right';
        this.score = 0;
        this.balls = [
            {x:50, y:50},
            {x:100, y:50},
            {x:150, y:50}
        ];
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

    generateSnake() {
        if (this.moveSnake == true) {
            this.speedSetting = setInterval(() => {
                this.ctx.clearRect(0, 0, 1850, 900);
                this.balls.shift(); //delete the last ball
                this.add();	
                this.lastBall = this.balls[this.balls.length - 1];

                if(this.lastBall.x == this.snakeFoodxOne && this.lastBall.y == this.snakeFoodyTwo){
                    this.score += 5;
                    this.scoreValue.innerHTML = this.score;
                    this.add();
                    this.createFood();
                }

                for(var i = 0; i < this.balls.length; i++){
                    this.ball = this.balls[i];

                    if(i == this.balls.length - 1){
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
                        if(this.ball.x > 1850){
                            this.scores();
                        }
                        if(this.ball.x < 0){
                            this.scores();
                        }
                        if(this.ball.y > 900){
                            this.scores();
                        }
                        if(this.ball.y < 0){
                            this.scores();
                        }
                    }

                    if(this.ball.x == this.lastBall.x && this.ball.y == this.lastBall.y && i < this.balls.length - 2){
                        alert("Game Over! Your Score Is: " + this.score);
                        this.init();
                    }
                    if (this.start == true) {
                        this.ctx.fillRect(this.ball.x, this.ball.y, 49, 49);
                    }
                }
                if (this.start == true) {
                    this.ctx.fillRect(this.snakeFoodxOne, this.snakeFoodyTwo, 49, 49);
                }
                
            }, this.speed);
        }
    }

    scores() {
        alert("Game Over! Your Score Is: " + this.score);
        this.scoreValue.innerHTML = 0;
        if (this.score > this.highscore.textContent) {
            this.highscore.innerHTML = this.score;
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
        if (this.speed < 100) {
            this.difficulty.innerHTML = 'God:';
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
        this.menu.style.display = 'none';
    }
}




