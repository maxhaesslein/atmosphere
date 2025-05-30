function DragDropHandler(selfClass, context) {

	this.context = context;

	if( context ) {
		let draggedElement = null;
		context.addEventListener('dragstart', function(e){
			draggedElement = e.target;
			draggedElement.classList.add('dragging');
		});

		context.addEventListener('dragover', function(e){
			e.preventDefault();
			const targetElement = e.target.closest(selfClass);
			if( ! targetElement || targetElement === draggedElement ) return;

			const bounding = targetElement.getBoundingClientRect();
			const offest = e.clientX-bounding.left;
			if( offest > bounding.width/2 ) {
				targetElement.after(draggedElement);
			} else {
				targetElement.before(draggedElement);
			}
		});

		context.addEventListener('dragend', function(e){
			draggedElement.classList.remove('dragging');
			draggedElement = null;
		});
	}

	return this.createHTMLElement();
}

DragDropHandler.prototype.createHTMLElement = function(){

	const element = document.createElement('span');
	element.classList.add('drag-drop-handle');

	return element;
}
