<?php
  session_start();
?>
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700' rel='stylesheet' type='text/css'>
  <title>Vigar Stamme - upload</title>
  <meta name="keywords" content="Spejder,KFUM Spejderne, Vigar, Spejder i Hvidovre">
  <meta name="description" content="Hjemmeside for KFUM Spejderne Vigar Stamme.">
  <META content=da http-equiv=Content-Language>
  <META content="text/html"; charset="utf-8"; http-equiv="Content-Type">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script type="text/javascript" src="assets/includes/upload.js"></script>  
  
  <style>
    h3 {
      color: yellow;
    }

    p {
      line-height: 2;
    }
    
    .skjul {
        display: none;
    }

    textarea {
      margin-top: 20px;
      font-size: 1rem; 
      width: 95%; 
      height: 100px;
    }

    @media (min-width: 1000px) {
      .flex3 img {
        padding: 10px;
      }
    
      textarea {
        margin-top: 20px;
        font-size: 1.2rem; 
        width: 80%; 
        height: 100px;
      }
    }
  </style>

</head>
<body>
    <?php 
    if (isset($_SESSION['u_id'])) {
      echo '<form id="logud" action="assets/includes/logout.inc.php" method="POST" style="position: absolute; right: 20px;">
        <button class="sort_knap" type="submit" name="logout-submit">Log ud</button>
      </form><a href="forsiden.php"><button class="sort_knap" >Forsiden</button></a>
      <a href="lederne.php"><button class="sort_knap" >Lederne</button></a>
      <a href="bestyrelsen.php"><button class="sort_knap" >Bestyrelsen</button></a>';
    }
  ?>
  <script src="menu.html"></script>    
  <br>
  <div class= "linje_green"></div>
 
   <div class="overskriften">
    <h1>upload - Enhederne</h1>
  </div>
  
  <div align="center">
    <form method="POST" action="assets/includes/upload_enhed.php" id="larsform" enctype="multipart/form-data" >
      <p style="color: yellow"> 
        vælg enhed >  
        <select id="enhed" name="enhed" onchange="hent_gemte_data(vis_data)">
          <option value=""></option>
          <option value="fam">Fammiliespejd</option>
          <option value="bae">Bæver</option>
          <option value="ulv">Ulv</option>
          <option value="spe">Spejder</option>
          <option value="rov">Rover</option>
        </select>
        <input type="text" name="nr" id="nr" style="visibility: hidden; width: 20px;">
        <br>
        <input id="upload_bild" type="file" name="files">
        <br>
        vælg billed position >
        <select id="poss" name="poss" onchange="check_knapstatus()">
          <option value="0"></option>
          <option value="1">venstre</option>
          <option value="2">midten</option>
          <option value="3">højre</option>
        </select>
        <?php 
          if (isset($_SESSION['u_id'])) {
            echo '<button class="sort_knap skjul" type="submit" id="send" > Upload </button>';
          }
        ?>
        <img id="output_image" style="width: auto;">
          
        <br>
        <textarea name="tekst" class="tekst2" id="tekst" placeholder="Tekst" align="center" onchange="check_knapstatus(true)"></textarea>
        <br>
        </p>
    </form>
  </div>

  <div id="preview" style="display: visible"></div>

  <div class="clear"></div>
  <div class="filler" style="height: 300px"></div>
  <script src="footer.html"></script>  

</body>
</html>
