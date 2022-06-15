'use strict'
export default class Card {
   constructor({ data, userId, handleCardClick, handleDeleteCard }, cardSelector) {

      this._name = data.name;
      this._link = data.link;
      this._id = data._id;
      this._userId = userId;
      this._owner = data.owner._id;
      this._like = data.likes.length;
      this._likes = data.likes;
      this._handleCardClick = handleCardClick;
      this._handleDeleteCard = handleDeleteCard;
      this._cardSelector = cardSelector;
   }

   // метод, который возвращает разметку
   // забираем разметку из HTML  клонируем элемент и  вернём DOM-элемент карточки
   _getTemplate() {
      return document
         .querySelector(this._cardSelector)
         .content
         .querySelector('.list__items')
         .cloneNode(true);
   }

   getId() {
      return this._id;
   }

   // метод слушателя по кнопке - "лайк"
   _handleLikeCard() {
      this._likeBtn.classList.toggle('list__toggle_active');
      this._likeCounter.textContent = this._like.length;
   }

   // метод слушателя по кнопке - "удалить"
   deleteCard() {
      this._element.remove();
      this._element = null;
   }

   //метод добавления всех обработчиков
   _setEventListeners() {

      // открытие попапа просмотра изображения кликом по изображению
      this._image.addEventListener('click', () => {
         this._handleCardClick()
      })

      // слушатель кнопки удаления карточки
      this._deleteIcon.addEventListener('click', () => {
         this._handleDeleteCard();
      })

      // слушатель кнопки лайка
      this._likeBtn.addEventListener('click', () => {
         this._handleLikeCard();
      });
   }

   _checkDeleteState() {
      if (this._owner !== this._userId) {
         this._deleteIcon.remove();
      }
   }



   //метод создания карточки 
   generateCard() {
      this._element = this._getTemplate();
      this._image = this._element.querySelector('.list__image');
      this._likeBtn = this._element.querySelector('.list__toggle');
      this._deleteIcon = this._element.querySelector('.list__btn');
      this._likeCounter = this._element.querySelector('.list__like-counter')
      this._setEventListeners();
      this._checkDeleteState();
      this._element.querySelector('.list__title').textContent = this._name;
      this._image.src = this._link;
      this._image.alt = this._name;
      this._likeCounter.textContent = this._like;

      // Вернём элемент наружу
      return this._element;
   }
}