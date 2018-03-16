<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
$uploadDir = "pdf/";
$_FILES["file"]["name"] = str_replace(" ","_",$_FILES["file"]["name"]);
$file = $uploadDir . basename($_FILES["file"]["name"]);
$fileType = strtolower(pathinfo($file,PATHINFO_EXTENSION));
$uploadOk = 1;

if(isset($_POST['proj-name'])){
    $genDir = 'generated/'.$_POST['proj-name'];

}else{
    $uploadOk = 0;
    echo "Project Name required.";
}
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

}
// Check if file already exists
if (file_exists($file)) {
   // echo "File already exists.<br/>";
   // $uploadOk = 0;
}
// Allow certain file formats
if($fileType !='pdf'){
    echo "Only pdfs allowed.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["file"]["size"] > 150000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
//CHECK ERRORS
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $file)) {
        echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
        chgrp($file,'www');
        chmod($file,0775);
        if(!file_exists($genDir)){
            mkdir($genDir,0775);
            exec('sudo chown -R ec2-user '.$genDir);
           
        }
        exec('/usr/local/bin/pdftopng -r 300 '.$file.' '.$genDir.'/page 2>&1',$output,$return_var);
        //echo print_r($output);
       // print_r($output);
        //| grep '[0-9]\{3,4\}x[0-9]\{3,4\} '
        //exec("identify ".$genDir."/page-000001.png  | grep -o '[0-9]\{3,4\}x[0-9]\{3,4\} ' 2>&1",$size,$return_var);
        // $size = explode('x',$size[0]);
        // print_r($size);
        // $coverW = $size[0];
        // $coverH = $size[1];
        exec('optipng -o4'.$genDir.'/page-*.png');

    } else {
        echo "Sorry, there was an error uploading your file.<br/>";
        print_r($_FILES);
    }
}


$files = glob($genDir.'*'); // get all file names
foreach($files as $file){ // iterate files
  if(is_file($file))
    unlink($file); // delete file
}

copy('display.php',$genDir.'/index.php');
//header('Location: '.$genDir.'/index.php');

?>
