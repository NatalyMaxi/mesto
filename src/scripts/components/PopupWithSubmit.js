'use strict'

import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
   constructor(popupSelector) {
      super(popupSelector);
      this._form = this._popup.querySelector('.form');  
   }
   
   // функция, параметром которой, является колбэк на удаление карточки
   setSubmitAction(action) {
      this._handleSubmit = action;
   }

   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._handleSubmit();
         this.close();
      });
   }
}