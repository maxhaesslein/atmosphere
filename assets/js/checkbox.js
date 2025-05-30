function Checkbox( title, name, checked ) {

	this.title = title;
	this.name = name;
	this.checked = checked;

	return this.createHTMLElement();
}

/*
<label><input type="checkbox" checked> Loop Tracks on this Board</label>
*/

Checkbox.prototype.createHTMLElement = function(){

	const element = document.createElement('label');

	const input = document.createElement('input');
	input.type = 'checkbox';
	input.checked = this.checked;
	element.appendChild(input);

	const title = document.createTextNode(this.title);
	element.appendChild(title);

	return element;
}

Checkbox.prototype.init = function(){
	this.input.addEventListener( 'input', this.updateCheckbox.bind(this), false);
	this.updateCheckbox();
}

Checkbox.prototype.updateCheckbox = function(e){
	this.value = this.input.value;
	this.rangeValue.innerText = this.value+this.args.unit;
}
