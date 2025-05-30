function Board( id ){
	this.id = id;

	const htmlElement = this.createHTMLElement();
	boards.insertBefore(htmlElement, boards.querySelector('.board-new'));
}

Board.prototype.createHTMLElement = function(){

	const element = document.createElement('section');
	element.classList.add('board');
	element.id = 'board-'+this.id;


	const title = document.createElement('div');
	title.classList.add('board-title');

	const drapDropHandler = new DragDropHandler();
	title.appendChild(drapDropHandler);

	const headline = new EditableText('Board #'+this.id, 'h2');
	title.appendChild(headline);

	element.appendChild(title);


	const tracks = document.createElement('div');
	tracks.classList.add('tracks');

	const trackNew = document.createElement('div');
	trackNew.classList.add('track-new');

	const trackNewButton = new Button('Add Track', ['add', 'add-track'], this.addTrack, this);
	trackNew.appendChild(trackNewButton);

	tracks.appendChild(trackNew);
	this.tracks = tracks;

	element.appendChild(tracks);


	const boardMeta = document.createElement('div');
	boardMeta.classList.add('board-meta');

	const fadeTime = new Range( 'Fade-Time', {
		'min': 0,
		'max': 10000,
		'value': 5000,
		'step': 250,
		'unit': 'ms'
	} );
	boardMeta.appendChild(fadeTime);

	const volume = new Range( 'Volume', {
		'min': 0,
		'max': 100,
		'value': 80,
		'step': 1,
		'unit': '%'
	} );
	boardMeta.appendChild(volume);

	const Loop = new Checkbox( 'Loop Tracks', 'loop', true );
	boardMeta.appendChild(Loop);

	const Mute = new Checkbox( 'Mute Board', 'mute' );
	boardMeta.appendChild(Mute);

	element.appendChild(boardMeta);


	return element;
};

Board.prototype.addTrack = function(){
	
	const track = new Track();
	this.tracks.insertBefore(track, this.tracks.querySelector('.track-new'));

}
