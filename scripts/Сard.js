

export class Card {
   _title;
   _image;
   _cardSelector;
   _element;

   constructor(title, image, cardSelector) {
      this._title = title;
      this._image = image;
      this._cardSelector = cardSelector;
   }

   //метод, который возвращает разметку
   _getTemplate() {

      // забираем разметку из HTML и клонируем элемент
      const cardElement = document
         .querySelector(this._cardSelector)
         .content
         .querySelector('.list__items')
         .cloneNode(true);

      // вернём DOM-элемент карточки
      return cardElement;
   }

   //метод создания карточки 
   generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.list__title').textContent = this._title;
      this._element.querySelector('.list__image').src = this._image;

      // Вернём элемент наружу
      return this._element;
   }

   //метод добавления всех обработчиков
   _setEventListeners() {

      // открытие попапа просмотра изображения кликом по изображению
      this._element.querySelector('.list__image').addEventListener('click', () => {
         this._handleOpenPopup();
      })

      // закрытие попапа просмотра изображения кликом на кнопку закрытия
      modalWindowImageCloseBtn.addEventListener('click', () => {
         this._handleClosePopup();
      })

      // слушатель кнопки удаления карточки
      this._element.querySelector('.list__btn').addEventListener('click', () => {
         this._handleDeleteCard();
      })

      // слушатель кнопки лайка
      this._element.querySelector('.list__toggle').addEventListener('click', () => {
         this._handleLikeCard();
      });
   }

   // метод слушателя по кнопке - "удалить"
   _handleDeleteCard() {
      this._element.remove();
   }

   // метод слушателя по кнопке - "лайк"
   _handleLikeCard() {
      const likeBtn = this._element.querySelector('.list__toggle');
      likeBtn.classList.toggle('list__toggle_active');
   }

   // метод слушателя по картинке для просмотра изображения
   _handleOpenPopup() {
      cardImage.src = this._link;
      cardCaption.textContent = this._name;
      modalWindowImage.classList.add('popup_is-active');
      document.addEventListener('keyup', handleEscUp);
   }

   // метод слушателя закрытия попапа просмотра изображения
   _handleClosePopup() {
      cardImage.src = '';
      cardCaption.textContent = '';
      modalWindowImage.classList.remove('popup_is-active');
      document.removeEventListener('keyup', handleEscUp);
   }
}