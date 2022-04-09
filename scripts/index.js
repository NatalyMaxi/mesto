const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const profileEditingButton = document.querySelector('.profile__btn');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = document.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('[name="full-name"]');
let jobinput = document.querySelector('[name="about-me"]');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const listContainer = document.querySelector('.list');
const template = document.querySelector('.template');


profileEditingButton.addEventListener('click', function () {
  modalWindow.classList.add('popup_is-active');
  nameInput.value = profileTitle.textContent;
  jobinput.value = profileSubtitle.textContent;
});

function closeModalWindow() {
  modalWindow.classList.remove('popup_is-active');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobinput.value;
  closeModalWindow();
};
formElement.addEventListener('submit', formSubmitHandler);
modalCloseBtn.addEventListener('click', closeModalWindow);

function render() {
  const html = initialCards.map(getElement);
  listContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const name = getElementTemplate.querySelector('.list__title');
  const link = getElementTemplate.querySelector('.list__image');
  name.textContent = item.name;
  link.src = item.link;
  link.alt = item.name;

  return getElementTemplate;
}

render();

