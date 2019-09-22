
class Snake {
    constructor() {
        this.speed = typeof this.speed !== 'undefined' ? this.speed: 200;

        this.drawn = document.getElementById('content__game-game-over-drawn');
        this.objScoreValue = [
            document.getElementById('scoreResult'),
            document.getElementById('scoreResultPL2'),
            document.getElementById('scoreResultPL3'),
            document.getElementById('scoreResultPL4')
        ];

        this.objHScore = [
            document.getElementById('highscoreResult'),
            document.getElementById('highscoreResultPL2'),
            document.getElementById('highscoreResultPL3'),
            document.getElementById('highscoreResultPL4')
        ];
       
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.start = false;
        this.startClicked = false;
        this.running = false;
        this.moveSnake = false;
        // this.counter = false;
        this.gameOver = false;
        this.arrayScore = [];

        this.menu = document.getElementById('content__header-wrapper');
        this.intro = document.getElementById('content__header-intro-container');
        this.game = document.getElementById('content__game');
        this.wall = document.getElementById('wallCheck');
        this.gameOverContainer = document.getElementById('content__game-game-over-wrapper');
        this.winner = document.getElementById('content__game-winner-first');

        this.totalHighscore = document.getElementById('content__header-intro-ths');
        this.difficulty = document.getElementById('difficultyDegreeValue');
        this.input = document.getElementById('range');
        this.pause = document.getElementById('content__game-pause');

        this.playerNumb = document.getElementById('playerRange');
        this.playerValue = document.getElementById('playerValue');

        this.setWalls = document.getElementById('wallResult');
        this.play = document.getElementById('submitBtn');

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

        this.playerNumb.addEventListener('mousemove', () => this.playerNumber(this.playerNumb.value));
        this.playerNumb.addEventListener('change', () => this.playerNumber(this.playerNumb.value));

        this.wall.addEventListener('click', () => this.changeWall());
        this.play.addEventListener('click', () => this.playerSettings());

        this.controls = [];
        this.players = [];
        this.startingPoints = [{
            x: 0, 
            y: 50
        },{
            x: 1800,
            y: 100
        },{
            x: 0,
            y: 800
        },{
            x: 1800,
            y: 750
        }]

        this.addPlayer(0, 'maroon');
        this.addControls(0, 38, 40, 37, 39);
            this.addPlayer(1, 'blue');
            this.addControls(1, 87, 83, 65, 68);

            this.addPlayer(2, 'purple');
            this.addControls(2, 85, 74, 72, 75);

            this.addPlayer(3, 'white');
            this.addControls(3, 104, 101, 100, 102);
        this.onKeyDown = this.onKeyDown.bind(this);

        document.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(e) {
        if(e.keyCode === 27) {
            this.stopGame();
            this.input.style.display = "block";
        }
        if(e.keyCode === 32) {
            this.pauseGame();
        }
        let player = this.players.map((player, id) => {
            if (!player.active || player.dead){
                return;
            }
            Object.keys(player.controls).map(possibleDirection => {
                if (e.keyCode !== player.controls[possibleDirection]) {
                    return;
                }
                if (Snake.getAxisBy(player.direction) === Snake.getAxisBy(possibleDirection)) {
                    return;
                }
                this.players[id].direction = possibleDirection;
            });
        });
    }

    static getAxisBy(direction) {
        return direction === 'left' || direction === 'right' ? 'x' : 'y';
    }
    
    addControls(id, up, down, left, right, stop, pause) {
        this.controls[id] = {
            up,
            down,
            left,
            right,
            stop,
            pause
        };
    }
    
    addPlayer(id, headColor, color = 'green') {
        this.players[id] = {
            active: true,
            dead: false,
            headColor,
            color,
            score: 0,
            highScore: 0,
            balls: [],
            direction: '',
            controls: this.controls[id]
        }
    }

    initPlayer(id) {
        this.players[id].direction = id % 2 ? 'left' : 'right';
        this.players[id].score = 0;   
        this.players[id].dead = false;
        this.players[id].active = true;
        let ball = {
            x: this.startingPoints[id].x,
            y: this.startingPoints[id].y
        }
        this.players[id].balls = [];
        
        for (let i = 0; i <3; ++i){
            this.players[id].balls[i] = {
                x: ball.x,
                y: ball.y
            }
            this.players[id].balls[i].x += 50 * (id % 2 ? -1 : 1) * i;
        }
    }
    

    playerSettings() {
        if (this.setPlayers >= 2) {
            this.addPlayer(1, 'blue');
            this.addControls(1, 87, 83, 65, 68);
        }

        if (this.setPlayers >= 3) {
            this.addPlayer(2, 'purple');
            this.addControls(2, 85, 74, 72, 75);
        }

        if (this.setPlayers > 3) {
            this.addPlayer(3, 'white');
            this.addControls(3, 104, 101, 100, 102);
        }
        this.startGame();
    }

    startGame() {
        if (this.startClicked === true) { //preview would start be clicked or not
            this.resetGame();
        }
        if (this.start === false) {
            this.running = true; //preview is the programm running
            this.start = true;
            this.moveSnake = true; //preview move snake?
            this.init();
            this.painter();
            this.closeMenuToggle();
            this.input.style.display = "none";
            this.drawn.style.display = 'none';
            this.gameOverContainer.style.display = 'none';
            this.startClicked = true;   
        }
    }

    resetGame() {
        if (this.start === true) {
            this.start = false;
            this.painter();
            clearInterval(this.speedSetting);	
            this.ctx.clearRect(0, 0, 1850, 900);
        }
    }

    stopGame() {
        clearInterval(this.speedSetting);
        if (this.startClicked === true) {
            if (this.running === true) {
                this.running = false;
                if (this.gameOver === false) {
                    this.openMenuToggle();
                }
                this.gameOver = false;
            } else {
                this.resumeGame();
                this.drawn.style.display = 'none';
                this.gameOverContainer.style.display = 'none';
            }
        }
    }

    pauseGame() {
        if (this.startClicked === true) {
            if (this.running === true) {
                this.running = false;
                clearInterval(this.speedSetting);
                this.pause.style.display = 'block';
            } else {
                this.resumeGame();
            }
        }
    }

    resumeGame() {
        if (this.running === false) {
            this.running = true;
            this.painter();
            this.closeMenuToggle();
            this.pause.style.display = 'none';
            this.drawn.style.display = 'none';
            this.gameOverContainer.style.display = 'none';
        }
    }

    init() {
        this.players.map((player, id) => {
            this.initPlayer(id)
        });
        this.createFood();
    }

    createFood() {
        this.foodx = this.foodArrayWidth[Math.floor(Math.random() * this.foodArrayWidth.length)];
        this.foody = this.foodArrayHeight[Math.floor(Math.random() * this.foodArrayHeight.length)];

        this.snakeFoodxOne = this.foodFirstPoint + this.foodx;
        this.snakeFoodxTwo = this.foodSecondPoint + this.foodx;
        this.snakeFoodyOne = this.foodSecondPoint + this.foody;
        this.snakeFoodyTwo = this.foodFirstPoint + this.foody;
    }

    addBallToPlayer(id) {
        let newBall = JSON.parse(JSON.stringify(this.players[id].balls)).pop();
        
        switch (this.players[id].direction) {
            case "up":
                newBall.y -= 50;
                break;
            case "down":
                newBall.y += 50;
                break;
            case "left":
                newBall.x -= 50;
                break;
            case "right":
                newBall.x += 50;
                break;
        }
        this.players[id].balls.push(newBall);
    }

    changePlayerHead(id) {
        this.addBallToPlayer(id);
        this.players[id].balls.shift();
        return this.players[id].balls.slice(-1).pop();
    }

    painter() {
        if (!this.moveSnake) {
            return;
        }
        this.speedSetting = setInterval(() => {
        
            this.ctx.clearRect(0, 0, 1850, 900);

            this.players.map((player, id) => {
                if (!player.active || player.dead){
                    return;
                }
            
                let snakeHead = this.changePlayerHead(id);
                if(snakeHead.x === this.snakeFoodxOne && snakeHead.y === this.snakeFoodyTwo){
                    this.players[id].score += 5;
                    this.objScoreValue[id].innerHTML = this.players[id].score;
                    this.addBallToPlayer(id);
                    this.createFood();
                }
                this.checkPlayerCollision(id, 'wall');
                this.checkPlayerCollision(id, 'self');
                this.checkPlayerCollision(id, 'others');
                this.paint('snake', id);
            });
            this.paint('food');
        
            this.isAnyPlayerAlive();
        }, this.speed);
    }

    paint(type, id = false) {
        if (!this.start)  {
            return;
        }

        if (type === "snake") {
            this.players[id].balls.map((ball, ballIndex) => {
                this.ctx.fillStyle = ballIndex === this.players[id].balls.length - 1 ? this.players[id].headColor : this.players[id].color;
                this.ctx.fillRect(ball.x, ball.y, 48, 48);
            })
        }

        if (type === "food") {
            this.ctx.fillStyle = "#DF7401";
            this.ctx.fillRect(this.snakeFoodxOne, this.snakeFoodyTwo, 48, 48);
        }
    }
    static maybeWalkThroughWalls(ball) {
        let maxX = 1800,
        maxY = 850;
        if (ball.x > maxX) {
            ball.x = 0
        }
        if (ball.x < 0) {
            ball.x = maxX
        }
        if (ball.y > maxY) {
            ball.y = 0
        }
        if (ball.y < 0) {
            ball.y = maxY
        }
        return ball;
    }
    static checkWallCollision(ball) {
        let maxX = 1800,
        maxY = 850;
        
        if (ball.x > maxX || ball.x < 0 || ball.y > maxY || ball.y < 0) {
            return true;
        }
        return false;
    }
    checkSnakeHeadCollisionForPlayer(id, balls) {
        let snakeHead =  this.players[id].balls.slice(-1).pop();
        balls.map(ball => {
            if (ball.x !== snakeHead.x || ball.y !== snakeHead.y) {
                return;
            }
            this.players[id].dead = true;
        })
    }
    checkPlayerCollision (id, type) {
        let player =  this.players[id];
        let balls = player.balls.slice(0);
        switch(type) {
            case "wall":
                player.balls.map((ball, ballId) => {
                    if (this.wall.checked) {
                        this.players[id].balls[ballId] = Snake.maybeWalkThroughWalls(ball);
                        return;
                    } 
                    if (Snake.checkWallCollision(ball)) {
                        this.players[id].dead = true;
                    }
                })
            case "others":
                let allBalls = this.players.reduce((balls, player, playerId) => {
                    if (player.active && !player.dead && playerId !== id) {
                        return balls.concat(player.balls);
                    }
                    return balls;
                }, [])
                this.checkSnakeHeadCollisionForPlayer(id, allBalls);
            default: {
                // Pop Head from Balls to prevent sudden death
                balls.pop();
                this.checkSnakeHeadCollisionForPlayer(id, balls);
            }
        }
    }

    getPlayerCount() {
        return this.players.reduce((acc, player) => acc + (player.active ? 1 : 0), 0)
    }

    isAnyPlayerAlive() {
        let isAlive = this.players.reduce((acc, player) => player.dead === false, false);
        if (isAlive) {
            return;
        }
        this.alertResult();
        if (this.getPlayerCount() === 1) {
            this.singleplayerGameOver();
        }
    }
    
    singleplayerGameOver() {
        this.input.style.display = "block";
        this.stopGame();
    }

    alertResult() {
        // this.gameOver = true;
        // this.input.style.display = "block";
        // console.log('alert');

        // if (this.players[0].score === this.players[1].score === this.players[2].score === this.players[3].score) {
        //     this.drawn.style.display = 'block';
        // } else {
        //     this.gameOverContainer.style.display = 'block';
        //     this.arrayScore = [];
        //     this.winner.innerHTML = '';
    
        //     this.scoreOutput();
    
        //     for (var i = 0; i < this.arrayScore.length; i++) {
        //         this.winner.innerHTML += this.arrayScore[i] + '<br/>';
        //     }
        // }
        // console.log('2');
        // this.init();
        this.stopGame();
        this.scoreCounter();
    }
    
    scoreOutput() { ///should be changed in a better and smaller function which sort it to and rank right
        if (this.objScoreValue.scoreValue.textContent > this.objScoreValue.scoreValuePL2.textContent) {
            this.arrayScore.push('1. PLAYER I: ' + this.objScoreValue.scoreValue.textContent + ' POINTS');
        } else if (this.objScoreValue.scoreValue.textContent > this.objScoreValue.scoreValuePL3.textContent) {
            this.arrayScore.push('2. PLAYER I: ' + this.objScoreValue.scoreValue.textContent + ' POINTS');
        } else if (this.objScoreValue.scoreValue.textContent > this.objScoreValue.scoreValuePL4.textContent) {
            this.arrayScore.push('3. PLAYER I: ' + this.objScoreValue.scoreValue.textContent + ' POINTS');
        } else {
            this.arrayScore.push('4. PLAYER I: ' + this.objScoreValue.scoreValue.textContent + ' POINTS');
        }
        
        if (this.objScoreValue.scoreValuePL2.textContent > this.objScoreValue.scoreValue.textContent) {
            this.arrayScore.push('1. PLAYER II: ' + this.objScoreValue.scoreValuePL2.textContent + ' POINTS');
        } else if (this.objScoreValue.scoreValuePL2.textContent > this.objScoreValue.scoreValuePL3.textContent) {
            this.arrayScore.push('2. PLAYER II: ' + this.objScoreValue.scoreValuePL2.textContent + ' POINTS');
        } else if (this.objScoreValue.scoreValuePL2.textContent > this.objScoreValue.scoreValuePL4.textContent) {
            this.arrayScore.push('3. PLAYER II: ' + this.objScoreValue.scoreValuePL2.textContent + ' POINTS');
        } else {
            this.arrayScore.push('4. PLAYER II: ' + this.objScoreValue.scoreValuePL2.textContent + ' POINTS');
        }
        
        if (this.objScoreValue.scoreValuePL3.textContent > this.objScoreValue.scoreValue.textContent) {
            this.arrayScore.push('1. PLAYER III: ' + this.objScoreValue.scoreValuePL3.textContent + ' POINTS');
        } else if (this.objScoreValue.scoreValuePL3.textContent > this.objScoreValue.scoreValuePL2.textContent) {
            this.arrayScore.push('2. PLAYER III: ' + this.objScoreValue.scoreValuePL3.textContent + ' POINTS');
        } else if (this.objScoreValue.scoreValuePL3.textContent > this.objScoreValue.scoreValuePL4.textContent) {
            this.arrayScore.push('3. PLAYER III: ' + this.objScoreValue.scoreValuePL3.textContent + ' POINTS');
        } else {
            this.arrayScore.push('4. PLAYER III: ' + this.objScoreValue.scoreValuePL3.textContent + ' POINTS');
        }
        
        if (this.objScoreValue.scoreValuePL4.textContent > this.objScoreValue.scoreValue.textContent) {
            this.arrayScore.push('1. PLAYER IV: ' + this.objScoreValue.scoreValuePL4.textContent + ' POINTS');
        } else if (this.objScoreValue.scoreValuePL4.textContent > this.objScoreValue.scoreValuePL2.textContent) {
            this.arrayScore.push('2. PLAYER IV: ' + this.objScoreValue.scoreValuePL4.textContent + ' POINTS');
        } else if (this.objScoreValue.scoreValuePL4.textContent > this.objScoreValue.scoreValuePL3.textContent) {
            this.arrayScore.push('3. PLAYER IV: ' + this.objScoreValue.scoreValuePL4.textContent + ' POINTS');
        } else {
            this.arrayScore.push('4. PLAYER IV: ' + this.objScoreValue.scoreValuePL4.textContent + ' POINTS');
        }
    }

    scoreCounter(id, scoreValue, highscore) {
        if (!this.players[id]) {
            return;
        }
        this.objScoreValue[scoreValue].innerHTML = 0;
        if (this.players[id] > this.objHScore[highscore].textContent) { 
            this.objHScore[highscore].innerHTML = this.players[id].score;
        }
        if (this.players[id].score > this.totalHighscore.textContent) {
            this.totalHighscore.innerHTML = this.players[id].score;
        }
    }
    
    rangeSlider(value) {
        document.getElementById('rangeValue').innerHTML = value;
        this.speed = value;
        if (this.speed < 150) {
            this.difficulty.innerHTML = 'Legend';
        }
        if(this.speed < 200) {
            this.difficulty.innerHTML = 'Master';
        }
        if(this.speed >= 200) {
            this.difficulty.innerHTML = 'Normal';
        }
        if (this.speed > 300) {
            this.difficulty.innerHTML = 'Easy';
        }
        if (this.speed > 350) {
            this.difficulty.innerHTML = 'Stoned';
        }
    }

    playerNumber(value) {
        this.playerValue.innerHTML = value;
        this.setPlayers = value;
    }

    changeWall() {
        if(this.wall.checked) {
            this.setWalls.innerHTML = 'An';
        } else {
            this.setWalls.innerHTML = 'Aus';
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

