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
const imageAddButton = document.querySelector('.profile__button');
const modalWindow = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('[name="full-name"]');
let jobinput = document.querySelector('[name="about-me"]');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const editCloseBtn = document.querySelector('.popup__close_type_edit');
const addCloseBtn = document.querySelector('.popup__close_type_add');
const imageCloseBtn = document.querySelector('.popup__close_type_image');
const modalWindowEdit = document.querySelector('.popup_type_edit');
const modalWindowAdd = document.querySelector('.popup_type_add');
const modalWindowImage = document.querySelector('.popup_type_image');
const listContainer = document.querySelector('.list');
const template = document.querySelector('.template');

function openPopup(modalWindow) {
  modalWindow.classList.add('popup_is-active');
};

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_is-active');
};

profileEditingButton.addEventListener('click', function () {
  openPopup(modalWindowEdit);
  nameInput.value = profileTitle.textContent;
  jobinput.value = profileSubtitle.textContent;
});

imageAddButton.addEventListener('click', () => {
  openPopup(modalWindowAdd);
});

editCloseBtn.addEventListener('click', () => {
  closePopup(modalWindowEdit);
});

addCloseBtn.addEventListener('click', () => {
  closePopup(modalWindowAdd);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobinput.value;
  closePopup(modalWindowEdit);
};

formElement.addEventListener('submit', formSubmitHandler);

function render() {
  const html = initialCards.map(getElement);
  listContainer.append(...html);
};

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const name = getElementTemplate.querySelector('.list__title');
  const link = getElementTemplate.querySelector('.list__image');
  name.textContent = item.name;
  link.src = item.link;
  link.alt = item.name;

  return getElementTemplate;
};

render();

