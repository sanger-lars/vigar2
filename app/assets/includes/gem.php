<?php 
	$filename = "../upload/upload2.json";

	if(isset($_POST['data'])){
		$jsondata = $_POST['data'];
		file_put_contents($filename, $jsondata);
		sleep(1);
		if($_POST['filnavn'] !== "") {
			$file = "../" . $_POST['filnavn'];
			$ok = unlink($file);	
		}
	}

	if(isset($_POST['Ledere'])){
		$jsondata = $_POST['Lederdata'];
		if($_POST['Ledere'] === "true") $filnavn = "ledere.json";
		else if($_POST['Ledere'] === "false") $filnavn = "bestyrelse.json";
		$handle = file_put_contents($filnavn, $jsondata);
		sleep(1);
		fclose($handle);
	}

 ?>