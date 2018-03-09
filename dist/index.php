<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<!DOCTYPE html>
<html>
<head>
<title>Flipbook</title>

<link rel="stylesheet" href="css/style.css" />
<style>
	img{
		width: 50%;
	}
</style>
</head>
<body>
<header>
CIA Flipbook
</header>
<div id="main">
<?php
$dirname = "generated/";
$images = glob($dirname."page-*.jpg",GLOB_NOSORT);
$files = count(scanDir($dirname));
for($i=1;$i<$files;$i++) {
    echo '<img src="generated/page-'.$i.'.jpg" />';
}

?>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>