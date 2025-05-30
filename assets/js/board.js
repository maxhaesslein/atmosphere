function Board( id ){
	this.id = id;
	this.title = 'Board #'+id;

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

	const headline = new EditableText(this.title, 'h2', 16, this.updateTitle.bind(this));
	title.appendChild(headline);

	const removeButton = new Button('Remove Board', ['remove', 'remove-board'], this.removeBoard, this);
	title.appendChild(removeButton)

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

	const Single = new Checkbox( 'Play Single Track', 'single', true );
	boardMeta.appendChild(Single);

	const Loop = new Checkbox( 'Loop Tracks', 'loop', true );
	boardMeta.appendChild(Loop);

	const Mute = new Checkbox( 'Mute Board', 'mute' );
	boardMeta.appendChild(Mute);

	element.appendChild(boardMeta);


	this.element = element;

	return element;
};

Board.prototype.updateTitle = function( newTitle ) {
	this.title = newTitle;
}

Board.prototype.addTrack = function(){
	
	const track = new Track();

	// TODO: check, if this is a valid track before adding it (new Track() may return early)

	this.tracks.insertBefore(track.createHTMLElement(), this.tracks.querySelector('.track-new'));

	track.init();

}

Board.prototype.removeBoard = function(){

	// TODO: replace confirm() with custom designed overlay
	if( ! window.confirm('Remove the board "'+this.title+'"?') ) {
		return;
	}

	this.element.remove();
}
