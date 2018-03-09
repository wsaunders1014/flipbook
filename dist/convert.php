<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$files = glob('generated/*'); // get all file names
foreach($files as $file){ // iterate files
  if(is_file($file))
    unlink($file); // delete file
}

$pdf = new Imagick();
//$pdf->setResolution(144,144);
$pdf->pingImage($_SERVER['DOCUMENT_ROOT'] .'/pdf/cia-promo.pdf[0]');

$pdf->readImage($_SERVER['DOCUMENT_ROOT'] .'/pdf/cia-promo.pdf');
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
	$pdf->writeImage($_SERVER['DOCUMENT_ROOT'] .'/generated/page-'.$i.'.jpg');
}
?>
