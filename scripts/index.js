const profileEditingButton = document.querySelector('.profile__btn');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('[name="full-name"]');
let jobinput = document.querySelector('[name="about-me"]');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

profileEditingButton.addEventListener('click', function () {
  modalWindow.classList.add('popup_is-active');
  nameInput.value = profileTitle.textContent;
  jobinput.value = profileSubtitle.textContent;
});

function closeModalWindow() {
  modalWindow.classList.remove('popup_is-active');
}

modalCloseBtn.addEventListener('click', closeModalWindow);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobinput.value;
  closeModalWindow();
}

formElement.addEventListener('submit', formSubmitHandler);

