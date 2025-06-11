function Board( id, boardData ){

	if( ! boardData ) {
		boardData = {
			'id': id
		};
	}

	const defaultData = {
		title: 'Board #'+id,
		tracks: [],
		volume: {data: 80}, // we need the object, to pass this as a reference to range.js
		fadeTime: {data: 5000}, // we need the object, to pass this as a reference to range.js
	};

	this.data = { ...defaultData, ...boardData };

	console.log(this.data);

	data.boards.push(this.data);

	const htmlElement = this.createHTMLElement();
	boards.insertBefore(htmlElement, boards.querySelector('.board-new'));

	// init saved tracks:
	const tracksToInit = JSON.parse(JSON.stringify(this.data.tracks)); // make a copy
	this.data.tracks = [];
	for( const trackData of tracksToInit ) {
		if( ! trackData.url ) continue;
		this.addTrack(trackData);
	}

}

Board.prototype.createHTMLElement = function(){

	const element = document.createElement('section');
	element.classList.add('board');
	element.id = 'board-'+this.data.id;


	const title = document.createElement('div');
	title.classList.add('board-title');

	const drapDropHandler = new DragDropHandler();
	title.appendChild(drapDropHandler);

	const headline = new EditableText(this.data.title, 'h2', 16, this.updateTitle.bind(this));
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
		'value': this.data.fadeTime,
		'step': 250,
		'unit': 'ms'
	} );
	boardMeta.appendChild(fadeTime);

	const volume = new Range( 'Volume', {
		'min': 0,
		'max': 100,
		'value': this.data.volume,
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
	this.data.title = newTitle;
}

Board.prototype.addTrack = function( trackData ){

	if( ! trackData ) {
		trackData = {
			'parent': this.data.id
		};
	}
	
	const track = new Track(trackData);

	// TODO: check, if this is a valid track before adding it (new Track() may return early)

	this.tracks.insertBefore(track.createHTMLElement(), this.tracks.querySelector('.track-new'));

	if( trackData.url ) {
		this.data.tracks.push(trackData);
		track.init(trackData);
	}

}

Board.prototype.removeBoard = function(){

	// TODO: replace confirm() with custom designed overlay
	if( ! window.confirm('Remove the board "'+this.data.title+'"?') ) {
		return;
	}

	this.element.remove();

	const index = data.boards.indexOf(this.data);
	if( index !== -1 ) {
		data.boards.splice(index, 1);
	}

}
