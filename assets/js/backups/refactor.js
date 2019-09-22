this.players = true;

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
//////////////////////////////////////////////////////////////////// *7


this.objPlayerCountDeath = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
};

alertResult(scores, playerCountDeaths) {
    this.death = playerCountDeaths.player1 = playerCountDeaths.player2 = playerCountDeaths.player3 = playerCountDeaths.player4 = 0;
    this.gameOver = true;
    this.input.style.display = "block";

    if (scores.score == scores.scorePL2 == scores.scorePL3 == scores.scorePL4) {
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

scoreOutput(scoreValues) {
    if (scoreValues.scoreValue.textContent > scoreValues.scoreValuePL2.textContent) {
        this.arrayScore.push('1. PLAYER I: ' + scoreValues.scoreValue.textContent + ' POINTS');
    } else if (scoreValues.scoreValue.textContent > scoreValues.scoreValuePL3.textContent) {
        this.arrayScore.push('2. PLAYER I: ' + scoreValues.scoreValue.textContent + ' POINTS');
    } else if (scoreValues.scoreValue.textContent > scoreValues.scoreValuePL4.textContent) {
        this.arrayScore.push('3. PLAYER I: ' + scoreValues.scoreValue.textContent + ' POINTS');
    } else {
        this.arrayScore.push('4. PLAYER I: ' + scoreValues.scoreValue.textContent + ' POINTS');
    }
    
    if (scoreValues.scoreValuePL2.textContent > scoreValues.scoreValue.textContent) {
        this.arrayScore.push('1. PLAYER II: ' + scoreValues.scoreValuePL2.textContent + ' POINTS');
    } else if (scoreValues.scoreValuePL2.textContent > scoreValues.scoreValuePL3.textContent) {
        this.arrayScore.push('2. PLAYER II: ' + scoreValues.scoreValuePL2.textContent + ' POINTS');
    } else if (scoreValues.scoreValuePL2.textContent > scoreValues.scoreValuePL4.textContent) {
        this.arrayScore.push('3. PLAYER II: ' + scoreValues.scoreValuePL2.textContent + ' POINTS');
    } else {
        this.arrayScore.push('4. PLAYER II: ' + scoreValues.scoreValuePL2.textContent + ' POINTS');
    }
    
    if (scoreValues.scoreValuePL3.textContent > scoreValues.scoreValue.textContent) {
        this.arrayScore.push('1. PLAYER III: ' + scoreValues.scoreValuePL3.textContent + ' POINTS');
    } else if (scoreValues.scoreValuePL3.textContent > scoreValues.scoreValuePL2.textContent) {
        this.arrayScore.push('2. PLAYER III: ' + scoreValues.scoreValuePL3.textContent + ' POINTS');
    } else if (scoreValues.scoreValuePL3.textContent > scoreValues.scoreValuePL4.textContent) {
        this.arrayScore.push('3. PLAYER III: ' + scoreValues.scoreValuePL3.textContent + ' POINTS');
    } else {
        this.arrayScore.push('4. PLAYER III: ' + scoreValues.scoreValuePL3.textContent + ' POINTS');
    }
    
    if (scoreValues.scoreValuePL4.textContent > scoreValues.scoreValue.textContent) {
        this.arrayScore.push('1. PLAYER IV: ' + scoreValues.scoreValuePL4.textContent + ' POINTS');
    } else if (scoreValues.scoreValuePL4.textContent > scoreValues.scoreValuePL2.textContent) {
        this.arrayScore.push('2. PLAYER IV: ' + scoreValues.scoreValuePL4.textContent + ' POINTS');
    } else if (scoreValues.scoreValuePL4.textContent > scoreValues.scoreValuePL3.textContent) {
        this.arrayScore.push('3. PLAYER IV: ' + scoreValues.scoreValuePL4.textContent + ' POINTS');
    } else {
        this.arrayScore.push('4. PLAYER IV: ' + scoreValues.scoreValuePL4.textContent + ' POINTS');
    }
}


//////////////////////////////////////////////////////////////////// *7

scores(player, playerCountDeaths) {
    if (player.multiplayerPL4 == true) {
        this.death = playerCountDeaths.player1 + playerCountDeaths.player2 + playerCountDeaths.player3 + playerCountDeaths.player4;
        if (this.death >= 3) {             
            this.alertResult();
        }
    }else if (player.multiplayerPL3 == true) {
        this.death = playerCountDeaths.player1 + playerCountDeaths.player2 + playerCountDeaths.player3;
        if (this.death >= 2) {
            this.alertResult();
        }
    }else if (player.multiplayer == true) {
        this.death = playerCountDeaths.player1 + playerCountDeaths.player2;
        if (this.death >= 1) {
            this.alertResult();
        }
    } else if (player.multiplayer && player.multiplayerPL3 && player.multiplayerPL4 == false) {
        this.singleplayerGameOver();
    }
}

//////////////////////////////////////////////////////////////////// *7

this.objBalls = {
    balls: [],
    ballsPL2: [],
    ballsPL3: [],
    ballsPL4: []
};

generateSnake() {
    if (this.moveSnake == true) {
        this.speedSetting = setInterval(() => {
            this.ctx.clearRect(0, 0, 1850, 900);
            this.removeEachTime();
            this.addEachTime();
            this.eatFood();
            this.crashesAndColors();

            if (this.start == true) {
                this.ctx.fillRect(this.snakeFoodxOne, this.snakeFoodyTwo, 49, 49);
                this.ctx.fillStyle = "#DF7401";
                this.ctx.fill();
            } 

        }, this.speed);
    }
}

removeEachTime(PL, PLCD, Bs) {
    if (this.objPlayer[PL] == true && this.objPlayerCountDeath[PLCD] == 0) {
        this.objBalls[Bs].shift();
    }
}

//////////////////////////////////////////////////////////////////// *7
/*
this.defaultState ={
    ball = [],
    lastBall = [],
};

for (let i = 1; i <= maxPlayers; ++i) {
    this.state[i] = Object.assign(this.defaultState)
}
this.state = [{
    ball = [],
    lastBall = [],
}]

function getStateForPlayer(id){
    return this.state[id].ball
}
/* */

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

crashWallAndPaintSnakes(PL, Bs, B, LB, PLCD) {
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

crashSnakes(Bs, B, CS, PL, lastballPlayer1, ballsPlayer1, PLCD, lastballPlayer2, ballsPlayer2, lastballPlayer3, ballsPlayer3, lastballPlayer4, ballsPlayer4) {
    for(var i = 0; i < this.objBalls[Bs].length; i++){
        this.objBall[B] = this.objBalls[Bs][i];

        if (this.objCrashSnake[CS] != 1) {
            if (this.objPlayer[PL] == true) {
                if(this.objBall[B].x == lastballPlayer1.lastball.x && this.objBall[B].y == lastballPlayer1.lastball.y && i < ballsPlayer1.balls.length){
                    this.objPlayerCountDeath[PLCD] = 1;
                    this.scores();
                    console.log('12'); 
                }
            }
            if (this.objPlayer[PL] == true) {
                if(this.objBall[B].y == lastballPlayer1.lastball.y && this.objBall[B].x == lastballPlayer1.lastball.x && i < ballsPlayer1.balls.length){
                    this.objPlayerCountDeath[PLCD] = 1;
                    this.scores();
                    console.log('12'); 
                }
            }
        }

        if (this.objCrashSnake[CS] != 2) {
            if (this.objPlayer[PL] == true) {
                if(this.objBall[B].x == lastballPlayer2.lastballPL2.x && this.objBall[B].y == lastballPlayer2.lastballPL2.y && i < ballsPlayer2.ballsPL2.length){
                    this.objPlayerCountDeath[PLCD] = 1;
                    this.scores();
                    console.log('12'); 
                }
            }
            if (this.objPlayer[PL] == true) {
                if(this.objBall[B].y == lastballPlayer2.lastballPL2.y && this.objBall[B].x == lastballPlayer2.lastballPL2.x && i < ballsPlayer2.ballsPL2.length){
                    this.objPlayerCountDeath[PLCD] = 1;
                    this.scores();
                    console.log('12'); 
                }
            }
        }

        if (this.objCrashSnake[CS] != 3) {
            if (this.objPlayer[PL] == true) {
                if(this.objBall[B].x == lastballPlayer3.lastballPL3.x && this.objBall[B].y == lastballPlayer3.lastballPL3.y && i < ballsPlayer3.ballsPL3.length){
                    this.objPlayerCountDeath[PLCD] = 1;
                    this.scores();
                    console.log('12'); 
                }
            }
            if (this.objPlayer[PL] == true) {
                if(this.objBall[B].y == lastballPlayer3.lastballPL3.y && this.objBall[B].x == lastballPlayer3.lastballPL3.x && i < ballsPlayer3.ballsPL3.length){
                    this.objPlayerCountDeath[PLCD] = 1;
                    this.scores();
                    console.log('12'); 
                }
            }
        }

        if (this.objCrashSnake[CS] != 4) {
            if (this.objPlayer[PL] == true) {
                if(this.objBall[B].x == lastballPlayer4.lastballPL4.x && this.objBall[B].y == lastballPlayer4.lastballPL4.y && i < ballsPlayer4.ballsPL4.length){
                    this.objPlayerCountDeath[PLCD] = 1;
                    this.scores();
                    console.log('12'); 
                }
            }
            if (this.objPlayer[PL] == true) {
                if(this.objBall[B].y == lastballPlayer4.lastballPL4.y && this.objBall[B].x == lastballPlayer4.lastballPL4.x && i < ballsPlayer4.ballsPL4.length){
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


//////////////////////////////////////////////////////////////////// *7

this.objfood = {
    food: 'PL1',
    foodPL2: 'PL2',
    foodPL3: 'PL3',
    foodPL4: 'PL4'
}

eatFood(PL, PLCD, LB, Bs, S, SV, F) {
    if (this.objPlayer[PL] == true && this.objPlayerCountDeath[PLCD] == 0) {
        this.objLastball[LB] = this.objBalls[Bs][this.objBalls[Bs].length - 1];

        if(this.objLastball[LB].x == this.snakeFoodxOne && this.objLastball[LB].y == this.snakeFoodyTwo){
            this.objScore[S] += 5;
            this.objScoreValue[SV].innerHTML = this.objScore[S];
            this.objfood[F] = 'PL1';
            this.add();
            this.createFood();
        }
    }
}



//////////////////////////////////////////////////////////////////// *7


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

addEachTime(PL, PLCD, LB, Bs, K, KCR, KCD, KCL, KCU){
    if (this.objPlayer[PL] == true && this.objPlayerCountDeath[PLCD] == 0) {
        this.objLastball[LB] = this.objBalls[Bs][this.objBalls[Bs].length - 1];
        if(this.objKey[K] == objKeyCodeRight[KCR]){
            this.objBalls[Bs].push({x:this.objLastball[LB].x + 50, y:this.objLastball[LB].y});
        }
        if(this.objKey[K] == objKeyCodeRight[KCD]){
            this.objBalls[Bs].push({x:this.objLastball[LB].x, y:this.objLastball[LB].y + 50});
        }
        if(this.objKey[K] == objKeyCodeRight[KCL]){
            this.objBalls[Bs].push({x:this.objLastball[LB].x - 50, y:this.objLastball[LB].y});
        }
        if(this.objKey[K] == objKeyCodeRight[KCU]){
            this.objBalls[Bs].push({x:this.objLastball[LB].x, y:this.objLastball[LB].y - 50});
        }
    }
}


//////////////////////////////////////////////////////////////////// *7

add(PL, PLCD, LB, Bs, K, KCR, KCD, KCL, KCU){
    if (this.objPlayer[PL] == true && this.objPlayerCountDeath[PLCD] == 0) {
        this.objLastball[LB] = this.objBalls[Bs][this.objBalls[Bs].length - 1];
        if(this.objKey[K] == objKeyCodeRight[KCR]){
            this.objBalls[Bs].push({x:this.objLastball[LB].x + 50, y:this.objLastball[LB].y});
        }
        if(this.objKey[K] == objKeyCodeDown[KCD]){
            this.objBalls[Bs].push({x:this.objLastball[LB].x, y:this.objLastball[LB].y + 50});
        }
        if(this.objKey[K] == objKeyCodeLeft[KCL]){
            this.objBalls[Bs].push({x:this.objLastball[LB].x - 50, y:this.objLastball[LB].y});
        }
        if(this.objKey[K] == objKeyCodeUp[KCU]){
            this.objBalls[Bs].push({x:this.objLastball[LB].x, y:this.objLastball[LB].y - 50});
        }
    }
}

//////////////////////////////////////////////////////////////////// *7

document.addEventListener('keydown', (e) => (keys, players) {
    this.keyCode = e.keyCode;
    if (players.player1 == 0) {
        if(this.keyCode == 37 && keys.key != 'right'){
            keys.key = 'left';
        } 
        if(this.keyCode == 38 && keys.key != 'down'){
            keys.key = 'up';
        }
        if(this.keyCode == 39 && keys.key != 'left'){
            keys.key = 'right';
        }
        if(this.keyCode == 40 && keys.key != 'up'){
            keys.key = 'down';
        }
    }
    //only when multiplayer is active
    if(this.multiplayer == true && players.player2 == 0) {
        if(this.keyCode == 65 && keys.keyPL2 != 'rightPL2'){
            keys.keyPL2 = 'leftPL2';
        } 
        if(this.keyCode == 87 && keys.keyPL2 != 'downPL2'){
            keys.keyPL2 = 'upPL2';
        }
        if(this.keyCode == 68 && keys.keyPL2 != 'leftPL2'){
            keys.keyPL2 = 'rightPL2';
        }
        if(this.keyCode == 83 && keys.keyPL2 != 'upPL2'){
            keys.keyPL2 = 'downPL2';
        }
    }
    //only when multiplayerPL3 is active
    if(this.multiplayerPL3 == true && players.player3 == 0) {
        if(this.keyCode == 72 && keys.keyPL3 != 'rightPL3'){
            keys.keyPL3 = 'leftPL3';
        } 
        if(this.keyCode == 85 && keys.keyPL3 != 'downPL3'){
            keys.keyPL3 = 'upPL3';
        }
        if(this.keyCode == 75 && keys.keyPL3 != 'leftPL3'){
            keys.keyPL3 = 'rightPL3';
        }
        if(this.keyCode == 74 && keys.keyPL3 != 'upPL3'){
            keys.keyPL3 = 'downPL3';
        }
    }
    //only when multiplayerPL4 is active
    if(this.multiplayerPL4 == true && players.player4 == 0) {
        if(this.keyCode == 100 && keys.keyPL4 != 'rightPL4'){
            keys.keyPL4 = 'leftPL4';
        } 
        if(this.keyCode == 104 && keys.keyPL4 != 'downPL4'){
            keys.keyPL4 = 'upPL4';
        }
        if(this.keyCode == 102 && keys.keyPL4 != 'leftPL4'){
            keys.keyPL4 = 'rightPL4';
        }
        if(this.keyCode == 101 && keys.keyPL4 != 'upPL4'){
            keys.keyPL4 = 'downPL4';
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

//////////////////////////////// *7

init(playersCountDeath, players, keys, scores, tailBalls, ){
    this.death = playersCountDeath.player1 = playersCountDeath.player2 = playersCountDeath.player3 = playersCountDeath.player4 = 0;
    keys.key = 'right';
    scores.score = 0;

    tailBalls.balls = [
        {x:0, y:50},
        {x:50, y:50}, 
        {x:100, y:50}
    ];
    if (players.multiplayer == true) {
        keys.keyPL2 = 'leftPL2';
        scores.scorePL2 = 0;
        if (players.multiplayerPL4 == true) {
            tailBalls.ballsPL2 = [
                {x:1800, y:100},   
                {x:1750, y:100},
                {x:1700, y:100}
            ];
        } else {
            tailBalls.ballsPL2 = [
                {x:1800, y:800},   
                {x:1750, y:800},
                {x:1700, y:800}
            ];
        }
    }
    if (players.multiplayerPL3 == true) {
        keys.keyPL3 = 'rightPL3';
        scores.scorePL3 = 0;
        tailBalls.ballsPL3 = [
            {x:0, y:800},   
            {x:50, y:800},
            {x:100, y:800}
        ];
    }
    if (players.multiplayerPL4 == true) {
        keys.keyPL4 = 'leftPL4';
        scores.scorePL4 = 0;
        tailBalls.ballsPL4 = [
            {x:1800, y:750},   
            {x:1750, y:750},
            {x:1700, y:750}
        ];
    }
    this.createFood();
}

//////////////////////////////// *7

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

this.objPlayer = {
    players: true,
    multiplayer: false,
    multiplayerPL3: true,
    multiplayerPL4: true
};
this.objPlayer = {
    player1: true,
    player2: false,
    player3: true,
    player4: true
};



this.objPlayerCountDeath = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
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

class Snake {
    constructor() {
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
        this.addControls(0, 38, 40, 37, 39);
        this.addPlayer(0);
        this.onKeyDown = this.onKeyDown.bind(this);

        document.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(e) {
        let players = this.player.map((player, id) => {
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
                this.player[id].direction = possibleDirection;
            });
        });
           
        if(this.keyCode == 27) {
            this.stopGame();
            this.input.style.display = "block";
        }
        if(this.keyCode == 32) {
            this.pauseGame();
        }
    }

    static getAxisBy(direction) {
        return direction === 'left' || direction === 'right' ? 'x' : 'y';
    }
    
    addControls(id, up, down, left, right) {
        this.controls.push({
            up,
            down,
            left,
            right
        })
    }

    addPlayer(id, color = 'green') {
        this.players[id] = {
            active: true,
            dead: false,
            color,
            score: 0,
            highscore: 0,
            balls: [],
            direction: '',
            controls: this.controls[id]
        }
    }

    initPlayer(id) {
        this.players[id].direction = id % 2 ? 'left' : 'right';
        this.players[id].score = 0;
        this.players[id].balls = [];
        this.players[id].dead = false;
        for (let i = 0; i < 3; ++i){
            let ball = Object.assign({}, this.startingPoints[id]);
            ball.x += 50 * (id % 2 ? -1 : 1);
            this.players[id].balls.push(ball);
        }
    }

    init() {
        this.players.map((player, id) => {
            this.initPlayer(id)
        });
        this.createFood();
    }

    addBallToPlayer(id) {
        let newBall = this.players[id].balls.slice(-1).pop();
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
        this.players[id].push(newBall);
    }

    changePlayerHead(id) {
        this.players[id].balls.shift();
        this.addBallToPlayer(id);
        return this.players[id].balls.slice(-1).pop();
    }

    painter() {
        if (!this.moveSnake) {
            return;
        }
        
        this.ctx.clearRect(0, 0, 1850, 900);
        this.players.map((player, id) => {
            if (!player.active || player.dead){
                return;
            }
            let snakeHead = this.changePlayerHead(id);
            if(snakeHead.x == this.snakeFoodxOne && snakeHead.y == this.snakeFoodyTwo){
                this.players[id].score += 5;
                this.objScoreValue[SV].innerHTML = this.players[id].score;
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
    }

    paint(type, id = false) {
        if (!this.start)  {
            return;
        }
        switch(type) {
            case "snake":
                this.players[id].balls.map((ball, ballIndex) => {
                    this.ctx.fillRect(ball.x, ball.y, 49, 49);
                    this.ctx.fillStyle = ballIndex === this.players[id].balls.length -1 ? "maroon" : this.players[id].color;
                    this.ctx.fill();
                })
                break;
            case "food":
                this.ctx.fillRect(this.snakeFoodxOne, this.snakeFoodyTwo, 49, 49);
                this.ctx.fillStyle = "#DF7401";
                this.ctx.fill();
                break;
        }
    }
    static maybeWalkThroughWalls(ball) {
        let maxX = 1850,
        maxY = 900;
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
            this.players[id].dead = 1;
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
                        this.players[id].dead = true; //1
                    }
                })
            case "others":
                let allBalls = this.players.reduce((balls, player) => {
                    if (player.active && !player.dead) {
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
    getPlayerCount () {
        return this.players.reduce((acc, player) => acc + (player.active ? 1 : 0), 0)
    }
    isAnyPlayerAlive() {
        let isAlive = !this.players.reduce((acc, player) => player.dead === false, false);
        if (isAlive) {
            return;
        }
        this.alertResult(); //look for singleplayer, come into singleplayerGameOver()?
        if (getPlayerCount() === 1) {
            this.singleplayerGameOver();
        }
    }
    singleplayerGameOver() {
        this.death = 0; //needed?
        this.input.style.display = "block";
        this.init();
        this.stopGame();
    }
}