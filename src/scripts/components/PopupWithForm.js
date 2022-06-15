'use strict'

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
   constructor({popupSelector, handleFormSubmit}) {

      super(popupSelector);
      this._popupForm = this._popup.querySelector('.form');
      this._inputElements = this._popupForm.querySelectorAll('.form__item');
      this._buttonSubmit = this._popupForm.querySelector('.form__button');
      this._handleFormSubmit = handleFormSubmit;
   }

   //метод собирает данные всех полей формы
   _getInputValues() {
      //создаем объект пустой
      this._formValues = {};
      // добавляем в  объект значения всех полей
      this._inputElements.forEach(input => {
         this._formValues[input.name] = input.value;
      })
      //возращаем объект значений
      return this._formValues;
   }

   setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (evt) => {
         evt.preventDefault();
          // передадим ф-и объект — результат работы _getInputValues
         this._handleFormSubmit(this._getInputValues())
      })
   }

   close() {
      super.close()
      this._popupForm.reset()
   }

   //отображаем, что идет загрузка
   loading(isLoading) {
      if (isLoading) {
         this._buttonSubmit.textContent = 'Сохранение...';
      } else {
         this._buttonSubmit.textContent = 'Сохранить';
      }
   }
}