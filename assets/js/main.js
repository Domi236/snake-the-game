
class Snake {
    constructor(config) {
        
        this.speed = typeof this.speed !== 'undefined' ? this.speed: 200;

        this.drawn = document.getElementById('content__game-game-over-drawn');
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

        this.num = 0;
        ///////////
        this.log = console.log;
        ///////////

        this.start = false;
        this.startClicked = false;
        this.running = false;
        this.moveSnake = false
        this.gameOver = false;
        this.square = 20;
        this.displayResults = false;

        this.resultsFirstPlace = document.getElementById('content__game-winner--1');
        this.resultsSecondPlace = document.getElementById('content__game-winner--2');
        this.resultsThirdPlace = document.getElementById('content__game-winner--3');
        this.resultsFourthPlace = document.getElementById('content__game-winner--4');

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
        this.replay = document.getElementById('content__game-replay-button');
        this.goHome = document.getElementById('content__game-home-button');

        this.playerNumb = document.getElementById('playerRange');
        this.playerValue = document.getElementById('playerValue');

        this.setWalls = document.getElementById('wallResult');
        this.play = document.getElementById('submitBtn');

        this.input.addEventListener('mousemove', () => this.rangeSlider(this.input.value));
        this.input.addEventListener('change', () => this.rangeSlider(this.input.value));
        window.addEventListener('resize', () => this.fieldSizing());

        this.playerNumb.addEventListener('mousemove', () => this.playerNumber(this.playerNumb.value));
        this.playerNumb.addEventListener('change', () => this.playerNumber(this.playerNumb.value));

        this.wall.addEventListener('click', () => this.changeWall());
        this.controls.addEventListener('click', () => this.setControls());
        this.gameModes.addEventListener('click', () => this.setGameMode());
        this.items.addEventListener('click', () => this.setItems());
        this.play.addEventListener('click', () => this.startGame());
        this.replay.addEventListener('click', () => this.startGame());
        this.goHome.addEventListener('click', () => this.backToHomeScreen());

        // this.maxX = this.fieldWidth - this.square;
        // this.maxY = this.fieldHeight - this.square;

        this.controls = [];
        this.players = [];
        this.startingPoints = [{
            x: 0, 
            y: this.square
        },{
            x: this.fieldWidth - this.square,
            y: this.square * 2
        },{
            x: 0,
            y: this.fieldHeight - (this.square * 2)
        },{
            x: this.fieldWidth - this.square,
            y: this.fieldHeight - (this.square * 3)
        }]

        this.onKeyDown = this.onKeyDown.bind(this);
        document.addEventListener('keydown', this.onKeyDown);
    }

    fieldSizing() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        
        if(this.windowWidth > 500 || this.windowHeight > 500) {  // need to make the same for resizeing and bevor the class
            this.square = 30;
        }
        if (this.windowWidth > 1000 || this.windowHeight > 1000) {
            this.square = 40;
        }
        if (this.windowWidth > 1500 || this.windowHeight > 1500) {
            this.square = 50;
        }
        this.squareWidthRest = this.windowWidth % this.square;
        this.squareHeightRest = this.windowHeight % this.square;

        this.fieldWidth = this.windowWidth - this.squareWidthRest;
        this.fieldHeight = this.windowHeight - this.squareHeightRest;

        document.getElementById('content__game-canvas-container').innerHTML = "<canvas id='canvas' width='" + this.fieldWidth + "' height='" + this.fieldHeight + "'></canvas>";
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.squareWidthLength = this.windowWidth / this.square;
        this.squareHeightLength = this.windowHeight / this.square;

        this.startingPoints = [{
            x: 0, 
            y: this.square
        },{
            x: this.fieldWidth - this.square,
            y: this.square * 2
        },{
            x: 0,
            y: this.fieldHeight - (this.square)
        },{
            x: this.fieldWidth - this.square,
            y: this.fieldHeight - (this.square * 2)
        }]
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
            this.players[id].balls[i].x += this.square * (id % 2 ? -1 : 1) * i;
        }
    }


    startGame() {
        this.playerSetting();
        if (this.startClicked === true) { //preview would start be clicked or not
            this.resetGame();
        }
        if (this.start === false) {
            this.fieldSizing();
            this.running = true; //preview is the programm running
            this.start = true;
            this.moveSnake = true; //preview move snake?
            this.init();
            this.painter();
            this.closeMenuToggle();
            this.drawn.style.display = 'none';
            this.gameOverContainer.style.display = 'none';
            this.gameModesConfig.style.display = 'none';
            this.itemsConfig.style.display = 'none';
            this.controlsConfig.style.display = 'none';
            this.startClicked = true;   
        }
    }

    playerSetting() {
        // let setting = [  why this not func?
        //     [
        //         [0, 38, 40, 37, 39],
        //         [0, 'maroon']
        //     ],
        //     [
        //         [1, 87, 83, 65, 68],
        //         [1, 'blue']
        //     ],
        //     [
        //         [2, 85, 74, 72, 75],
        //         [2, 'purple']
        //     ],
        //     [
        //         [3, 104, 101, 100, 102],
        //         [3, 'white']
        //     ]
        // ]
        
        // setting.forEach((item) => {
        //         this.addControls(item[0]);
        //         this.addPlayer(item[1]);
        //         this.log(item[0])
        //         this.log(item[1])
        // })

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
            this.ctx.clearRect(0, 0, this.fieldWidth, this.fieldHeight);
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
            } else if (this.displayResults === true) {
                this.gameOverContainer.style.display = 'block';
            } else {
                this.resumeGame();

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
        this.foodx = this.square * Math.floor(Math.random()* this.squareWidthLength);
        this.foody = this.square * Math.floor(Math.random()* this.squareHeightLength);
        this.foodFirstPoint = this.square;
        this.foodSecondPoint = this.square * 2;

        this.snakeFoodxOne = this.foodFirstPoint + this.foodx;
        this.snakeFoodxTwo = this.foodSecondPoint + this.foodx;
        this.snakeFoodyOne = this.foodSecondPoint + this.foody;
        this.snakeFoodyTwo = this.foodFirstPoint + this.foody;
    }

    addBallToPlayer(id) {
        let newBall = JSON.parse(JSON.stringify(this.players[id].balls)).pop();
        
        switch (this.players[id].direction) {
            case "up":
                newBall.y -= this.square;
                break;
            case "down":
                newBall.y += this.square;
                break;
            case "left":
                newBall.x -= this.square;
                break;
            case "right":
                newBall.x += this.square;
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
            this.ctx.clearRect(0, 0, this.fieldWidth, this.fieldHeight);

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
                this.ctx.fillRect(ball.x, ball.y, (this.square - 2), (this.square - 2));
            })
        }

        if (type === "food") {
            this.ctx.fillStyle = "#DF7401";
            this.ctx.fillRect(this.snakeFoodxOne, this.snakeFoodyTwo, (this.square - 2), (this.square - 2));
        }
    }

    static maybeWalkThroughWalls(ball) {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        
        if(this.windowWidth > 500 || this.windowHeight > 500) {  // need to make the same for resizeing and bevor the class
            this.square = 30;
        }
        if (this.windowWidth > 1000 || this.windowHeight > 1000) {
            this.square = 40;
        }
        if (this.windowWidth > 1500 || this.windowHeight > 1500) {
            this.square = 50;
        }
        this.squareWidthRest = this.windowWidth % this.square;
        this.squareHeightRest = this.windowHeight % this.square;

        this.fieldWidth = this.windowWidth - this.squareWidthRest;
        this.fieldHeight = this.windowHeight - this.squareHeightRest;

        let maxX = this.fieldWidth - this.square,
        maxY = this.fieldHeight - this.square;
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
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        
        if(this.windowWidth > 500 || this.windowHeight > 500) {  // need to make the same for resizeing and bevor the class
            this.square = 30;
        }
        if (this.windowWidth > 1000 || this.windowHeight > 1000) {
            this.square = 40;
        }
        if (this.windowWidth > 1500 || this.windowHeight > 1500) {
            this.square = 50;
        }
        this.squareWidthRest = this.windowWidth % this.square;
        this.squareHeightRest = this.windowHeight % this.square;

        this.fieldWidth = this.windowWidth - this.squareWidthRest;
        this.fieldHeight = this.windowHeight - this.squareHeightRest;

        let maxX = this.fieldWidth - this.square,
        maxY = this.fieldHeight - this.square;
        
        if (ball.x > maxX || ball.x < 0 || ball.y > maxY || ball.y < 0) {
            console.log(ball.x);
            console.log(ball.y);
            console.log(this.fieldWidth);
            console.log(this.fieldHeight);
            console.log(this.square);
            console.log(maxX);
            console.log(maxY);
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
                        console.log('checked');
                        return;
                    } 
                    if (Snake.checkWallCollision(ball)) {
                        console.log('dead');
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

        let scores = [ [], [], [], [] ];
        let sortedScores = [ [], [], [], [] ];

        for(let n = 0, i = 1; n < this.objScoreValue.length; n++, i++) {
            scores[n].push('Player ' + [i] + ' has ');
            scores[n].push(parseInt(this.objScoreValue[n].textContent));
        }

        for(let n = 0; n < sortedScores.length; n++) {
            sortedScores[n].push(parseInt(this.objScoreValue[n].textContent));
        }

        sortedScores.sort().reverse();

        sortedScores.forEach((item) => {

            if(item.includes(scores[0][1])) {
                item.splice(1, 1, scores[0][0])
                scores.splice(0, 1)

            } else if(item.includes(scores[1][1])) {
                item.splice(1, 1, scores[1][0])
                scores.splice(1, 1)

            } else if(item.includes(scores[2][1])) {
                item.splice(1, 1, scores[2][0])
                scores.splice(2, 1)

            } else {
                item.splice(1, 1, scores[3][0])
                scores.splice(3, 1)
            }

            item.reverse();
            item.splice(2, 1, ' Points');
            // item.join('') why this not func??
            // item.toString() why this not func??
        });

        for(let n = 1, i = 0; i < sortedScores.length; i++, n++) {
            let result = document.getElementById(`content__game-winner--${[n]}`)
            result.innerHTML = sortedScores[i];
        }

        this.objScoreValue.forEach((objScoreValues) => {
            objScoreValues.innerHTML = 0;
        });

        this.running = false
        this.displayResults = true;
        this.stopGame();
    }

    backToHomeScreen() {
        this.running = true
        this.displayResults = false;
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
        this.game.style.transform = 'translateY(-99%)';
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

