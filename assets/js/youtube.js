
function onYouTubeIframeAPIReady(){ // needed for YouTube API
	document.dispatchEvent(new Event('youTubeAPIReady'));
}


function YouTube( url ) {

	this.url = url;
	this.ready = false;
	this.playing = false;

	this.extractId();

	this.internalId = Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, 0); // TODO: replace with function call
}

YouTube.prototype.init = function(){

	if( window.YT && window.YT.Player ) {
		// youtube api is already loaded
		this.embed();
	} else {
		// youtube api is not loaded yet
		document.addEventListener('youTubeAPIReady', this.embed.bind(this));
		this.loadAPI();
	}
}

YouTube.prototype.createHTMLElement = function(){

	if( this.element ) {
		return this.element;
	}

	const element = document.createElement('div');
	element.classList.add('youtube-embed');

	const player = document.createElement('div');
	player.id = this.internalId;

	element.appendChild(player);

	this.element = element;

	return element;
}

YouTube.prototype.extractId = function(){

	const url = this.url;

	const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts|watch)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
	const match = url.match(regex);

	if( ! match ) return;

	this.youtubeid = match[1];

}

YouTube.prototype.loadAPI = function(){
	if( document.querySelector('script[src*="youtube.com/iframe_api"]') ) return;

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

YouTube.prototype.embed = function(){

	this.player = new YT.Player(this.internalId, {
		width: '200',
		height: '200',
		videoId: this.youtubeid,
		host: 'https://www.youtube-nocookie.com',
		playerVars: {
			origin: window.location.host, // needed for youtube-nocookie.com
			'playsinline': 1
		},
		events: {
			onReady: this.youtubeready.bind(this),
			onStateChange: this.youtubestatechange.bind(this)
		}
	});

	document.removeEventListener('youTubeAPIReady', this._onAPIReady);
}

YouTube.prototype.youtubeready = function(e){
	this.ready = true;
}

YouTube.prototype.youtubestatechange = function(e){

	if( e.data === YT.PlayerState.PLAYING ) {
		this.playing = true;
	} else {
		this.playing = false;
	}

	
}

YouTube.prototype.playPause = function() {

	if( ! this.ready ) {
		return false;
	}

	if( this.playing ) {
		this.player.pauseVideo();
		return false;
	} else {
		this.player.playVideo();
		return true;
	}

}
