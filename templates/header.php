<section id="content__header" class="content__header">
	<div id="content__header-wrapper" class="content__header-wrapper">
		<ul id="content__header-menu" class="content__header-menu">
			<li id="players" class="content__header-menu-toggle">Players:
				<img class="content__header-menu-images" id="snakes" src="assets/images/snakes.png"/>
				<span class="resultInt" id="playerValue">1</span>
				<input class="range" id="playerRange" type="range" value="1" min="1" max="4">
			</li>
			<li id="difficulty" class="content__header-menu-toggle">Speed(ms):
				<span id="difficultyDegreeValue">Normal</span><br/>
				<span class="resultInt" id="rangeValue">200</span>
				<input class="range" id="range" type="range" value="200" min="100" max="500"  step="10">
				<img class="content__header-menu-images" id="difficultyDegree" src="assets/images/difficulty.png"/>
			</li>
			<li id="wallHit" class="content__header-menu-toggle">Walls: 
				<input type="checkbox" id="wallCheck">
				<label id="wallResult" for="wallCheck" class="results">Aus</label>
				<img class="content__header-menu-images" id="walls" src="assets/images/walls.jpg"/> 
			<li id="content__header-menu-items" class="content__header-menu-toggle">Items  <!--available which items drop, dropchance, when item should drop etc.-->
				<img class="content__header-menu-images" id="items" src="assets/images/items.png"/>
			</li>
			<li id="content__header-menu-controls" class="content__header-menu-toggle">Controls <!--steuerung Mehrspieler und Singleplayer Needed (changeable by the user -->
				<img class="content__header-menu-images" id="keyboard" src="assets/images/keyboard.png"/>
			</li> 
			<li id="content__header-menu-game-mods" class="content__header-menu-toggle">Game Modes  <!-- size, startTime, don't touch walls, go throw walls etc., color change-->
				<img class="content__header-menu-images" id="options" src="assets/images/settings.png"/>
			</li>

			<li class="content__header-menu-toggle">Current Score: <span class="results">
				<?php 
				$scores = array('PL1' => 0,'PL2' => 0,'PL3' => 0,'PL4' => 0);
				
				foreach ($scores as $name => $value) {
					echo "<span class='results'> " . $name . " <span id='scoreResult$name'" . "class='resultInt'>" . $value . "</span></span>";
				};
				?>
			<li>
			<li class="content__header-menu-toggle">Highscore: 
				<?php 
				// set cookies
				if (!isset($_COOKIE['cookie'])) {
					setcookie("scores[PL1]", 0, time() + (10 * 365 * 24 * 60 * 60));
					setcookie("scores[PL2]", 0, time() + (10 * 365 * 24 * 60 * 60));
					setcookie("scores[PL3]", 0, time() + (10 * 365 * 24 * 60 * 60));
					setcookie("scores[PL4]", 0, time() + (10 * 365 * 24 * 60 * 60));
				}
					foreach ($_COOKIE['scores'] as $name => $value) {
						echo "<span class='results'>" . " $name " ."<span id='highscoreResult$name'"." class='resultInt'> " . $value . "</span> </span>";
					}
				?>
			</li>
			<li class="content__header-menu-toggle" id="submitBtn">PLAY</li>
		</ul>
	</div>

	<div id="content__header-intro-container" class="content__header-intro-container">
		<h1 class="content__header-intro-headline">SNAKE THE<br/> GAME</h1>
		<img class="content__header-intro-image" src="assets/images/snake-the-game.jpg"/>
		<div class="content__header-intro-scores-container">
			<!-- <h3 id="content__header-intro-tcs" class="content__header-intro-scores">TCS(Total Current Score):</h3> -->
			<h3  class="content__header-intro-scores">THS(Total Highscore): <span id="content__header-intro-ths">0</span></h3>
		</div>
	</div>
	
	<fieldset id="content__items-wrapper" class="content__items-wrapper">
		<h1 class="content__game-items-headline">Items</h1>
		<h3 class="content__game-items-subline">Time Reliant Items</h3>
		<input type="checkbox" name="item" id="content__game-item-boost-self" class="content__game-items" value="boostSelf">
		<label for="content__game-item-boost-self">Boost</label> 

		<input type="checkbox" name="item" id="content__game-item-boost-others" class="content__game-items" value="boostOthers">
		<label for="content__game-item-boost-others">Boost Others</label>

		<input type="checkbox" name="item" id="content__game-item-slow-self" class="content__game-items" value="slowSelf">
		<label for="content__game-item-slow-self">Slow</label>

		<input type="checkbox" name="item" id="content__game-item-slow-others" class="content__game-items" value="slowOthers">
		<label for="content__game-item-slow-others">Slow Others</label>

		<input type="checkbox" name="item" id="content__game-item-drop-bomb" class="content__game-items" value="dropBomb">
		<label for="content__game-item-drop-bomb">Drop Bombs</label>

		<input type="checkbox" name="item" id="content__game-item-head-of-steal" class="content__game-items" value="headOfSteal"> <!--can't die-->
		<label for="content__game-item-head-of-steal">Head of Steal</label>

		<input type="checkbox" name="item" id="content__game-item-meteor-drop" class="content__game-items" value="meteorDrop">
		<label for="content__game-item-meteor-drop">Meteor Drop</label>

		<input type="checkbox" name="item" id="content__game-item-tail-spikes" class="content__game-items" value="tailSpikes">
		<label for="content__game-item-tail-spikes">Tail Spikes</label>
		
		<input type="checkbox" name="item" id="content__game-item-multiplier" class="content__game-items" value="pointMultiplier">
		<label for="content__game-item-multiplier">Point Multiplier</label>

		<input type="checkbox" name="item" id="content__game-item-food-bonus" class="content__game-items" value="foodBonus">
		<label for="content__game-item-food-bonus">Food Brings More Tail</label>

		<input type="checkbox" name="item" id="content__game-item-speed-invunerable" class="content__game-items" value="invunerableSpeed"> <!--speedSelfAndMakeInvulnerable-->
		<label for="content__game-item-speed-invunerable">Invunerable Speed</label>

		<input type="checkbox" name="item" id="content__game-item-slow-killing" class="content__game-items" value="slowKillingPerTouch"> <!--slowSelfAndKillOthersPerTouchingThem-->
		<label for="content__game-item-slow-killing">Slow And Kill Per Kollision</label>

		<input type="checkbox" name="item" id="content__game-item-immune" class="content__game-items" value="immuneVsAllDebuffs"> 
		<label for="content__game-item-immune">Immune Vs All Debuffs</label>

		<input type="checkbox" name="item" id="content__game-item-ghost" class="content__game-items" value="ghost"> <!--each few seconds will the snake shown-->
		<label for="content__game-item-ghost">Ghost</label>

		<input type="checkbox" name="item" id="content__game-item-no-walls" class="content__game-items" value="moWalls">
		<label for="content__game-item-no-walls">No Wall Detection</label><!--there only can be one of these active at the same time-->

		<input type="checkbox" name="item" id="content__game-item-walls" class="content__game-items" value="walls">
		<label for="content__game-item-walls">Wall Detection</label>

		<input type="checkbox" name="item" id="content__game-item-random-wall-holes" class="content__game-items" value="randomWallHoles">
		<label for="content__game-item-random-wall-holes">Random Wall Holes</label>

		<input type="checkbox" name="item" id="content__game-item-random-wall-points" class="content__game-items" value="randomWallpoints">
		<label for="content__game-item-random-wall-points">Random Wall Pieces</label>

		<input type="checkbox" name="item" id="content__game-item-confision" class="content__game-items" value="confusion"> <!--all others have the same color-->>
		<label for="content__game-item-confision">Confusion</label>		

		<input type="checkbox" name="item" id="content__game-item-random-time" class="content__game-items" value="randomItemTime"> <!--each few seconds will the snake shown-->
		<label for="content__game-item-random-time">RandomItem</label>


		<h3 class="content__game-items-subline">Permanent Items</h3>
		<input type="checkbox" name="item" id="content__game-item-bonus-life" class="content__game-items" value="bonusLife">
		<label for="content__game-item-bonus-life">Bonus Life</label>

		<input type="checkbox" name="item" id="content__game-item-score-reset" class="content__game-items" value="ScoreDestroyerRandom">
		<label for="content__game-item-score-reset">Score Destroyer</label> 

		<input type="checkbox" name="item" id="content__game-item-score-reset-all" class="content__game-items" value="ScoreDestroyerAll">
		<label for="content__game-item-score-reset-all">Score Destroyer All</label>

		<input type="checkbox" name="item" id="content__game-item-tail-reset" class="content__game-items" value="tailDestroyerSelf">
		<label for="content__game-item-tail-reset">Tail Loser</label>

		<input type="checkbox" name="item" id="content__game-item-get-points" class="content__game-items" value="getPoints">
		<label for="content__game-item-get-points">Bonus Points</label>

		<input type="checkbox" name="item" id="content__game-item-mapGetSmaller" class="content__game-items" value="mapGetSmaller">
		<label for="content__game-item-mapGetSmaller">Map Get Smaller</label>

		<input type="checkbox" name="item" id="content__game-item-meteor-drop" class="content__game-items" value="meteorDrop">
		<label for="content__game-item-meteor-drop">Meteor Drop</label>

		<input type="checkbox" name="item" id="content__game-item-random-perma" class="content__game-items" value="randomItemPerma"> <!--each few seconds will the snake shown-->
		<label for="content__game-item-random-perma">RandomItem</label>		
	</fieldset>


	<div id="content__player-controls-display">
		<h1 class="content__player-controls-headline">Controls</h1> <!--need to make a keyboard which is clickable to change the keycode-->
		<div class="content__player-controls-wrapper">
			<div class="content__player-controls-container">
				<h3 class="content__player-controls-subline">Add Controls for Player One</h3>
				<ul class="content__player-controls">
					<li class="content__controls">UP:</li> <!--will be an arrow top-->
					<li class="content__controls">DOWN:</li> <!--will be an arrow bottom-->
					<li class="content__controls">LEFT:</li> <!--will be an arrow left-->
					<li class="content__controls">RIGHT:</li> <!--will be an arrow right-->
					<li class="content__controls">INTERACTION:</li> <!--will be a round Button-->
				</ul>
				<ul class="content__player-controls">
					<li class="content__controls-toggle">UP</li>
					<li class="content__controls-toggle">DOWN</li>
					<li class="content__controls-toggle">LEFT</li>
					<li class="content__controls-toggle">RIGHT</li>
					<li class="content__controls-toggle">BIG UP ARROW</li>
				</ul>
				<img class="content__player-controls-image-setting" id="content__player-controls-keyboard" src="assets/images/keyboard_controls.png" alt="keyboard" />
				<img class="content__player-controls-image-setting" id="content__player-controls-controller" src="assets/images/controller_controls.jpg" alt="controller" />
			</div>
			<div class="content__player-controls-container">
				<h3 class="content__player-controls-subline">Add Controls for Player Two</h3>
				<ul class="content__player-controls">
					<li class="content__controls">UP:</li> 
					<li class="content__controls">DOWN:</li> 
					<li class="content__controls">LEFT:</li> 
					<li class="content__controls">RIGHT:</li> 
					<li class="content__controls">INTERACTION:</li>
				</ul>
				<ul class="content__player-controls">
					<li class="content__controls-toggle">W</li>
					<li class="content__controls-toggle">S</li>
					<li class="content__controls-toggle">A</li>
					<li class="content__controls-toggle">D</li>
					<li class="content__controls-toggle">F</li>
				</ul>

				<img class="content__player-controls-image-setting" id="content__player-controls-keyboard" src="assets/images/keyboard_controls.png" alt="keyboard" />
				<img class="content__player-controls-image-setting" id="content__player-controls-controller" src="assets/images/controller_controls.jpg" alt="controller" />
			</div>
			<div class="content__player-controls-container">
				<h3 class="content__player-controls-subline">Add Controls for Player Three</h3>
				<ul class="content__player-controls">
					<li class="content__controls">UP:</li> 
					<li class="content__controls">DOWN:</li> 
					<li class="content__controls">LEFT:</li> 
					<li class="content__controls">RIGHT:</li> 
					<li class="content__controls">INTERACTION:</li>
				</ul>
				<ul class="content__player-controls">
					<li class="content__controls-toggle">U</li>
					<li class="content__controls-toggle">J</li>
					<li class="content__controls-toggle">H</li>
					<li class="content__controls-toggle">K</li>
					<li class="content__controls-toggle">L</li>
				</ul>
				<img class="content__player-controls-image-setting" id="content__player-controls-keyboard" src="assets/images/keyboard_controls.png" alt="keyboard" />
				<img class="content__player-controls-image-setting" id="content__player-controls-controller" src="assets/images/controller_controls.jpg" alt="controller" />
			</div>
			<div class="content__player-controls-container">
				<h3 class="content__player-controls-subline">Add Controls for Player Four</h3>
				<ul class="content__player-controls">
					<li class="content__controls">UP:</li> 
					<li class="content__controls">DOWN:</li> 
					<li class="content__controls">LEFT:</li> 
					<li class="content__controls">RIGHT:</li> 
					<li class="content__controls">INTERACTION:</li>
				</ul>
				<ul class="content__player-controls">
					<li class="content__controls-toggle">8</li>
					<li class="content__controls-toggle">5</li>
					<li class="content__controls-toggle">4</li>
					<li class="content__controls-toggle">6</li>
					<li class="content__controls-toggle">+</li>
				</ul>
				<img class="content__player-controls-image-setting" id="content__player-controls-keyboard" src="assets/images/keyboard_controls.png" alt="keyboard" />
				<img class="content__player-controls-image-setting" id="content__player-controls-controller" src="assets/images/controller_controls.jpg" alt="controller" />
			</div>
		</div>		
		<h3 class="content__game-controls">Stop/Resume Game:<span id="content__game-controls-leertaste"> LEERTASTE</span></h3>
		<h3 class="content__game-controls">Open/Close Menu:<span id="content__game-controls-escape"> ESCAPE</span></h3>

		
		<div class="content__controls-set-btn-wrapper">
			<button id="content__set-controls">Save Changes</button>
			<button id="content__default-controls">Set config to default</button>
		</div>
	</div>

	<div id="content__game-mods">
		<h1>Game Modes</h1><!--should be switchable with arrows (with image or Video and discription about the Game)-->
		<div>
			<h2>Normal</h2>
			<!-- <img src=""/> -->
			<h4>Game Settings</h4>
			<p></p>
			<h3>Spielerklärung</h3>
			<p>
			</p>
			<h3>Siegesbedingungen</h3>
			<p></p>
		</div>

		<div>
			<h2>Zombie</h2>
			<!-- <img src=""/> -->
			<h4>Game Settings</h4>
			<p>Es wird ein Timer Festgelegt</p>
			<h3>Spielerklärung</h3>
			<p>Jede Schlange hinterlässt eine Farbe die ihrem Kopf ähnelt auf dem Spielfeld, wenn die Schlange sterben sollte
				wird Sie zurück auf ihren Spawnpoint gesetzt und alle Felder mit ihrer Farbe werden wieder normal. Sobald die Zeit abläuft ist das Spiel vorbei
			</p>
			<h3>Siegesbedingungen</h3>
			<p>Es gewinnt der Spieler der nach Ablauf der Zeit die meisten Felder mit seiner Farbe markiert hat</p>
		</div>
		
		<div>
			<h2>Schlangenkönig</h2>
			<!-- <img src=""/> -->
			<h4>Game Settings</h4>
			<p></p>
			<h3>Spielerklärung</h3>
			<p>
			</p>
			<h3>Siegesbedingungen</h3>
			<p></p>
		</div>

		<div>
			<h2>SnakeBomber</h2>
			<!-- <img src=""/> -->
			<h4>Game Settings</h4>
			<p>Es hat jede Schlange ein Geschütz Körper und beginnt mit 5 Schwanzteilen</p>
			<h3>Spielerklärung</h3>
			<p>Das Geschütz bewegt sich random in alle Richtungen, wenn man auf die Interaktionstaste drückt schießt das Geschütz eine Kugel,
				trifft das Geschützt eine Schlange so verliert sie ein Teil von ihrem Schwanz. Hat eine Schlange weniger als 2 Teile ihres Schwanzes stirbt Sie.   
			</p>
			<h3>Siegesbedingungen</h3>
			<p></p>
		</div>
	</div>

</section>