function Range( title, args ) {

	this.title = title;
	this.args = args;

	return this.createHTMLElement();
}

Range.prototype.createHTMLElement = function(){

	const element = document.createElement('label');
	element.innerText = this.title;

	const input = document.createElement('input');
	input.type = 'range';
	if( this.args.min !== undefined ) input.min = this.args.min;
	if( this.args.max !== undefined ) input.max = this.args.max;
	if( this.args.value !== undefined ) input.value = this.args.value;
	if( this.args.step !== undefined ) input.step = this.args.step;
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
	this.value = this.input.value;
	this.rangeValue.innerText = this.value+this.args.unit;
}
