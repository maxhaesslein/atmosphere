
// global variables:
let boards,
	globalControls,
	data = {id: 0, boards: []},
	session;


document.addEventListener( 'DOMContentLoaded', init, false );
function init(){

	console.info('starting app …');

	const canvas = document.getElementById('canvas');
	boards = document.getElementById('boards');
	globalControls = document.getElementById('globalControls');

	if( ! canvas || ! boards || ! globalControls ) {
		console.warn('missing HTML elements!', canvas, boards, globalControls);
		return;
	}

	session = new Session();
	session.load();

	ButtonAddBoard.init();
}


const ButtonAddBoard = {

	init: function(){
		const button = document.getElementById('add-board');
		if( ! button ) return;

		button.addEventListener('click', ButtonAddBoard.newBoard);
	},

	newBoard: function(){
		new Board(++data.id);
	}

};
