<?php 

if (isset($_POST['logout-submit'])) {
	session_start();
	session_unset();
	session_destroy();
	echo '<script>window.location = "../../index.html";</script>';
	//header("Location: ../../index.html");
}

?>