function Session() {

	// TODO: make sure the browser supports localStorage; otherwise, show warning, but continue

	this.saving = true;

	const autosaveDelay = 10; // in seconds

	this.heartbeat = setInterval( this.save.bind(this), autosaveDelay*1000); // autosave every x seconds

}

Session.prototype.save = function(){

	if( ! this.saving ) return;

	console.info('saving …');

	const storeData = JSON.stringify(data);

	localStorage.setItem('atmosphere-data', storeData);

}

Session.prototype.load = function(){
	
	const storedData = localStorage.getItem('atmosphere-data');

	if( ! storedData ) return;

	console.info('loading data …');

	data = JSON.parse(storedData);

	this.initNewData();

}

Session.prototype.initNewData = function(){

	this.saving = false;

	// init saved boards:
	const boards = JSON.parse(JSON.stringify(data.boards)); // make a copy
	data.boards = [];
	for( const board of boards ) {
		new Board(board.id, board);
	}

	this.saving = true;

}
