import {
  modalWindowEdit, modalWindowAdd, profileEditingButton, modalWindowEditCloseBtn, formEditProfile, nameInput, jobInput, profileTitle,  profileSubtitle, linkInput, regionInput, cardsContainer, formAddNewCard, modalWindowAddNewCardCloseBtn,
  modalWindowAddNewCardOpenBtn, modalWindowImage, popups ,initialCards
} from './constants.js';
import { Card } from './Card.js';


// // функция открытия попапа
// function openPopup(popup) {
//   document.addEventListener('keyup', handleEscUp);
//   popup.classList.add('popup_is-active');
// };

// // функция закрытия попапа
// function closePopup(popup) {
//   document.removeEventListener('keyup', handleEscUp);
//   popup.classList.remove('popup_is-active');
// };

// // обработчик клика по кнопке Escape
// const handleEscUp = (evt) => {
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_is-active')
//     closePopup(activePopup);
//   }
// }



const handleEscUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-active')
    closePopup(activePopup);
  }
}

function closePopup(popup) {
  document.removeEventListener('keyup', handleEscUp);
  popup.classList.remove('popup_is-active');
};

function openPopup(modalWindowEdit) {
  document.addEventListener('keyup', handleEscUp);
  modalWindowEdit.classList.add('popup_is-active');
};


// функция закрытия попапа кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

//функция открытия попапа профиля и занесения  информации в инпуты
profileEditingButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(modalWindowEdit);
});

// слушатель кнопки открытия попапа добавления новой карточки
modalWindowAddNewCardOpenBtn.addEventListener('click', () => {
  openPopup(modalWindowAdd);
});

//функция редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(modalWindowEdit);
};

// функция загрузки карточек из массива
const renderInitialCards = (array) => {
  array.forEach((item) => {
    const card = new Card(item.name, item.link, '.template');
    const cardElement = card.generateCard();

    cardsContainer.append(cardElement);
      closePopup(modalWindowAdd);
  formAddNewCard.reset()
  })
}

// функция добавления карточки на страницу из формы
const addCard = (title, image) => {
  const card = new Card(title, image, '.template').generateCard();
  cardsContainer.prepend(card);
};

// Обработчик кнопки Submit попапа редактирования профиля
formEditProfile.addEventListener('submit', formSubmitHandler);

// слушатель Submit формы создания карточки
formAddNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(regionInput.value, linkInput.value);
  regionInput.value = '';
  linkInput.value = '';
  closePopup(modalWindowAdd);
  // находим кнопку submit и деактивируем ее после создания карточки
  const buttonElement = formAddNewCard.querySelector('.form__button');
  buttonElement.setAttribute('disabled', 'disabled');
});


// автоматическая загрузка карточек на страницу
renderInitialCards(initialCards);


export { handleEscUp };
  


  
  

  

  

// function render() {
//   const html = initialCards.map(getElement);
//   cardsContainer.append(...html);
// };

// function getElement(item) {
//   const getElementTemplate = template.content.cloneNode(true);
//   const name = getElementTemplate.querySelector('.list__title');
//   const link = getElementTemplate.querySelector('.list__image');
//   const cardRemoveBtn = getElementTemplate.querySelector('.list__btn');
//   const ImageLikeBtn = getElementTemplate.querySelector('.list__toggle');

//   name.textContent = item.name;
//   link.src = item.link;
//   link.alt = item.name;

//   function removeElement(evt) {
//     const element = evt.target.closest('.list__items');
//     element.remove();
//   };

//   cardRemoveBtn.addEventListener('click', removeElement);

//   ImageLikeBtn.addEventListener('click', function (evt) {
//     evt.target.classList.toggle('list__toggle_active')
//   });

//   link.addEventListener('click', () => {
//     cardImage.src = item.link;
//     cardCaption.alt = item.name;
//     cardCaption.textContent = item.name;
//     openPopup(modalWindowImage);
//   });

//   return getElementTemplate;
// };






// formElement.addEventListener('submit', formSubmitHandler);
// formAddNewCard.addEventListener('submit', renderInitialCards);

// render();

// function ImageAddFormSubmitHandler(evt) {
//   evt.preventDefault();
//   const element = getElement({ name: regionInput.value, link: linkinput.value });
//   cardsContainer.prepend(element);
//   closePopup(modalWindowAdd);
//   formElementAdd.reset();
// };
