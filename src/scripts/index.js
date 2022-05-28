'use strict'

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

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

const bigImagePopup = new PopupWithImage('.popup_type_image');
bigImagePopup.setEventListeners();

// function addInfoFormProfile({ username, info }) {
//   nameInput.value = username;
//   jobInput.value = info;
// }

// const userInfo = new UserInfo({
//   username: '.profile__title',
//   info: '.profile__subtitle'
// })

const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      bigImagePopup.open(name, link);
    }
  }, '.template');
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.list');

cardList.renderItems();

const addImagePopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (formData) => {
    cardList.addItem(createCard(formData))
    addImagePopup.close();
  }
})
addImagePopup.setEventListeners();

// слушатель кнопки открытия попапа добавления новой карточки
modalWindowAddNewCardOpenBtn.addEventListener('click', () => {
  addImagePopup.open();
});
// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();


