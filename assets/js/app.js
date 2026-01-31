
// global variables:
let scenes,
	scene,
	controls,
	session,
	data = {
		sceneId: 0,
		scenes: {},
		activeScene: false,
	};


document.addEventListener( 'DOMContentLoaded', init, false );
function init(){

	console.info('starting app …');

	const canvas = document.getElementById('canvas');
	scenes = document.getElementById('scenes');
	scene = document.getElementById('scene');
	controls = document.getElementById('controls');

	if( ! canvas || ! scene || ! controls ) {
		console.warn('missing HTML elements!', canvas, scenes, scene, controls);
		return;
	}

	session = new Session();
	session.load();

	ButtonAddScene.init();
}


const ButtonAddScene = {

	init: function(){
		const button = document.getElementById('scene-new');
		if( ! button ) return;

		button.addEventListener('click', ButtonAddScene.newScene);
	},

	newScene: async function(){

		const sceneNumber = ++data.sceneId;

		const sceneId = 'scene-'+sceneNumber;

		const title = await showPrompt('Scene title?', 'Scene #'+sceneNumber, 'Enter scene title');

		if( title === null ) {
			data.sceneId--;
			return;
		}

		let sceneData = {
			'title': title || 'Scene #'+sceneNumber
		};

		new Scene(sceneId, sceneData, true);

		session.save();
	}

};
