

class Snake {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.keys = [];
        this.key = 'right';
        this.score = 0;
        this.balls = [];
        this.foodFirstPoint = 50;
        this.foodSecondPoint = 100;
        this.start = false;
        this.wallCheck = false;
        this.wallRun = false;
        this.wall = document.getElementById('wallCheck');
        // this.wallRun = this.wall.options[this.wall.selectedIndex].value;
        this.running = false
        this.moveSnake = false;

        this.balls = [
            {x:50, y:50},
            {x:100, y:50},
            {x:150, y:50}
        ];
        this.lastBall = [];

        this.foodArrayWidth = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900,950, 1000, 1050, 1100, 1150, 1200];
        this.foodArrayHeight = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700];

        this.foodx = this.foodArrayWidth[Math.floor(Math.random() * this.foodArrayWidth.length)];
        this.foody = this.foodArrayHeight[Math.floor(Math.random() * this.foodArrayHeight.length)];

        this.snakeFoodxOne = this.foodFirstPoint + this.foodx;
        this.snakeFoodxTwo = this.foodSecondPoint + this.foodx;
        this.snakeFoodyOne = this.foodSecondPoint + this.foody;
        this.snakeFoodyTwo = this.foodFirstPoint + this.foody;	

        // onmousemove="rangeSlider(this.value)" onchange="rangeSlider(this.value)"

        // document.getElementById('range').addEventListener('onmousemove', () => this.rangeSlider(this.value)");
        // document.getElementById('range').addEventListener('onchange', () => this.rangeSlider(this.value)";
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        // document.getElementById('start').addEventListener('click', () => this.startGame());
        // document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        // document.getElementById('settings').addEventListener('click', () => this.stopGame());
        document.getElementById('resumeBtn').addEventListener('click', () => this.resumeGame());
        document.getElementById('wallCheck').addEventListener('click', () => this.changeWall());

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
                this.resumeGame();
            }
        });

        // this.timeSpeed = document.getElementById("speed");
        // this.speed = this.timeSpeed.options[this.timeSpeed.selectedIndex].value; //priview which option is selected and take the value from

        this.menu = document.getElementById('content__header');
        this.menuItem =  Array.prototype.slice.call(document.querySelectorAll('.content__header-menu-toggle'));

        // for (var i = 0; i < this.menuItem.length; ++i) {
        // 	this.menuItem[i].addEventListener('click', () => this.closeMenuToggle());
        // }
    }

    changeWall() {
        if(this.wall.checked) {
            document.getElementById('wallResult').innerHTML = 'AN';
        } else {
            document.getElementById('wallResult').innerHTML = 'Aus';
        }
    }

    closeMenuToggle() {
        this.menu.style.display = 'none';
    }

    startGame() {
        if (this.start == false) {
            this.running = true;
            this.start = true;
            this.moveSnake = true;
            // this.speed = this.timeSpeed.options[this.timeSpeed.selectedIndex].value;
            this.init();
            this.generateSnake();
            // this.changeWall();
            this.closeMenuToggle();
            // document.getElementById('resetBtn').style.display = 'block';
            // document.getElementById('startBtn').style.display = 'none';
            //document.getElementById('settings').style.display = 'block'; //should be display none as default
        }
    }

    resetGame() {
        if (this.start == true) {
            this.start = false;
            this.moveSnake = false;
            this.generateSnake();
            clearInterval(this.speedSetting);  //clears a timeset (for example a new interval)	
            this.ctx.clearRect(0, 0, 1300, 800);
            // document.getElementById('resetBtn').style.display = 'none';
            // document.getElementById('startBtn').style.display = 'block';
            // // document.getElementById('settings').style.display = 'none';
            // document.getElementById('resumeBtn').style.display = 'none';
        }
    }

    stopGame() {
        if (this.running == true) {
            this.running = false;
            clearInterval(this.speedSetting);
            // document.getElementById('settings').style.display = 'none';
            // document.getElementById('resumeBtn').style.display = 'block';
            this.menu.style.display = 'block';
        }
        // document.getElementsByClassName('menu').innerHTML = 
    }

    resumeGame() {
        if (this.running == false) {
            this.running = true;
            this.generateSnake();
            this.menu.style.display = 'none';
            // document.getElementById('settings').style.display = 'block';
            // document.getElementById('resumeBtn').style.display = 'none';
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
                this.ctx.clearRect(0, 0, 1300, 800);
                this.balls.shift(); //delete the last ball
                this.add();	
                this.lastBall = this.balls[this.balls.length - 1];

                if(this.lastBall.x == this.snakeFoodxOne && this.lastBall.y == this.snakeFoodyTwo){
                    this.score += 5;
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
                    
                    if (this.wall.checked) {
                        if(this.ball.x > 1300){
                            this.ball.x = 0;
                        }
                        if(this.ball.x < 0){
                            this.ball.x = 1300;
                        }
                        if(this.ball.y > 800){
                            this.ball.y = 0;
                        }
                        if(this.ball.y < 0){
                            this.ball.y = 800;
                        }
                    } else {
                        if(this.ball.x > 1300){
                            alert("Game Over! Your Score Is: " + this.score);
                            this.init();
                        }
                        if(this.ball.x < 0){
                            alert("Game Over! Your Score Is: " + this.score);
                            this.init();
                        }
                        if(this.ball.y > 800){
                            alert("Game Over! Your Score Is: " + this.score);
                            this.init();
                        }
                        if(this.ball.y < 0){
                            alert("Game Over! Your Score Is: " + this.score);
                            this.init();
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
                
            }, 300);
        }
    }
    // changeWall() {
    //     this.wall = document.getElementById('walls');
    //     this.wallRun = this.wall.options[this.wall.selectedIndex].value;
    // }
}

var snake = new Snake(


// optional features

);


