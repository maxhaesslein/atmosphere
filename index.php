<?php

$abspath = __DIR__.'/';

define( 'ATMOSPHERE_ABSPATH', $abspath );

$version = time(); // TODO: add version variable; currently we use this as a cache buster on every reload for development.

include(ATMOSPHERE_ABSPATH.'inc/local_content.php');

?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">

	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="viewport" content="viewport-fit=contain, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

	<link rel="manifest" href="manifest.json">
	<link rel="apple-touch-icon" href="icon-144x144.png">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="default">

	<title>Atmosphere</title>

	<link rel="stylesheet" href="assets/css/style.css?v=<?= $version ?>" type="text/css" media="all">

	<script type="text/javascript" src="assets/js/app.js?v=<?= $version ?>" defer></script>
	<script type="text/javascript" src="assets/js/board.js?v=<?= $version ?>" defer></script>
	<script type="text/javascript" src="assets/js/scene.js?v=<?= $version ?>" defer></script>
	<script type="text/javascript" src="assets/js/session.js?v=<?= $version ?>" defer></script>
	<script type="text/javascript" src="assets/js/track.js?v=<?= $version ?>" defer></script>
	<script type="text/javascript" src="assets/js/youtube.js?v=<?= $version ?>" defer></script>
	
	<script type="text/javascript" src="assets/js/elements/button.js?v=<?= $version ?>" defer></script>
	<script type="text/javascript" src="assets/js/elements/checkbox.js?v=<?= $version ?>" defer></script>
	<script type="text/javascript" src="assets/js/elements/drag-drop-handler.js?v=<?= $version ?>" defer></script>
	<script type="text/javascript" src="assets/js/elements/editable-text.js?v=<?= $version ?>" defer></script>
	<script type="text/javascript" src="assets/js/elements/range.js?v=<?= $version ?>" defer></script>

	<script type="text/javascript">
		const local_files = <?php echo json_encode(get_local_content(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
	</script>

</head>
<body>
<main id="canvas" class="canvas">

	<section class="global-controls">

		<section id="scenes" class="scenes">
			<button id="scene-new" class="scene-button scene-new add">+ Add Scene</button>
		</section>

		<section id="controls" class="controls">
			<button class="play-pause">Global Play/Pause</button>
			<label>Global Volume <input class="volume" type="range" min="0" max="100" value="80" step="1"> <span class="range-value">80%</span></label>
		</section>

	</section>

	<section id="scene" class="scene">
	</section>

</main>
</body>
</html>