
function onYouTubeIframeAPIReady(){ // needed for YouTube API
	document.dispatchEvent(new Event('youTubeAPIReady'));
}


function YouTube( url ) {

	this.url = url;
	this.ready = false;
	this.playing = false;

	if( ! this.extractId() ) {
		console.warn('yould not extract id');
		return;
	}

	this.internalId = Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, 0); // TODO: replace with function call
}

YouTube.prototype.init = function(timeline, volume){

	if( ! this.internalId ) return;

	this.timeline = timeline;
	this.startVolume = parseInt(volume.data);

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

	if( ! this.internalId ) {
		console.warn('no internal id!', this.internalId);
		return;
	}

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

	return this.youtubeid;
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
		width: '256',
		height: '200',
		videoId: this.youtubeid,
		host: 'https://www.youtube-nocookie.com',
		playerVars: {
			controls: 0,
			modestbranding: 0,
			rel: 0,
			showinfo: 0,
			origin: window.location.host, // needed for youtube-nocookie.com
			playsinline: 1
		},
		events: {
			onReady: this.youtubeready.bind(this),
			onStateChange: this.youtubestatechange.bind(this)
		}
	});

	document.removeEventListener('youTubeAPIReady', this._onAPIReady);
}

YouTube.prototype.youtubeready = function(e){
	this.setVolume(this.startVolume);
	this.ready = true;
}

YouTube.prototype.youtubestatechange = function(e){

	if( e.data === YT.PlayerState.PLAYING ) {
		this.playing = true;
	} else {
		this.playing = false;
	}
	
}

YouTube.prototype.play = function(){
	this.player.playVideo();
	this.updateTimeInterval = setInterval(this.updateTimeline.bind(this), 200);
}

YouTube.prototype.setVolume = function(volume){

	if( ! this.player ) return;

	this.player.setVolume(volume);
}

YouTube.prototype.updateTimeline = function(){

	if( ! this.timeline ) {
		return;
	}

	const time = this.player.getCurrentTime();
	const duration = this.player.getDuration();

	if( time === undefined || duration === undefined ) {
		return;
	}
	const percent = time/duration*100;

	this.timeline.value = percent;

}

YouTube.prototype.pause = function(){
	this.player.pauseVideo();
	clearInterval(this.updateTimeInterval);
}

YouTube.prototype.playPause = function() {

	if( ! this.ready ) {
		return false;
	}

	if( this.playing ) {
		this.pause();
		return false;
	} else {
		this.play();
		return true;
	}

}
