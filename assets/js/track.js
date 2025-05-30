function Track() {

	// TODO: replace prompt() with custom designed overlay
	const url = window.prompt('YouTube Video URL');
	if( ! url ) return;

	this.youtube = new YouTube(url);

	this.playing = false;

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

	this.element = element;

	return element;
}

Track.prototype.init = function(){
	this.youtube.init();
}

Track.prototype.playPause = function(){

	this.playing = this.youtube.playPause();

	if( this.playing ) {
		this.element.classList.add('playing');
	} else {
		this.element.classList.remove('playing');
	}
}
