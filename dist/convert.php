<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$uploadDir = "pdf/";
$file = $uploadDir . basename($_FILES["file"]["name"]);
$fileType = strtolower(pathinfo($file,PATHINFO_EXTENSION));
$uploadOk = 1;

if(isset($_POST['proj-name'])){
	$genDir = $_POST['proj-name'];

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
if ($_FILES["file"]["size"] > 1000000) {
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
        if(!file_exists('generated/'.$genDir)){
        	mkdir('generated/'.$genDir);
        }
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}


$files = glob('generated/'.$genDir.'*'); // get all file names
foreach($files as $file){ // iterate files
  if(is_file($file))
    unlink($file); // delete file
}

$pdf = new Imagick();
//$pdf->setResolution(144,144);
$pdf->pingImage($_SERVER['DOCUMENT_ROOT'] .'/'.$uploadDir . basename($_FILES["file"]["name"]));

$pdf->readImage($_SERVER['DOCUMENT_ROOT'] .'/'.$uploadDir . basename($_FILES["file"]["name"]));
$pages = $pdf->getNumberImages();
$pageWidth= 0;
$pageHeight = 0;
for($i=1;$i<$pages;$i++){
	$pdf->setIteratorIndex($i);
	if($i==1){
		$pageWidth = $pdf->getImageWidth();
		$pageHeight = $pdf->getImageHeight();
	}
	if($i%2==1 && $pdf->getImageWidth() > $pageWidth){
		$pdf->cropImage($pageWidth,$pageHeight,$pageWidth,0);
	}else{
		$pdf->cropImage($pageWidth,$pageHeight,0,0);
	}
	echo $i.': '.$pdf->getImageWidth().', '.$pdf->getImageHeight().'  '.$pdf->getImageResolution()['x'];
	echo '<br/>';
	$pdf->writeImage($_SERVER['DOCUMENT_ROOT'] .'/generated/'.$genDir.'/page-'.$i.'.jpg');
}
copy('generated/display.php','generated/'.$genDir.'/index.php');
header('Location: generated/'.$genDir.'/index.php');

?>
