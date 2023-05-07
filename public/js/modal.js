let modalOverlay = document.getElementById('modal-overlay'),
	closeModal = document.getElementById('close-modal'),
	body = document.body;

function openImgModal(img) {
	let filename = img.src.replace('_tn', '').substring(img.src.lastIndexOf('/')+1);
	let title = img.parentNode.parentNode.querySelector('.artwork__title').innerText;
	let newImg = document.createElement('img');
	newImg.src = `public/images/${filename}`;
	modalOverlay.querySelector('#modal-title').innerText = title;
	modalOverlay.querySelector('#modal-image').appendChild(newImg);
	
	modalOverlay.classList.toggle('modal-hidden');
	modalOverlay.setAttribute("aria-hidden", "false");
	// Prevent rest of content from scrolling
	body.classList.toggle('noScroll');
};

closeModal.addEventListener('click', function () {
	modalOverlay.classList.toggle('modal-hidden');
	modalOverlay.setAttribute("aria-hidden", "true");
	modalOverlay.querySelector('#modal-title').innerText = "";
	let modalImage = modalOverlay.querySelector('#modal-image');
	modalImage.removeChild(modalImage.firstChild);
	// Turn scrolling back on for rest of content
	body.classList.toggle('noScroll');
});
// Allow ESC key (key code 27) to close modal
document.addEventListener('keyup', function (e) {
	if (e.keyCode == 27) {
		if (!modalOverlay.classList.contains('modal-hidden')) {
			modalOverlay.classList.toggle('modal-hidden');
			modalOverlay.setAttribute("aria-hidden", "true");
			modalOverlay.querySelector('#modal-title').innerText = "";
			let modalImage = modalOverlay.querySelector('#modal-image');
			modalImage.removeChild(modalImage.firstChild);
			body.classList.toggle('noScroll');
		}
	}
});
// Allow a click outside the modal to close modal
modalOverlay.addEventListener('click', function (e) {
	if (e.target === modalOverlay) {
		modalOverlay.classList.toggle('modal-hidden');
		modalOverlay.setAttribute("aria-hidden", "true");
		modalOverlay.querySelector('#modal-title').innerText = "";
		let modalImage = modalOverlay.querySelector('#modal-image');
		modalImage.removeChild(modalImage.firstChild);
		body.classList.toggle('noScroll');
	}
	return false;
});

