/*
	<button class="play-pause">Track Play/Pause</button>
	<label><input class="volume" type="range" min="0" max="100" value="80" step="1"> <span class="range-value">80%</span></label>
*/

function Track() {
	return this.createHTMLElement();
}

Track.prototype.createHTMLElement = function(){

	const element = document.createElement('div');
	element.classList.add('track');

	const drapDropHandler = new DragDropHandler();
	element.appendChild(drapDropHandler);

	const playPause = new Button('Play/Pause', ['play-pause']);
	element.appendChild(playPause);

	const volume = new Range( 'Volume', {
		'min': 0,
		'max': 100,
		'value': 80,
		'step': 1,
		'unit': '%'
	} );
	element.appendChild(volume);

	return element;
}
