'use strict'

import { cardImage, cardCaption, modalWindowImage} from '../index.js';

export class Card {
   constructor(title, image, cardSelector, openPopup, closePopup) {
  
      this._title = title;
      this._image = image;
      this._cardSelector = cardSelector;
      this._openPopup = openPopup;
      this._closePopup = closePopup;
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

   // метод слушателя по картинке для просмотра изображения
   _handleOpenPopup() {
      cardImage.src = this._image;
      cardImage.alt = this._title;
      cardCaption.textContent = this._title;
      this._openPopup(modalWindowImage);
   }

   //метод добавления всех обработчиков
   _setEventListeners() {
      this._likeBtn = this._element.querySelector('.list__toggle');
      
      // открытие попапа просмотра изображения кликом по изображению
      this._cardImage.addEventListener('click', () => {
         this._handleOpenPopup();
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
      this._cardImage = this._element.querySelector('.list__image');
      this._setEventListeners();

      this._element.querySelector('.list__title').textContent = this._title;
      this._cardImage.src = this._image;
      this._cardImage.alt = this._title;

      // Вернём элемент наружу
      return this._element;
   } 
}