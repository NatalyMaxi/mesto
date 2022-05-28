'use strict'
export default class Card {
   constructor({ data, handleCardClick }, cardSelector) {

      this._name = data.name;
      this._link = data.link;
      this._handleCardClick = handleCardClick;
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

   // метод слушателя по кнопке - "лайк"
   _handleLikeCard() {
      this._likeBtn.classList.toggle('list__toggle_active');
   }

   // метод слушателя по кнопке - "удалить"
   _handleDeleteCard() {
      this._element.remove();
      this._element = null;
   }

   //метод добавления всех обработчиков
   _setEventListeners() {
      this._likeBtn = this._element.querySelector('.list__toggle');

      // открытие попапа просмотра изображения кликом по изображению
      this._image.addEventListener('click', () => {
         this._handleCardClick(this._name, this._link)
      })

      // слушатель кнопки удаления карточки
      this._element.querySelector('.list__btn').addEventListener('click', () => {
         this._handleDeleteCard();
      })

      // слушатель кнопки лайка
      this._likeBtn.addEventListener('click', () => {
         this._handleLikeCard();
      });
   }

   //метод создания карточки 
   generateCard() {
      this._element = this._getTemplate();
      this._image = this._element.querySelector('.list__image');
      this._setEventListeners();

      this._element.querySelector('.list__title').textContent = this._name;
      this._image.src = this._link;
      this._image.alt = this._name;

      // Вернём элемент наружу
      return this._element;
   }
}