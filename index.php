<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">

	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="viewport" content="viewport-fit=cover, user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">

	<title>Atmosphere</title>

	<link rel="stylesheet" href="assets/css/style.css" type="text/css" media="all">

	<script type="text/javascript" src="assets/js/app.js" defer></script>
	<script type="text/javascript" src="assets/js/board.js" defer></script>
	<script type="text/javascript" src="assets/js/session.js" defer></script>
	<script type="text/javascript" src="assets/js/track.js" defer></script>
	<script type="text/javascript" src="assets/js/youtube.js" defer></script>
	
	<script type="text/javascript" src="assets/js/elements/button.js" defer></script>
	<script type="text/javascript" src="assets/js/elements/checkbox.js" defer></script>
	<script type="text/javascript" src="assets/js/elements/drag-drop-handler.js" defer></script>
	<script type="text/javascript" src="assets/js/elements/editable-text.js" defer></script>
	<script type="text/javascript" src="assets/js/elements/range.js" defer></script>

</head>
<body>
<main id="canvas" class="canvas">

	<section class="global-controls">

		<section id="scenes" class="scenes">
			<button class="active scene-0">Scene 0</button>
			<button class="scene-1">Scene 1</button>
			<button id="scene-new" class="add add-scene">Add Scene</button>
		</section>

		<section id="controls" class="controls">
			<button class="play-pause">Global Play/Pause</button>
			<label>Global Volume <input class="volume" type="range" min="0" max="100" value="80" step="1"> <span class="range-value">80%</span></label>
		</section>

	</section>

	<section id="boards" class="boards">
		<section class="board-new">
			<button id="add-board" class="add add-board">Add Board</button>
		</section>
	</section>

</main>
</body>
</html>