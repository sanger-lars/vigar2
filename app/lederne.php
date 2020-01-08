<?php
  session_start();
?>
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700' rel='stylesheet' type='text/css'>
  <title>Vigar Stamme - Ledere</title>
  <meta name="keywords" content="Spejder,KFUM Spejderne, Vigar, Spejder i Hvidovre">
  <meta name="description" content="Hjemmeside for KFUM Spejderne Vigar Stamme.">
  <META content=da http-equiv=Content-Language>
  <META content="text/html"; charset="utf-8"; http-equiv="Content-Type">
  <!-- build:css assets/styles/styles.css -->
  <link rel="stylesheet" type="text/css" href="temp/styles/styles.css">
  <!-- endbuild -->

  <link rel="stylesheet" type="text/css" href="ledogbe.css">

	


</head>
<body>
	<?php 
	  if (isset($_SESSION['u_id'])) {
	    echo '<form id="logud" action="assets/includes/logout.inc.php" method="POST" style="position: absolute; right: 20px;">
	      <button class="sort_knap" type="submit" name="logout-submit">Log ud</button>
	    </form><br><a href="forsiden.php"><button class="sort_knap" >Forsiden</button></a>
	    <a href="upload.php"><button class="sort_knap" >Enhederne</button></a>
	    <a href="bestyrelsen.php"><button class="sort_knap" >Bestyrelsen</button></a>';
	  }
	?>

<!-- 	<script src="menu.html"></script>    
	<br> -->
	<div class= "linje_green"></div>

	<div class="overskriften">
	<h1>Lederne</h1>
	</div> 


	<?php 
	    if (isset($_SESSION['u_id'])) {  
		    echo '
			<div style="background-color: white;"><img id="plus-icon" src="assets/images/logos/plus.png" style="float: right;height: 80px; width: auto; padding: 10px; margin-right: 5.0rem;"> <img id="save-icon" src="assets/images/logos/save.png" style="float: right;height: 80px; width: auto; margin-right: 1.0rem;"></div>

			<ul id="columns">

			</ul> ';
		}
	?>
	<script type="text/javascript">const Led = true;</script>
	<script src="assets/includes/modal.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="assets/includes/lederne.js"></script>

</body>
</html>