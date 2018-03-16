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
			
			$images = glob("144/page-*");
			$files = count($images);
			foreach($images as $i=>$image){
				echo '<div class="page'.(($i==0) ? " open":"").'" style="left:50%;"><img draggable="false" src="'.$image.'" /></div>';
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