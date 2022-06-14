'use strict'
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';

import {
  profileEditingButton,
  formEditProfile,
  nameInput,
  jobInput,
  formEditAvatar,
  btnEditAvatar,
  avatar,
  modalWindowAddNewCardOpenBtn,
  formAddNewCard,
  config
} from '../scripts/utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: 'b10a53e7-258a-42fe-a6a2-62c2a434b14a',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

const bigImagePopup = new PopupWithImage('.popup_type_image');
bigImagePopup.setEventListeners();

const deletePopup = new PopupWithSubmit('.popup_type_delete-card');
deletePopup.setEventListeners();

//функция занесения  информации в инпуты папапа профиля
function addInfoFormProfile({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__subtitle',
  avatar: '.profile__image'
})

//создание попапа редактирования профиля 
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    editProfilePopup.loading(true);
    api.updateUserInfo(data)
      .then((data) => {
        console.log(data);
        userInfo.setUserInfo(data);
        editProfilePopup.close()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfilePopup.loading(false);
      })
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
  editProfilePopup.open();
});

//создание попапа редактирования аватара
const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.updateAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        editAvatarPopup.close()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }
})
editAvatarPopup.setEventListeners();

//функция открытия попапа редактирования аватара
btnEditAvatar.addEventListener('click', () => {
  editAvatarPopup.open();
})

//создание новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      bigImagePopup.open({ name, link });
    }
  }, '.template');
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.list');

const addImagePopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (data) => {
    addImagePopup.loading(true);
    api.addNewCard(data)
      .then((data) => {
        cardList.addItem(createCard(data))
        addImagePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addImagePopup.loading(false);
      })
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

// валидация формы редактирования аватара
const formEditAvatarValidator = new FormValidator(config, formEditAvatar);
formEditAvatarValidator.enableValidation();

