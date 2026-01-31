function Scene( id, sceneData, activeScene ) {

	const defaultData = {
		'id': id,
		'boardId': 0,
		'boards': {}
	}

	data.scenes[id] = { ...defaultData, ...sceneData };

	this.data = data.scenes[id];

	const htmlElement = this.createHTMLElement();
	scenes.insertBefore(htmlElement, scenes.querySelector('.scene-new') );

	if( activeScene ) {
		this.activate();
	}
}

Scene.prototype.createHTMLElement = function(){

	const element = document.createElement('button');
	element.classList.add('scene-button');
	element.innerText = this.data.title;

	element.addEventListener('click', this.activate.bind(this));

	this.element = element;

	return element;
}

Scene.prototype.activate = function(){

	for( const activeScene of scenes.querySelectorAll('button.scene-button--active') ) {
		activeScene.classList.remove('scene-button--active');
	}

	this.element.classList.add('scene-button--active');
	
	scene.innerHTML = '';

	data.activeScene = this.data.id;

	session.save();

	this.initBoards();

}

Scene.prototype.initBoards = function(){

	this.boards = document.createElement('section');
	this.boards.classList.add('boards');

	const sceneControls = document.createElement('section');
	sceneControls.classList.add('scene-controls');

	const title = new EditableText(this.data.title, 'h2', 16, this.updateTitle.bind(this));
	sceneControls.appendChild(title);

	const removeButton = new Button('Delete Scene', ['remove', 'remove-scene'], this.removeScene, this);
	sceneControls.appendChild(removeButton);

	const boardNew = document.createElement('section');
	boardNew.classList.add('board-new');

	const boardNewButton = document.createElement('button');
	boardNewButton.classList.add('add', 'add-board');
	boardNewButton.innerText = '+ Add Board';

	boardNewButton.addEventListener('click', this.addBoard.bind(this));

	boardNew.appendChild(boardNewButton);

	this.boards.appendChild(boardNew);

	scene.appendChild(sceneControls);
	scene.appendChild(this.boards);

	// init saved boards:
	for( const boardId of Object.keys(this.data.boards) ) {
		const boardData = this.data.boards[boardId];
		if( ! boardData.title ) {
			console.warn('board is missing title, skipping!');
			continue;
		}
		this.addBoard(boardData);
	}

}

Scene.prototype.updateTitle = function( newTitle ) {
	this.data.title = newTitle;
	this.element.innerText = newTitle;
	session.save();
}

Scene.prototype.addBoard = async function( boardData ) {

	if( ! boardData || boardData instanceof Event ) {
		boardData = {
			'scene': this.data.id,
			'id': ++this.data.boardId
		};
	}

	if( ! boardData.title ) {
		const title = await showPrompt('Board title?', 'Board #'+this.data.boardId, 'Enter board title');

		if( title === null ) {
			this.data.boardId--;
			return;
		}

		if( title ) {
			boardData.title = title;
		}
	}

	const board = new Board( boardData );

	this.boards.insertBefore(board.createHTMLElement(), this.boards.querySelector('.board-new'));

	board.initTracks();

	session.save();

}

Scene.prototype.removeScene = async function(){

	const confirmed = await showConfirm(
		'Remove scene',
		'Remove the scene "'+this.data.title+'"?'
	);

	if( ! confirmed ) {
		return;
	}

	this.element.remove();

	delete data.scenes[this.data.id];

	for( const activeScene of scenes.querySelectorAll('button.scene-button--active') ) {
		activeScene.classList.remove('scene-button--active');
	}
	scene.innerHTML = '';

	data.activeScene = false;

	if( Object.keys(data.scenes).length < 1 ) {
		data.sceneId = 0;
	}

	session.save();

}
