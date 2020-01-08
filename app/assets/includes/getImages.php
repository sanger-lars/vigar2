<?php 
$filenameArray = [];

$handle = opendir(dirname('../images/ledere/ledere'));
        while($file = readdir($handle)){
            if($file !== '.' && $file !== '..' && $file !== 'Thumbs.db'){
                array_push($filenameArray, "$file");
            }
        }

echo json_encode($filenameArray);