const profileEditingButton = document.querySelector('.profile__btn');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close');
function toggleModalWindow() {
  modalWindow.classList.toggle('popup_is-active');
}
profileEditingButton.addEventListener('click', toggleModalWindow);
modalCloseBtn.addEventListener('click', toggleModalWindow);
