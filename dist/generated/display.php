<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<!DOCTYPE html>
<html>
<head>
<title>Flipbook</title>

<link rel="stylesheet" href="../../css/style.css" />
<style>
	img{
		width: 50%;
	}
</style>
</head>
<body>
	<header>
		<h1><a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>">CIA Flipbook</a></h1>
	</header>
	<div id="main">
		<div id="page-holder">
		<?php
			
			$images = glob("page-*.jpg");
			$files = count($images);
		
			for($i=1;$i<$files+1;$i++) {
				if($files > 9 && $i<10){
					$i='0'.$i;
				}
				if($i==1){
					echo '<div class="page open" style="left:50%;"><img src="page-'.$i.'.jpg" /></div>';
				}else{
					echo '<div class="page" style="left:50%;"><img src="page-'.$i.'.jpg" /></div>';
				}
			}
		?>
		</div>
		<div class="arrow left">
			<
		</div>
		<div class="arrow right">
			>
		</div>
		<div class="thumbs">

		</div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="../../js/scripts.js"></script>
</body>
</html>