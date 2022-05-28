'use strict'

import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

//массив с карточками

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


// попап редактирования профиля
const modalWindowEdit = document.querySelector('.popup_type_edit');
const profileEditingButton = document.querySelector('.profile__btn');
const formEditProfile = modalWindowEdit.querySelector('[name="subscribeForm"]');
const nameInput = formEditProfile.querySelector('[name="full-name"]');
const jobInput = formEditProfile.querySelector('[name="about-me"]');
// выбираем куда будут импортироваться данные из формы
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


// попап добавления карточки
const modalWindowAdd = document.querySelector('.popup_type_add');;
const modalWindowAddNewCardOpenBtn = document.querySelector('.profile__button');
const formAddNewCard = modalWindowAdd.querySelector('[name="add-images"]');

const buttonElement = formAddNewCard.querySelector('.form__submit');
// попап просмотра изображения
const modalWindowImage = document.querySelector('.popup_type_image');
const cardImage = modalWindowImage.querySelector('.popup__img');
const cardCaption = modalWindowImage.querySelector('.popup__caption');

//попапы
const popups = document.querySelectorAll('.popup');

// находим контейнер для карточек
const cardsContainer = document.querySelector('.list');

const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_type_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

//функция открытия попапа профиля и занесения  информации в инпуты
profileEditingButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formEditProfileValidator.resetValidation();
  modalWindowEdit.open();
});

// слушатель кнопки открытия попапа добавления новой карточки
modalWindowAddNewCardOpenBtn.addEventListener('click', () => {
  // formAddNewCardValidator.resetValidation();
  addImagePopup.open();
});

//функция редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  modalWindowEdit.close();
};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.template', open, close);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  },
}, '.list');

cardList.renderItems();


function createCard(title, image) {
  const card = new Card(title, image, '.template', open, close);
  const cardElement = card.generateCard();
  return cardElement;
}

// Обработчик кнопки Submit попапа редактирования профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

const addImagePopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (data) => {
    cardList.addItem(createCard(data))
    addImagePopup.close();
  }
})
addImagePopup.setEventListeners();

// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();


export { cardImage, cardCaption, modalWindowImage };

