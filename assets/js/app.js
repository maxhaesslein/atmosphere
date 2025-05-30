
// global variables:
let boards,
	globalControls;


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

	ButtonAddBoard.init();
}


const ButtonAddBoard = {

	id: 0,

	init: function(){
		const button = document.getElementById('add-board');
		if( ! button ) return;

		button.addEventListener('click', ButtonAddBoard.newBoard);
	},

	newBoard: function(){
		const board = new Board(++ButtonAddBoard.id);
	}

};
