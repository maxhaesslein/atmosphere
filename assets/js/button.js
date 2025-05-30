function Button( title, classes, call, context ) {

	this.title = title;

	return this.createHTMLElement(classes, call, context);
}

Button.prototype.createHTMLElement = function(classes, call, context){

	const element = document.createElement('button');
	element.classList.add(...classes);
	element.innerText = this.title;

	if( call ) {
		element.addEventListener('click', call.bind(context), false);
	}

	return element;
}
