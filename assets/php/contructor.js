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