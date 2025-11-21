function Session() {

	// TODO: make sure the browser supports localStorage; otherwise, show warning, but continue

    try {
        const testKey = '__storage_test__';
        window.localStorage.setItem(testKey, '1');
        window.localStorage.removeItem(testKey);
		this.savingEnabled = true;
    } catch (e) {
        return false;
    }

}

Session.prototype.save = function(){

	if( ! this.savingEnabled ) return;

	console.info('saving …');

	const storeData = JSON.stringify(data);

	localStorage.setItem('atmosphere-data', storeData);

}

Session.prototype.load = function(){
	
	if( ! this.savingEnabled ) return;

	const storedData = localStorage.getItem('atmosphere-data');

	if( ! storedData ) return;

	console.info('loading data …');

	data = JSON.parse(storedData);

	this.initNewData();

}

Session.prototype.initNewData = function(){

	this.savingEnabled = false;

	// init saved boards:
	const boards = JSON.parse(JSON.stringify(data.boards)); // make a copy
	data.boards = [];
	for( const board of boards ) {
		new Board(board.id, board);
	}

	this.savingEnabled = true;

}
