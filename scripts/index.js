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
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const formElement = document.querySelector('[name="subscribeForm"]');
const formElementAdd = document.querySelector('[name="add-images"]')
const nameInput = formElement.querySelector('[name="full-name"]');
const jobinput = formElement.querySelector('[name="about-me"]');

const regionInput = formElementAdd.querySelector('[name="region"]');
const linkinput = formElementAdd.querySelector('[name="link"]');

const popups = document.querySelectorAll('.popup');
const modalWindowEdit = document.querySelector('.popup_type_edit');
const modalWindowAdd = document.querySelector('.popup_type_add');
const modalWindowImage = document.querySelector('.popup_type_image');

const cardsContainer = document.querySelector('.list');
const template = document.querySelector('.template');
const cardImage = modalWindowImage.querySelector('.popup__img');
const cardCaption = modalWindowImage.querySelector('.popup__caption');


// находим кнопку закрытия попапа просмотра изображений
const modalWindowImageCloseBtn = modalWindowImage.querySelector('.popup__close')

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

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

profileEditingButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobinput.value = profileSubtitle.textContent;
  openPopup(modalWindowEdit);
});

imageAddButton.addEventListener('click', () => {
  openPopup(modalWindowAdd);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobinput.value;
  closePopup(modalWindowEdit);
};

function render() {
  const html = initialCards.map(getElement);
  cardsContainer.append(...html);
};

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const name = getElementTemplate.querySelector('.list__title');
  const link = getElementTemplate.querySelector('.list__image');
  const cardRemoveBtn = getElementTemplate.querySelector('.list__btn');
  const ImageLikeBtn = getElementTemplate.querySelector('.list__toggle');

  name.textContent = item.name;
  link.src = item.link;
  link.alt = item.name;

  function removeElement(evt) {
    const element = evt.target.closest('.list__items');
    element.remove();
  };

  cardRemoveBtn.addEventListener('click', removeElement);

  ImageLikeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('list__toggle_active')
  });

  link.addEventListener('click', () => {
    cardImage.src = item.link;
    cardCaption.alt = item.name;
    cardCaption.textContent = item.name;
    openPopup(modalWindowImage);
  });

  return getElementTemplate;
};

function ImageAddFormSubmitHandler(evt) {
  evt.preventDefault();
  const element = getElement({ name: regionInput.value, link: linkinput.value });
  cardsContainer.prepend(element);
  closePopup(modalWindowAdd);
  formElementAdd.reset();
};

// функция загрузки карточек из массива
// const renderInitialCards = (array) => {
//   array.forEach((item) => {
//     const card = new Card(item.title, item.image, '.template');
//     const cardElement = card.generateCard();

//     cardsContainer.prepend(cardElement);
//   })



formElement.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', ImageAddFormSubmitHandler);

render();

