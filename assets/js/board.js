function Board( boardData ){

	if( ! boardData.id ) {
		console.warn('board data is missing id!');
		return;
	}

	const sceneId = boardData.scene;

	const id = boardData.id;

	const boardId = 'board-'+id;

	const defaultData = {
		'board': boardId,
		'title': 'Board #'+id,
		'tracks': {},
		'trackId': 0,
		'volume': {data: 80}, // we need the object, to pass this as a reference to range.js
		'fadeTime': {data: 5000}, // we need the object, to pass this as a reference to range.js
	};

	data.scenes[sceneId].boards[boardId] = { ...defaultData, ...boardData };

	this.data = data.scenes[sceneId].boards[boardId];

	console.log('new board', this.data);

	return this;
}

Board.prototype.createHTMLElement = function(){

	const element = document.createElement('section');
	element.classList.add('board');
	element.id = this.data.boardId;


	const title = document.createElement('div');
	title.classList.add('board-title');

	const drapDropHandler = new DragDropHandler();
	title.appendChild(drapDropHandler);

	const headline = new EditableText(this.data.title, 'h3', 16, this.updateTitle.bind(this));
	title.appendChild(headline);

	const removeButton = new Button('Remove Board', ['remove', 'remove-board'], this.removeBoard, this);
	title.appendChild(removeButton)

	element.appendChild(title);


	const tracks = document.createElement('div');
	tracks.classList.add('tracks');

	const trackNew = document.createElement('div');
	trackNew.classList.add('track-new');

	const trackNewButton = new Button('+ Add Track', ['add', 'add-track'], this.addTrack, this);
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

Board.prototype.initTracks = function(){

	for( const trackId of Object.keys(this.data.tracks) ) {
		const trackData = this.data.tracks[trackId];
		if( ! trackData || ! trackData.url ) {
			console.warn('track is missing url, skipping!');
			continue;
		}
		this.addTrack(trackData);
	}

}

Board.prototype.updateTitle = function( newTitle ) {
	this.data.title = newTitle;
	session.save();
}

Board.prototype.addTrack = function( trackData ){

	if( ! trackData || trackData instanceof Event ) {
		trackData = {
			'id': ++this.data.trackId,
			'scene': this.data.scene,
			'board': this.data.board,
		};
	}
	
	if( ! trackData.url ) {
		// TODO: replace prompt() with custom designed overlay
		const url = window.prompt('YouTube Video URL');
		if( ! url ) return;
		trackData.url = url;
	}

	const track = new Track( trackData );

	const htmlElement = track.createHTMLElement();
	if( ! htmlElement ) {
		console.warn('could not create track HTML element!');
		return;
	}

	this.tracks.insertBefore(htmlElement, this.tracks.querySelector('.track-new'));

	track.init();

	session.save();

}

Board.prototype.removeBoard = function(){

	// TODO: replace confirm() with custom designed overlay
	if( ! window.confirm('Remove the board "'+this.data.title+'"?') ) {
		return;
	}

	this.element.remove();

	delete data.scenes[this.data.scene].boards[this.data.board];

	if( Object.keys(data.scenes[this.data.scene].boards).length < 1 ) {
		data.scenes[this.data.scene].boardId = 0;
	}

	session.save();

}
