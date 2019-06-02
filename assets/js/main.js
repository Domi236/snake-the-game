
class Snake {
    constructor(config) {


        this.speed = typeof this.speed !== 'undefined' ? this.speed: 200;

        this.drawn = document.getElementById('content__game-game-over-drawn');

        this.windowWidth = document.body.offsetWidth;
        this.windowHeight = document.body.offsetHeight;

        this.startingPointsX1 = 0
        this.startingPointsY1 = this.windowHeight/100 * 2.5
        console.log(this.startingPointsY1);
        this.startingPointsX2 = this.windowWidth/100 * 97.5 
        console.log(this.startingPointsX2); 
        this.startingPointsY2 = this.windowHeight/100 * 2.5 
        console.log(this.startingPointsY2);
        this.startingPointsX3 = this.windowWidth/100 * 2.5  
        console.log(this.startingPointsX3);
        this.startingPointsY3 = this.windowHeight/100 * 97.5  
        console.log(this.startingPointsY3);
        this.startingPointsX4 = this.windowWidth/100 * 97.5  
        console.log(this.startingPointsX4);
        this.startingPointsY4 = this.windowHeight/100 * 97.5
        console.log(this.startingPointsY4);
        
        this.objScoreValue = [
            document.getElementById('scoreResultPL1'),
            document.getElementById('scoreResultPL2'),
            document.getElementById('scoreResultPL3'),
            document.getElementById('scoreResultPL4')
        ];

        this.objHScore = [
            document.getElementById('highscoreResultPL1'),
            document.getElementById('highscoreResultPL2'),
            document.getElementById('highscoreResultPL3'),
            document.getElementById('highscoreResultPL4')
        ];
       
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.start = false;
        this.startClicked = false;
        this.running = false;
        this.moveSnake = false
        this.gameOver = false;
        
        this.menu = document.getElementById('content__header-wrapper');
        this.intro = document.getElementById('content__header-intro-container');
        this.game = document.getElementById('content__game');
        this.wall = document.getElementById('wallCheck');
        this.controls = document.getElementById('content__header-menu-controls');
        this.controlsConfig = document.getElementById('content__player-controls-display');
        this.gameModes = document.getElementById('content__header-menu-game-mods');
        this.gameModesConfig = document.getElementById('content__game-mods');
        this.items = document.getElementById('content__header-menu-items');
        this.itemsConfig = document.getElementById('content__items-wrapper');
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

        this.foodFirstPoint = 0;
        this.foodSecondPoint = 5;

        this.foodArrayWidth = [(this.windowWidth/100*2.5), (this.windowWidth/100*2.5) * 2, (this.windowWidth/100*2.5) * 3, (this.windowWidth/100*2.5) * 4, (this.windowWidth/100*2.5) * 5, (this.windowWidth/100*2.5) * 6, (this.windowWidth/100*2.5) * 7, (this.windowWidth/100*2.5) * 8, (this.windowWidth/100*2.5) * 9, (this.windowWidth/10*2.5), (this.windowWidth/100*2.5) * 11, (this.windowWidth/100*2.5) * 12, (this.windowWidth/100*2.5) * 13, (this.windowWidth/100*2.5) * 14, (this.windowWidth/100*2.5) * 15, (this.windowWidth/100*2.5) * 16, (this.windowWidth/100*2.5) * 17, (this.windowWidth/100*2.5) * 18, (this.windowWidth/100*2.5) * 19, (this.windowWidth/10*2.5) * 2, (this.windowWidth/100*2.5) * 21, (this.windowWidth/100*2.5) * 22,
            (this.windowWidth/100*2.5) * 23, (this.windowWidth/100*2.5) * 24, (this.windowWidth/100*2.5) * 25, (this.windowWidth/100*2.5) * 26, (this.windowWidth/100*2.5) * 23, (this.windowWidth/100*2.5) * 24, (this.windowWidth/100*2.5) * 25, (this.windowWidth/100*2.5) * 26, (this.windowWidth/100*2.5) * 27, (this.windowWidth/100*2.5) * 28, (this.windowWidth/100*2.5) * 29, (this.windowWidth/100*2.5) * 30, (this.windowWidth/100*2.5) * 31, (this.windowWidth/100*2.5) * 32];
        this.foodArrayHeight = [(this.windowWidth/100*2.5), (this.windowWidth/100*2.5) * 2, (this.windowWidth/100*2.5) * 3, (this.windowWidth/100*2.5) * 4, (this.windowWidth/100*2.5) * 5, (this.windowWidth/100*2.5) * 6, (this.windowWidth/100*2.5) * 7, (this.windowWidth/100*2.5) * 8, (this.windowWidth/100*2.5) * 9, (this.windowWidth/100*2.5) * 10];

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
        this.controls.addEventListener('click', () => this.setControls());
        this.gameModes.addEventListener('click', () => this.setGameMode());
        this.items.addEventListener('click', () => this.setItems());
        this.play.addEventListener('click', () => this.startGame());

        this.controls = [];
        this.players = [];
        this.startingPoints = [{
            x: this.startingPointsX1, 
            y: this.startingPointsY1
        },{
            x: this.startingPointsX2,
            y: this.startingPointsY2
        },{
            x: this.startingPointsX3,
            y: this.startingPointsY3
        },{
            x: this.startingPointsX4,
            y: this.startingPointsY4
        }]

        this.onKeyDown = this.onKeyDown.bind(this);
        document.addEventListener('keydown', this.onKeyDown);
    }

    checkWindowSize() {
        console.log("Die aktuelle Fenstergröße\n Breite: " +  
        this.windowWidth + "  Höhe: " + this.windowHeight + " Pixel")  
    } 

    

    onKeyDown(e) {
        if(e.keyCode === 27) {
            this.stopGame();
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
            this.players[id].balls[i].x += (this.windowWidth/100 * 5) * (id % 2 ? -1 : 1) * i;
            console.log(this.players[id].balls[i].x);
        }
    }


    startGame() {
        console.log((this.windowWidth/100*2.5) * 10, 'hall');
        this.checkWindowSize();
        this.playerSetting();
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
            this.drawn.style.display = 'none';
            this.gameOverContainer.style.display = 'none';
            this.startClicked = true;   
        }
    }

    playerSetting() {
        this.addControls(0, 38, 40, 37, 39);
        this.addPlayer(0, 'maroon');
        if (this.setPlayers > 1) {
            this.addControls(1, 87, 83, 65, 68);
            this.addPlayer(1, 'blue');
        }
        if (this.setPlayers > 2) {
            this.addControls(2, 85, 74, 72, 75);
            this.addPlayer(2, 'purple');
        }
        if (this.setPlayers > 3) {
            this.addControls(3, 104, 101, 100, 102);
            this.addPlayer(3, 'white');
        }
    }

    resetGame() {
        if (this.start === true) {
            this.start = false;
            this.painter();
            clearInterval(this.speedSetting);	
            this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
        }
    }

    stopGame() {
        clearInterval(this.speedSetting);
        if (this.startClicked === true) {
            if (this.running === true) {
                this.running = false;
                if (this.gameOver === false) { //if stop was pressed first time
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
                newBall.y -= this.windowWidth/100 * 2.5;
                break;
            case "down":
                newBall.y += this.windowWidth/100 * 2.5;
                break;
            case "left":
                newBall.x -= this.windowWidth/100 * 2.5;
                break;
            case "right":
                newBall.x += this.windowWidth/100 * 2.5;
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
            this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);

            this.players.map((player, id) => {
                if (!player.active || player.dead){
                    return;
                }
            
                let snakeHead = this.changePlayerHead(id);
                if(snakeHead.x === this.snakeFoodxOne && snakeHead.y === this.snakeFoodyTwo){
                    this.players[id].score += 5;
                    this.objScoreValue[id].innerHTML = this.players[id].score;
                    if (this.players[id].score > this.objHScore[id].textContent) { 
                        this.objHScore[id].innerHTML = this.players[id].score;
                    }
                    if (this.players[id].score > this.totalHighscore.textContent) {
                        this.totalHighscore.innerHTML = this.players[id].score;
                    }

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
                this.ctx.fillRect(ball.x, ball.y, (this.windowWidth/100 * 2.5), (this.windowWidth/100 * 2.5));
            })
        }

        if (type === "food") {
            this.ctx.fillStyle = "#DF7401";
            this.ctx.fillRect(this.snakeFoodxOne, this.snakeFoodyTwo, (this.windowWidth/100 * 2.5), (this.windowWidth/100 * 2.5));
        }
    }

    static maybeWalkThroughWalls(ball) {
        let maxX = this.windowWidth, //1845
        maxY = this.windowHeight; // 895
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
        let maxX = this.windowWidth,
        maxY = this.windowHeight;
        
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
        this.gameOver = false;
    }

    alertResult() {
        this.objScoreValue[0].innerHTML = 0;
        this.objScoreValue[1].innerHTML = 0;
        this.objScoreValue[2].innerHTML = 0;
        this.objScoreValue[3].innerHTML = 0;
        this.stopGame();
        this.gameOver = true;
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

    setControls() {
        this.intro.style.display = 'none';
        this.itemsConfig.style.display = 'none'; 
        this.gameModesConfig.style.display = 'none';  
        this.controlsConfig.style.display = 'block';
    }

    setGameMode() {
        this.intro.style.display = 'none';
        this.itemsConfig.style.display = 'none'; 
        this.controlsConfig.style.display = 'none';
        this.gameModesConfig.style.display = 'block';                
    }

    setItems() {
        this.intro.style.display = 'none';
        this.gameModesConfig.style.display = 'none';  
        this.controlsConfig.style.display = 'none';
        this.itemsConfig.style.display = 'block';                
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

