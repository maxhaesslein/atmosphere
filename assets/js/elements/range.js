function Range( title, args, callback ) {

	this.title = title;
	this.args = args;

	if( callback ) this.callback = callback;

	return this.createHTMLElement();
}

Range.prototype.createHTMLElement = function(){

	const element = document.createElement('label');
	element.innerText = this.title;

	const input = document.createElement('input');
	input.type = 'range';
	if( this.args.min !== undefined ) input.min = this.args.min;
	if( this.args.max !== undefined ) input.max = this.args.max;
	if( this.args.step !== undefined ) input.step = this.args.step;
	if( this.args.value !== undefined && this.args.value.data !== undefined ) input.value = this.args.value.data;
	element.appendChild(input);

	const rangeValue = document.createElement('span');
	rangeValue.classList.add('range-value');
	element.appendChild(rangeValue);

	this.rangeValue = rangeValue;
	this.input = input;

	this.init();

	return element;
}

Range.prototype.init = function(){
	this.input.addEventListener( 'input', this.updateRange.bind(this), false);
	this.updateRange();
}

Range.prototype.updateRange = function(e){
	this.args.value.data = this.input.value;
	this.rangeValue.innerText = this.input.value+this.args.unit;

	if( this.callback ) this.callback(this.input.value);
}
