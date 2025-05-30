function DragDropHandler() {
	return this.createHTMLElement();
}

DragDropHandler.prototype.createHTMLElement = function(){

	const element = document.createElement('span');
	element.classList.add('drag-drop-handle');

	return element;
}
