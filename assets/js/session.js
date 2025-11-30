function Session() {

    try {
        const testKey = 'atmosphere-storage-test';
        window.localStorage.setItem(testKey, '1');
        window.localStorage.removeItem(testKey);
		this.savingEnabled = true;
    } catch (e) {
    	this.savingEnabled = false;
        return;
    }

}

Session.prototype.save = function(){

	if( ! this.savingEnabled ) return;

	console.info('saving …');

	const storeData = JSON.stringify(data);

	console.log(storeData); // DEBUG

	localStorage.setItem('atmosphere-data', storeData);

}

Session.prototype.load = function(){
	
	if( ! this.savingEnabled ) return;

	const storedData = localStorage.getItem('atmosphere-data');

	if( ! storedData ) return;

	console.info('loading data …');

	const newData = JSON.parse(storedData);

	if( ! newData.scenes ) {
		console.warn( 'saved data is invalid! will not load data.' );
		return;
	}

	data = newData;

	this.initNewData();

}

Session.prototype.initNewData = function(){

	this.savingEnabled = false;

	// init saved scenes:
	console.log('data', data)
	for( const sceneId of Object.keys(data.scenes) ) {
		const sceneData = data.scenes[sceneId];

		if( ! sceneData || ! sceneData.id ) {
			console.warn('scene is missing data, skipping!', sceneId, sceneData);
			continue;
		}

		let activeScene = false;
		if( sceneData.id === data.activeScene ) {
			activeScene = true;
		}

		new Scene(sceneId, sceneData, activeScene);
	}

	this.savingEnabled = true;

}
