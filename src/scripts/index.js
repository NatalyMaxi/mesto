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
const nameInput = formEditProfile.querySelector('[name="username"]');
const jobInput = formEditProfile.querySelector('[name="job"]');


// попап добавления карточки
const modalWindowAdd = document.querySelector('.popup_type_add');;
const modalWindowAddNewCardOpenBtn = document.querySelector('.profile__button');
const formAddNewCard = modalWindowAdd.querySelector('[name="add-images"]');



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

//функция занесения  информации в инпуты папапа профиля
function addInfoFormProfile({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__subtitle'
})

//создание попапа профиля 
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      username: data.username,
      job: data.job
    });
    editProfilePopup.close();
  }
});

editProfilePopup.setEventListeners();

//функция открытия попапа профиля и занесения  информации в инпуты
profileEditingButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  addInfoFormProfile({
    username: info.username,
    job: info.job
  });
  formEditProfileValidator.resetValidation();
  editProfilePopup.open();
});

//создание новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      bigImagePopup.open(data);
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
  handleFormSubmit: (data) => {
    cardList.addItem(createCard(data))
    addImagePopup.close();
  }
})
addImagePopup.setEventListeners();

// слушатель кнопки открытия попапа добавления новой карточки
modalWindowAddNewCardOpenBtn.addEventListener('click', () => {
  formAddNewCardValidator.resetValidation();
  addImagePopup.open();
});
// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();


