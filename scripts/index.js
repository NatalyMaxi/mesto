

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

