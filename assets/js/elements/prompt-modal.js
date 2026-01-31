function showPrompt(title = 'Input', defaultValue = '', placeholder = '...') {
	return new Promise((resolve) => {
		const dialog = document.createElement('dialog');
		dialog.className = 'prompt-modal';
		dialog.innerHTML = `
			<div class="modal-content">
				<h2 class="modal-title">${title}</h2>
				<input type="text" class="modal-input" placeholder="${placeholder}" value="${defaultValue}">
				<div class="modal-buttons">
					<button class="modal-button modal-button-cancel">Abort</button>
					<button class="modal-button modal-button-ok">OK</button>
				</div>
			</div>
		`;

		document.body.appendChild(dialog);

		const input = dialog.querySelector('.modal-input');
		const okBtn = dialog.querySelector('.modal-button-ok');
		const cancelBtn = dialog.querySelector('.modal-button-cancel');

		const cleanup = (result) => {
			dialog.close();
			dialog.remove();
			resolve(result);
		};

		const handleOk = () => cleanup(input.value || null);
		const handleCancel = () => cleanup(null);

		okBtn.onclick = handleOk;
		cancelBtn.onclick = handleCancel;
		dialog.oncancel = handleCancel;
		input.onkeydown = (e) => {
			if( e.key === 'Enter' ) {
				e.preventDefault();
				handleOk();
			}
		};

		dialog.showModal();
		input.focus();
		input.select();
	});
}
