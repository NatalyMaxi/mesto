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
const formElement = document.querySelector('[name="subscribeForm"]');
const formElementAdd = document.querySelector('[name="add-images"]')
const nameInput = formElement.querySelector('[name="full-name"]');
const jobinput = formElement.querySelector('[name="about-me"]');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const modalWindowEdit = document.querySelector('.popup_type_edit');
const modalWindowAdd = document.querySelector('.popup_type_add');
const modalWindowImage = document.querySelector('.popup_type_image');
const cardCloseBtn = modalWindowEdit.querySelector('.popup__close_type_edit');
const popupCloseBtn = modalWindowAdd.querySelector('.popup__close_type_add');
const imageCloseBtn = modalWindowImage.querySelector('.popup__close_type_image');
const listContainer = document.querySelector('.list');
const template = document.querySelector('.template');
const cardImage = modalWindowImage.querySelector('.popup__img');
const cardCaption = modalWindowImage.querySelector('.popup__caption');

function openPopup(modalWindowEdit) {
  modalWindowEdit.classList.add('popup_is-active');
};

function closePopup(modalWindowEdit) {
  modalWindowEdit.classList.remove('popup_is-active');
};

profileEditingButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobinput.value = profileSubtitle.textContent;
  openPopup(modalWindowEdit);
});

imageAddButton.addEventListener('click', () => {
  openPopup(modalWindowAdd);
});

cardCloseBtn.addEventListener('click', () => {
  closePopup(modalWindowEdit);
});

popupCloseBtn.addEventListener('click', () => {
  closePopup(modalWindowAdd);
});

imageCloseBtn.addEventListener('click', () => {
  closePopup(modalWindowImage);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobinput.value;
  closePopup(modalWindowEdit);
};

function render() {
  const html = initialCards.map(getElement);
  listContainer.append(...html);
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
  const regionInput = formElementAdd.querySelector('[name="region"]').value;
  const linkinput = formElementAdd.querySelector('[name="link"]').value;
  const element = getElement({ name: regionInput, link: linkinput });
  listContainer.prepend(element);
  closePopup(modalWindowAdd);
  formElementAdd.reset();
};

formElement.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', ImageAddFormSubmitHandler);

render();