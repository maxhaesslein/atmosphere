(function(){

function init(){
	inputRange.init();
	trackAdd.init();
	boardAdd.init();
}
document.addEventListener( 'DOMContentLoaded', init, false );


const inputRange = {

	init: function(){
		for( const range of document.querySelectorAll('input[type="range"]') ) {
			inputRange.initRange(range);
		}
	},

	initRange: function( range ) {

		if( ! range ) return;
		if( range.dataset.inited ) return;

		range.addEventListener('input', function(e){
			inputRange.changeRange(this);
		}, false);

		inputRange.changeRange(range);

		range.dataset.inited = true;
	},

	changeRange: function( range ) {

		const rangeWrapper = range.closest('label');
		if( ! rangeWrapper ) return;

		const rangeValue = rangeWrapper.querySelector('.range-value');
		if( ! rangeValue ) return;

		let type = false;
		if( range.classList.contains('volume') ) {
			type = 'volume';
		} else if( range.classList.contains('fade-time') ) {
			type = 'fade';
		}

		const val = range.value;
		
		let text = val;
		if( type === 'volume' ) {
			text += '%';
		} else if( type === 'fade' ) {
			text = parseInt(text)/1000+'s';
		}

		rangeValue.innerText = text;

	}

};


const trackAdd = {

	init: function(){
		for( const button of document.querySelectorAll('button.add-track') ) {
			trackAdd.initButton(button);
		}
	},

	initButton: function(button) {
		button.addEventListener('click', trackAdd.triggerButton);
	},

	triggerButton: function(e) {

		const button = this;

		e.preventDefault();

		const wrapper = button.closest('.tracks');
		if( ! wrapper ) return;

		// NOTE: fake track add for the moment
		const track = wrapper.querySelector('.track').cloneNode(true);
		const volume = track.querySelector('input.volume');
		volume.value = 80;
		volume.removeAttribute('data-inited');
		inputRange.initRange(volume);

		wrapper.insertBefore(track, button.closest('.track-new'));
		
	}

};


const boardAdd = {

	init: function(){
		for( const button of document.querySelectorAll('button.add-board') ) {
			boardAdd.initButton(button);
		}
	},

	initButton: function(button) {
		button.addEventListener('click', boardAdd.triggerButton);
	},

	triggerButton: function(e) {

		const button = this;

		e.preventDefault();

		const wrapper = button.closest('.boards');
		if( ! wrapper ) return;

		// NOTE: fake board add for the moment
		const board = wrapper.querySelector('.board').cloneNode(true);

		for( const range of board.querySelectorAll('range') ) {
			range.removeAttribute('data-inited');
			inputRange.initRange(range);
		}

		wrapper.insertBefore(board, button.closest('.board-new'));
		
	}

};


})();