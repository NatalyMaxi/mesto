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

export {
   initialCards,
   profileEditingButton,
   formEditProfile,
   nameInput,
   jobInput,
   modalWindowAddNewCardOpenBtn,
   formAddNewCard,
   config
}
