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
		<h1><a href="http://<?php echo $_SERVER['SERVER_NAME']; ?>">CIA Flipbook</a></h1>
	</header>
	<div id="main">
		<h3>Generated PDFs</h3>
		<?php

			$dirs = array_filter(glob('generated/*'), 'is_dir');
			foreach($dirs as $dir){
				echo '<div>';
				echo '<a href="'.$dir.'">'.substr($dir,10).'</a>';
				echo '</div>';
			}
		?>

		<h3>Create Flipbook</h3>
		<form action="convert.php" method="post" enctype="multipart/form-data">
			<label for="proj-name">Flipbook Name</label>
			<br>(A-Z, 0 - 9, -, _)<br/>
			<input type="text" name="proj-name" placeholder="Enter Name"/>
			<br/><br/>
			<input name="file" type="file"/>
			<br/>
			<button type="submit">UPLOAD</button>
		</form>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="js/scripts.js"></script>
</body>
</html>