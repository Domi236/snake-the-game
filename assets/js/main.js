

class Snake {
    constructor() {
        this.speed = typeof this.speed !== 'undefined' ? this.speed: 200;

        //only when multiplayer is active
        this.drawn = document.getElementById('content__game-game-over-drawn');
        this.death = 0;

        this.objPlayer = {
            players: true,
            multiplayer: false,
            multiplayerPL3: true,
            multiplayerPL4: true
        };

        this.objScoreValue = {
            scoreValue: document.getElementById('scoreResult'),
            scoreValuePL2: document.getElementById('scoreResultPL2'),
            scoreValuePL3: document.getElementById('scoreResultPL3'),
            scoreValuePL4: document.getElementById('scoreResultPL4')
        };

        this.objScore = {
            score: 0,
            scorePL2: 0,
            scorePL3: 0,
            scorePL4: 0
        };

        this.objHScore = {
            highscore: document.getElementById('highscoreResult'),
            highscorePL2: document.getElementById('highscoreResultPL2'),
            highscorePL3: document.getElementById('highscoreResultPL3'),
            highscorePL4: document.getElementById('highscoreResultPL4')
        };

        this.objPlayerCountDeath = {
            player1: 0,
            player2: 0,
            player3: 0,
            player4: 0
        };

        this.objBalls = {
            balls: [
                {x:0, y:50},
                {x:50, y:50},
                {x:100, y:50}],
            ballsPL2: [
                {x:1800, y:100},   
                {x:1750, y:100},
                {x:1700, y:100}],
            ballsPL3: [
                {x:0, y:800},   
                {x:50, y:800},
                {x:100, y:800}],
            ballsPL4: [
                {x:1800, y:750},   
                {x:1750, y:750},
                {x:1700, y:750}
            ]
        };

        this.objBall = {
            ball: [],
            ballPL2: [],
            ballPL3: [],
            ballPL4: []
        };
        
        this.objLastball = {
            lastball: [],
            lastballPL2: [],
            lastballPL3: [],
            lastballPL4: []
        };

        this.objCrashSnake = {
            crashSnake: 1,
            crashSnakePL2: 2,
            crashSnakePL3: 3,
            crashSnakePL4: 4
        };

        this.objfood = {
            food: 'PL1',
            foodPL2: 'PL2',
            foodPL3: 'PL3',
            foodPL4: 'PL4'
        }

        this.objKeyCodeRight = {
            right: 'right',
            rightPL2: 'rightPL2',
            rightPL3: 'rightPL3',
            rightPL4: 'rightPL4'
        }
        this.objKeyCodeDown = {
            down: 'down',
            downPL2: 'downPL2',
            downPL3: 'downPL3',
            downPL4: 'downPL4'
        }
        this.objKeyCodeLeft = {
            left: 'left',
            leftPL2: 'leftPL2',
            leftPL3: 'leftPL3',
            leftPL4: 'leftPL4'
        }
        this.objKeyCodeUp = {
            up: 'up',
            upPL2: 'upPL2',
            upPL3: 'upPL3',
            upPL4: 'upPL4'
        }
        
        this.objKey = {
            key: 'right',
            keyPL2: 'leftPL2',
            keyPL3: 'rightPL3',
            keyPL4: 'leftPL4'
        }

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.start = false;
        this.startClicked = false;
        this.running = false
        this.moveSnake = false;
        this.counter = false;
        this.alert = false;
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
            if (this.objPlayerCountDeath.player1 == 0) {
                if(this.keyCode == 37 && this.objKey.key != 'right'){
                    this.objKey.key = 'left';
                } 
                if(this.keyCode == 38 && this.objKey.key != 'down'){
                    this.objKey.key = 'up';
                }
                if(this.keyCode == 39 && this.objKey.key != 'left'){
                    this.objKey.key = 'right';
                }
                if(this.keyCode == 40 && this.objKey.key != 'up'){
                    this.objKey.key = 'down';
                }
            }
            //only when multiplayer is active
            if(this.multiplayer == true && this.objPlayerCountDeath.player2 == 0) {
                if(this.keyCode == 65 && this.objKey.keyPL2 != 'rightPL2'){
                    this.objKey.keyPL2 = 'leftPL2';
                } 
                if(this.keyCode == 87 && this.objKey.keyPL2 != 'downPL2'){
                    this.objKey.keyPL2 = 'upPL2';
                }
                if(this.keyCode == 68 && this.objKey.keyPL2 != 'leftPL2'){
                    this.objKey.keyPL2 = 'rightPL2';
                }
                if(this.keyCode == 83 && this.objKey.keyPL2 != 'upPL2'){
                    this.objKey.keyPL2 = 'downPL2';
                }
            }
            //only when multiplayerPL3 is active
            if(this.multiplayerPL3 == true && this.objPlayerCountDeath.player3 == 0) {
                if(this.keyCode == 72 && this.objKey.keyPL3 != 'rightPL3'){
                    this.objKey.keyPL3 = 'leftPL3';
                } 
                if(this.keyCode == 85 && this.objKey.keyPL3 != 'downPL3'){
                    this.objKey.keyPL3 = 'upPL3';
                }
                if(this.keyCode == 75 && this.objKey.keyPL3 != 'leftPL3'){
                    this.objKey.keyPL3 = 'rightPL3';
                }
                if(this.keyCode == 74 && this.objKey.keyPL3 != 'upPL3'){
                    this.objKey.keyPL3 = 'downPL3';
                }
            }
            //only when multiplayerPL4 is active
            if(this.multiplayerPL4 == true && this.objPlayerCountDeath.player4 == 0) {
                if(this.keyCode == 100 && this.objKey.keyPL4 != 'rightPL4'){
                    this.objKey.keyPL4 = 'leftPL4';
                } 
                if(this.keyCode == 104 && this.objKey.keyPL4 != 'downPL4'){
                    this.objKey.keyPL4 = 'upPL4';
                }
                if(this.keyCode == 102 && this.objKey.keyPL4 != 'leftPL4'){
                    this.objKey.keyPL4 = 'rightPL4';
                }
                if(this.keyCode == 101 && this.objKey.keyPL4 != 'upPL4'){
                    this.objKey.keyPL4 = 'downPL4';
                }
            }
            if(this.keyCode == 27) {
                this.stopGame();
                this.input.style.display = "block";
            }
            if(this.keyCode == 32) {
                this.pauseGame();
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
            this.drawn.style.display = 'none';
            this.gameOverContainer.style.display = 'none';
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
                if (this.gameOver == false) {
                    this.openMenuToggle();
                }
                this.gameOver = false;
                this.counter = true; 
            } else {
                this.counter = false;
                this.resumeGame();
                this.drawn.style.display = 'none';
                this.gameOverContainer.style.display = 'none';
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
            this.drawn.style.display = 'none';
            this.gameOverContainer.style.display = 'none';
        }
    }

    init(){
        this.death = this.objPlayerCountDeath.player1 = this.objPlayerCountDeath.player2 = this.objPlayerCountDeath.player3 = this.objPlayerCountDeath.player4 = 0;

        this.objKey.key = 'right';
        this.objScore.score = 0;
    
        this.objBalls.balls = [
            {x:0, y:50},
            {x:50, y:50}, 
            {x:100, y:50}
        ];
        if (this.objPlayer.multiplayer == true) {
            this.objKey.keyPL2 = 'leftPL2';
            this.objScore.scorePL2 = 0;
            if (this.objPlayer.multiplayerPL4 == true) {
                this.objBalls.ballsPL2 = [
                    {x:1800, y:100},   
                    {x:1750, y:100},
                    {x:1700, y:100}
                ];
            } else {
                this.objBalls.ballsPL2 = [
                    {x:1800, y:800},   
                    {x:1750, y:800},
                    {x:1700, y:800}
                ];
            }
        }
        if (this.objPlayer.multiplayerPL3 == true) {
            this.objKey.keyPL3 = 'rightPL3';
            this.objScore.scorePL3 = 0;
            this.objBalls.ballsPL3 = [
                {x:0, y:800},   
                {x:50, y:800},
                {x:100, y:800}
            ];
        }
        if (this.objPlayer.multiplayerPL4 == true) {
            this.objKey.keyPL4 = 'leftPL4';
            this.objScore.scorePL4 = 0;
            this.objBalls.ballsPL4 = [
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

    generateSnake() {
        if (this.moveSnake == true) {
            this.speedSetting = setInterval(() => {
                this.ctx.clearRect(0, 0, 1850, 900);
                this.removeEachTime(this.objPlayer, this.objPlayerCountDeath, this.objBalls);
                this.addEachTime(this.objPlayer, this.objPlayerCountDeath, this.objLastball, this.objBalls, this.objKey, this.objKeyCodeRight, this.objKeyCodeDown, this.objKeyCodeLeft, this.objKeyCodeUp);
                this.eatFood(this.objPlayer, this.objPlayerCountDeath, this.objLastball, this.objBalls, this.objScore, this.objScoreValue, this.objfood);
                this.crashWallAndPaintSnakes(this.objPlayer, this.objBalls, this.objBall, this.objPlayerCountDeath);
                this.crashOwnSnake(this.objPlayer, this.objBalls, this.objBall, this.objLastball, this.objPlayerCountDeath);
                this.crashSnakes(this.objBalls, this.objBall, this.objCrashSnake, this.objPlayer, this.objPlayerCountDeath);
    
                if (this.start == true) {
                    this.ctx.fillRect(this.snakeFoodxOne, this.snakeFoodyTwo, 49, 49);
                    this.ctx.fillStyle = "#DF7401";
                    this.ctx.fill();
                } 
    
            }, this.speed);
        }
    }

    add(PL, PLCD, LB, Bs, K, KCR, KCD, KCL, KCU){
        if (this.objPlayer[PL] == true && this.objPlayerCountDeath[PLCD] == 0) {
            this.objLastball[LB] = this.objBalls[Bs][this.objBalls[Bs].length - 1];
            if(this.objKey[K] == this.objKeyCodeRight[KCR]){
                this.objBalls[Bs].push({x:this.objLastball[LB].x + 50, y:this.objLastball[LB].y});
            }
            if(this.objKey[K] == this.objKeyCodeDown[KCD]){
                this.objBalls[Bs].push({x:this.objLastball[LB].x, y:this.objLastball[LB].y + 50});
            }
            if(this.objKey[K] == this.objKeyCodeLeft[KCL]){
                this.objBalls[Bs].push({x:this.objLastball[LB].x - 50, y:this.objLastball[LB].y});
            }
            if(this.objKey[K] == this.objKeyCodeUp[KCU]){
                this.objBalls[Bs].push({x:this.objLastball[LB].x, y:this.objLastball[LB].y - 50});
            }
        }
    }

    addEachTime(PL, PLCD, LB, Bs, K, KCR, KCD, KCL, KCU){
        if (this.objPlayer[PL] == true && this.objPlayerCountDeath[PLCD] == 0) {
            this.objLastball[LB] = this.objBalls[Bs][this.objBalls[Bs].length - 1];
            if(this.objKey[K] == this.objKeyCodeRight[KCR]){
                this.objBalls[Bs].push({x:this.objLastball[LB].x + 50, y:this.objLastball[LB].y});
            }
            if(this.objKey[K] == this.objKeyCodeDown[KCD]){
                this.objBalls[Bs].push({x:this.objLastball[LB].x, y:this.objLastball[LB].y + 50});
            }
            if(this.objKey[K] == this.objKeyCodeLeft[KCL]){
                this.objBalls[Bs].push({x:this.objLastball[LB].x - 50, y:this.objLastball[LB].y});
            }
            if(this.objKey[K] == this.objKeyCodeUp[KCU]){
                this.objBalls[Bs].push({x:this.objLastball[LB].x, y:this.objLastball[LB].y - 50});
            }
        }
    }

    eatFood(PL, PLCD, LB, Bs, S, SV, F) {
        if (this.objPlayer[PL] == true && this.objPlayerCountDeath[PLCD] == 0) {
            this.objLastball[LB] = this.objBalls[Bs][this.objBalls[Bs].length - 1];
    
            if(this.objLastball[LB].x == this.snakeFoodxOne && this.objLastball[LB].y == this.snakeFoodyTwo){
                this.objScore[S] += 5;
                this.objScoreValue[SV].innerHTML = this.objScore[S];
                this.objfood[F] = 'PL1';
                this.add(PL, PLCD, LB, Bs, K, KCR, KCD, KCL, KCU);
                this.createFood();
            }
        }
    }

    crashWallAndPaintSnakes(PL, Bs, B, PLCD) {
        if (this.objPlayer[PL] == 0) {
            for(var i = 0; i < this.objBalls[Bs].length; i++){
                this.objBall[B] = this.objBalls[Bs][i];
    
                if(i == this.objBalls[Bs].length -1){
                    this.ctx.fillStyle = "maroon"; 
                } else{
                    this.ctx.fillStyle = "green";
                }
                
                if (document.getElementById('wallResult').innerHTML == 'An') {
                    if(this.objBall[B].x > 1850){
                        this.objBall[B].x = 0;
                    }
                    if(this.objBall[B].x < 0){
                        this.objBall[B].x = 1850;
                    }
                    if(this.objBall[B].y > 900){
                        this.objBall[B].y = 0;
                    }
                    if(this.objBall[B].y < 0){
                        this.objBall[B].y = 900;
                    }
                } else {
                    if(this.objBall[B].x > 1800){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                    }
                    if(this.objBall[B].x < 0){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                    }
                    if(this.objBall[B].y > 850){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                    }
                    if(this.objBall[B].y < 0){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                    }
                }
            }
        }
    }
    
    crashOwnSnake(PL, Bs, B, LB, PLCD) {
        console.log(this.objPlayer[PL]);
        if (this.objPlayer[PL] == 0) {
            for(var i = 0; i < this.objBalls[Bs].length; i++){
                this.objBall[B] = this.objBalls[Bs][i];
    
                if(this.objBall[B].x == this.objLastball[LB].x && this.objBall[B].y == this.objLastball[LB].y && i < this.objBalls[Bs].length -2){
                    this.objPlayerCountDeath[PLCD] = 1;
                    this.scores();
                    console.log('self');
                }
            }
        }
    }
    
    crashSnakes(Bs, B, CS, PL, PLCD) {
        console.log(this.objBalls.balls);
        for(var i = 0; i < this.objBalls[Bs].length; i++){
            this.objBall[B] = this.objBalls[Bs][i];
    
            if (this.objCrashSnake[CS] != 1) {
                if (this.objPlayer[PL] == true) {
                    if(this.objBall[B].x == this.objLastball.lastball.x && this.objBall[B].y == this.objLastball.lastball.y && i < this.objBalls.balls.length){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                        console.log('12'); 
                    }
                }
                if (this.objPlayer[PL] == true) {
                    if(this.objBall[B].y == this.objLastball.lastball.y && this.objBall[B].x == this.objLastball.lastball.x && i < this.objBalls.balls.length){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                        console.log('12'); 
                    }
                }
            }
    
            if (this.objCrashSnake[CS] != 2) {
                if (this.objPlayer[PL] == true) {
                    if(this.objBall[B].x == this.objLastball.lastballPL2.x && this.objBall[B].y == this.objLastball.lastballPL2.y && i < this.objBalls.ballsPL2.length){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                        console.log('12'); 
                    }
                }
                if (this.objPlayer[PL] == true) {
                    if(this.objBall[B].y == this.objLastball.lastballPL2.y && this.objBall[B].x == this.objLastball.lastballPL2.x && i < this.objBalls.ballsPL2.length){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                        console.log('12'); 
                    }
                }
            }
    
            if (this.objCrashSnake[CS] != 3) {
                if (this.objPlayer[PL] == true) {
                    if(this.objBall[B].x == this.objLastball.lastballPL3.x && this.objBall[B].y == this.objLastball.lastballPL3.y && i < this.objBalls.ballsPL3.length){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                        console.log('12'); 
                    }
                }
                if (this.objPlayer[PL] == true) {
                    if(this.objBall[B].y == this.objLastball.lastballPL3.y && this.objBall[B].x == this.objLastball.lastballPL3.x && i < this.objBalls.ballsPL3.length){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                        console.log('12'); 
                    }
                }
            }
    
            if (this.objCrashSnake[CS] != 4) {
                if (this.objPlayer[PL] == true) {
                    if(this.objBall[B].x == this.objLastball.lastballPL4.x && this.objBall[B].y == this.objLastball.lastballPL4.y && i < this.objBalls.ballsPL4.length){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                        console.log('12'); 
                    }
                }
                if (this.objPlayer[PL] == true) {
                    if(this.objBall[B].y == this.objLastball.lastballPL4.y && this.objBall[B].x == this.objLastball.lastballPL4.x && i < this.objBalls.ballsPL4.length){
                        this.objPlayerCountDeath[PLCD] = 1;
                        this.scores();
                        console.log('12'); 
                    }
                }
            }
            
            if (this.start == true) {
                this.ctx.fillRect(this.objBall[B].x, this.objBall[B].y, 49, 49);
            }
        }
    }
    
    removeEachTime(PL, PLCD, Bs) {
        if (this.objPlayer[PL] == true && this.objPlayerCountDeath[PLCD] == 0) {
            this.objBalls[Bs].shift();
        }
    }
   
    scores() {
        if (this.objPlayer.multiplayerPL4 == true) {
            this.death = this.objPlayerCountDeath.player1 + this.objPlayerCountDeath.player2 + this.objPlayerCountDeath.player3 + this.objPlayerCountDeath.player4;
            if (this.death >= 3) {             
                this.alertResult();
            }
        }else if (this.objPlayer.multiplayerPL3 == true) {
            this.death = this.objPlayerCountDeath.player1 + this.objPlayerCountDeath.player2 + this.objPlayerCountDeath.player3;
            if (this.death >= 2) {
                this.alertResult();
            }
        }else if (this.objPlayer.multiplayer == true) {
            this.death = this.objPlayerCountDeath.player1 + this.objPlayerCountDeath.player2;
            if (this.death >= 1) {
                this.alertResult();
            }
        } else if (this.objPlayer.multiplayer && this.objPlayer.multiplayerPL3 && this.objPlayer.multiplayerPL4 == false) {
            this.singleplayerGameOver();
        }
    }

    alertResult() {
        this.death = this.objPlayerCountDeath.player1 = this.objPlayerCountDeath.player2 = this.objPlayerCountDeath.player3 = this.objPlayerCountDeath.player4 = 0;
        this.gameOver = true;
        this.input.style.display = "block";
    
        if (this.objScore.score == this.objScore.scorePL2 == this.objScore.scorePL3 == this.objScore.scorePL4) {
            this.drawn.style.display = 'block';
        } else {
            this.gameOverContainer.style.display = 'block';
            this.arrayScore = [];
            this.winner.innerHTML = '';
    
            this.scoreOutput();
    
            for (var i = 0; i < this.arrayScore.length; i++) {
                this.winner.innerHTML += this.arrayScore[i] + '<br/>';
            }
        }
        this.init();
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

    scoreCounter(PL, SV, S, HS) {
        if (this.objPlayer[PL] == true) {
            this.objScoreValue[SV].innerHTML = 0;
            if (this.objScore[S] > this.objHScore[HS].textContent) { 
                this.objHScore[HS].innerHTML = this.objScore[S];
            }
            if (this.objScore[S] > this.totalHighscore.textContent) {
                this.totalHighscore.innerHTML = this.objScore[S];
            }
        }
    }

    singleplayerGameOver() {
        this.death = 0;
        this.objPlayerCountDeath.player1 = 0;
        this.input.style.display = "block";
        this.init();
        this.stopGame();
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

