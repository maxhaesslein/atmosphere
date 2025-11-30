function Track( trackData ) {

	if( ! trackData.id ) {
		console.warn('track data is missing id!');
		return;
	}

	const id = trackData.id;

	const sceneId = trackData.scene;
	const boardId = trackData.board;

	const defaultData = {
		'volume': {data: 80}, // we need the object, to pass this as a reference to range.js
	};

	data.scenes[sceneId].boards[boardId].tracks[id] = { ...defaultData, ...trackData };

	this.data = data.scenes[sceneId].boards[boardId].tracks[id];

	this.data.playing = false; // always start in stopped state

	if( ! this.data.url ) {
		// TODO: replace prompt() with custom designed overlay
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

	const playPause = new Button('Play/Pause', ['play-pause']);
	playPause.addEventListener( 'click', this.playPause.bind(this) );
	element.appendChild(playPause);

	const volume = new Range( 'Volume', {
		'min': 0,
		'max': 100,
		'value': this.data.volume,
		'step': 1,
		'unit': '%'
	} );
	element.appendChild(volume);

	element.appendChild(this.youtube.createHTMLElement());

	const timeline = document.createElement('progress');
	timeline.classList.add('progress');
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
