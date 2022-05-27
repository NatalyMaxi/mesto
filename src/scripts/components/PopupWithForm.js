import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
   constructor(popupSelector) {

      super(popupSelector)
      this._popupForm = this._popup.querySelector('.form')
      this._inputElements = this._popupForm.querySelectorAll('.form__item')
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
}