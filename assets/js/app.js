
// global variables:
let boards,
	controls,
	data = {id: 0, boards: []},
	session;


document.addEventListener( 'DOMContentLoaded', init, false );
function init(){

	console.info('starting app …');

	const canvas = document.getElementById('canvas');
	boards = document.getElementById('boards');
	controls = document.getElementById('controls');

	if( ! canvas || ! boards || ! controls ) {
		console.warn('missing HTML elements!', canvas, boards, controls);
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
		session.save();
	}

};
