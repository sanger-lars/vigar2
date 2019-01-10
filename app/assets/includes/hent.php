<?php 

	$filename = "../upload/upload2.json";

	if(isset($_POST['alle'])){
		
		if ($_POST['alle'] == "alle") {
			hent_alle($filename);
		}
	}

	if(isset($_POST['bannere'])){
		
		if ($_POST['bannere'] == "alle") {
			hent_bannere("../upload/banner.json");
		}
	}

	function hent_alle($filename) {
	  	$fil = @file_get_contents($filename, true);
	  	if ($fil === false) {echo "";}
	  	else {echo $fil;}
	  	exit();
	}

	function hent_bannere($filename) {
	  	$fil = @file_get_contents($filename, true);
	  	if ($fil === false) {echo "";}
	  	else {echo $fil;}
	  	exit();
	}
	 
 ?>