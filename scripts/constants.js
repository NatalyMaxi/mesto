// находим попап редактирования профиля
const modalWindowEdit = document.querySelector('.popup_type_edit');
// находим кнопку для открытия попапа редактирования профиля
const profileEditingButton = document.querySelector('.profile__btn');
// находим кнопку закрытия попапа редактирования профиля
const modalWindowEditCloseBtn = modalWindowEdit.querySelector('.popup__close');
// находим форму попапа редактирования профиля
const formEditProfile = modalWindowEdit.querySelector('[name="subscribeForm"]');
// находим инпуты формы попапа редактирования профиля
const nameInput = formEditProfile.querySelector('[name="full-name"]');
const jobInput = formEditProfile.querySelector('[name="about-me"]');
// выбираем куда будут импортироваться данные из формы
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// Находим попап добавления карточки
const modalWindowAdd = document.querySelector('.popup_type_add');;
// находим кнопку для открытия попапа добавления новой карточки
const modalWindowAddNewCardOpenBtn = document.querySelector('.profile__button');
// находим кнопку для закрытия попапа добавления новой карточки
const modalWindowAddNewCardCloseBtn = modalWindowAdd.querySelector('.popup__close');
// находим форму попапа добавления новой карточки
const formAddNewCard = modalWindowAdd.querySelector('[name="add-images"]');

// находим контейнер для карточек
const cardsContainer = document.querySelector('.list');


// находим инпут для названия карточки
const regionInput = formAddNewCard.querySelector('[name="region"]');
// находим инпут ссылки на изображение
const linkInput = formAddNewCard.querySelector('[name="link"]');
// находим попап просмотра изображения
const modalWindowImage = document.querySelector('.popup_type_image');
// находим кнопку закрытия попапа просмотра изображений
const modalWindowImageCloseBtn = modalWindowImage.querySelector('.popup__close')
// находим изображение попапа просмотра
const cardImage = modalWindowImage.querySelector('.popup__img');
// находим название изображения попапа просмотра
const cardCaption = modalWindowImage.querySelector('.popup__caption');

// const template = document.querySelector('.template');
const popups = document.querySelectorAll('.popup');




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

export {
   modalWindowEdit, modalWindowAdd, profileEditingButton, modalWindowEditCloseBtn, formEditProfile, nameInput, jobInput, profileTitle,
   profileSubtitle, linkInput, regionInput, cardsContainer, formAddNewCard, modalWindowAddNewCardCloseBtn,
   modalWindowAddNewCardOpenBtn, modalWindowImageCloseBtn, modalWindowImage, cardImage, cardCaption, popups, initialCards
};