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

	return element;
}
