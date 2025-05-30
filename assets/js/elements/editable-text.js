function EditableText( text, localName, maxLength, callback ) {

	if( ! localName ) {
		localName = 'span';
	}

	this.text = text;
	this.localName = localName;
	this.maxLength = maxLength;
	this.callback = callback;

	return this.createHTMLElement();
}

EditableText.prototype.createHTMLElement = function() {

	const element = document.createElement('span');

	element.addEventListener('click', this.changeContent.bind(this) );
	this.element = element;

	this.updateText( this.text );

	return element;
}

EditableText.prototype.updateText = function(newText) {

	this.element.innerText = '';

	if( ! newText ) {
		newText = '(unnamed)';
	}

	const textElement = document.createElement(this.localName);
	textElement.innerText = newText;
	this.element.appendChild(textElement);

	if( this.callback ) {
		this.callback(newText);
	}

	this.text = newText;
}

EditableText.prototype.changeContent = function(){

	if( this.editing ) return;

	this.editing = true;

	const form = document.createElement('form');

	const input = document.createElement('input');
	input.classList.add('editable-text');
	input.value = this.text;
	if( this.maxLength ) {
		input.maxLength = this.maxLength;
	}

	const save = document.createElement('button');
	save.classList.add('editable-text-save');
	save.innerText = 'save';

	form.appendChild(input);
	form.appendChild(save);

	this.element.innerText = '';
	this.element.appendChild(form);

	input.focus();

	form.addEventListener('submit', function(e){

		const input = this.element.querySelector('input');

		this.updateText(input.value);

		e.stopPropagation();

		this.editing = false;

	}.bind(this), false);
}
