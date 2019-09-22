<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="assets/css/main.css">
	<title>snake-the-game</title>
</head>
<style>
</style>
<body>
<?php 
  require('./templates/header.php');
  require('./templates/content.php');
?>

<script src="assets/js/main.js" ></script> <!--Mit dem Attribut async wird das Script asynchron mit der Webseite ausgeführt, während diese weiter geladen und geparst wird.
Mit dem Attribut defer wird das Script ausgeführt, wenn die Seite geladen und geparst ist.
Fehlen beide Attribute wird das Script geladen und ausgeführt, dann wird das Laden und Parsen der Seite fortgesetzt.-->

<script>

var snake = new Snake({
});


</script>


</body>
</html>