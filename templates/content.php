<section class="content__game" id="content__game">
	<div id="content__game-canvas-container">
	</div>
	<h2 id="content__game-pause">PAUSE</h2>
	<h2 id="content__game-game-over-drawn">DRAWN</h2>
	<div id="content__game-game-over-wrapper">

		<div id="content__game-game-over-container">
			<h1 id="content__game-winner--1" class="content__game-winner"></h1>
			<h2 id="content__game-winner--2" class="content__game-winner"></h2>
			<h3 id="content__game-winner--3" class="content__game-winner"></h3>
			<h4 id="content__game-winner--4" class="content__game-winner"></h4>

			<button type="button" id="content__game-replay-button" class="content__game-replay-button" onclick="saveScores()">Replay</button>
			<button type="button" id="content__game-home-button" class="content__game-home-button" onclick="saveScores()">Home</button>
		</div>

		<?php 
		
			function saveScores() {
				setcookie("scores[PL1]", $highscorePlayer1, time() + (10 * 365 * 24 * 60 * 60));
				setcookie("scores[PL2]", $highscorePlayer2, time() + (10 * 365 * 24 * 60 * 60));
				setcookie("scores[PL3]", $highscorePlayer3, time() + (10 * 365 * 24 * 60 * 60));
				setcookie("scores[PL4]", $highscorePlayer4, time() + (10 * 365 * 24 * 60 * 60));
			}
		
		?>
		

		<!--this has some mistakes inside-->

		<!-- <form method="POST" onSubmit="./php/scores.php">
			<h1 id="content__game-winner--1" class="content__game-winner"></h1>
			<h2 id="content__game-winner--2" class="content__game-winner"></h2>
			<h3 id="content__game-winner--3" class="content__game-winner"></h3>
			<h4 id="content__game-winner--4" class="content__game-winner"></h4>
			
			<input type="text" name="Player1" id="content__game-winner-save-score--1"/>
			<input type="text" name="Player2" id="content__game-winner-save-score--2"/>
			<input type="text" name="Player3" id="content__game-winner-save-score--3"/>
			<input type="text" name="Player4" id="content__game-winner-save-score--4"/>					
			<input type="text" name="TotalHighscore" id="content__game-winner-save-score--total"/>

			<button id="content__game-replay-button" class="content__game-replay-button" type="submit" value="Submit">Replay</button>
			<button id="content__game-home-button" class="content__game-home-button" type="submit" value="Submit">Home</button>
		</form> -->
	</div>
</section>