function Track( trackData ) {

	this.data = trackData;

	this.data.playing = false; // always start in stopped state

	// TODO: replace prompt() with custom designed overlay
	if( ! this.data.url ) {
		const url = window.prompt('YouTube Video URL');
		if( ! url ) return;
		this.data.url = url;
	}

	this.youtube = new YouTube(this.data.url);

}

Track.prototype.createHTMLElement = function( youtube ){

	if( this.element ) {
		return this.element;
	}

	const element = document.createElement('div');
	element.classList.add('track');

	const drapDropHandler = new DragDropHandler();
	element.appendChild(drapDropHandler);

	const playPause = new Button('Play/Pause', ['play-pause']);
	playPause.addEventListener( 'click', this.playPause.bind(this) );
	element.appendChild(playPause);

	element.appendChild(this.youtube.createHTMLElement());

	const timeline = document.createElement('progress');
	timeline.value = 0;
	timeline.max = 100;
	element.appendChild(timeline);

	this.timeline = timeline;

	this.element = element;

	return element;
}

Track.prototype.init = function(){
	this.youtube.init(this.timeline);
}

Track.prototype.playPause = function(){

	this.data.playing = this.youtube.playPause();

	if( this.data.playing ) {
		this.element.classList.add('playing');
	} else {
		this.element.classList.remove('playing');
	}
}
