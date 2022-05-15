'use strict'

export class FormValidator {

   constructor(config, formElement) {
      // this._config = config;
      this._formElement = formElement;

      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inputErrorClass = config.inputErrorClass;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._errorClass = config.errorClass;

      this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
   }

   _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
   }

   _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
   }

   _checkInputValidity(inputElement) {
      if (inputElement.validity.valid) {
         this._hideInputError(inputElement);
      } else {
         this._showInputError(inputElement, inputElement.validationMessage);
      }
   }

   _setEventListeners() {
      this._inputElements.forEach(inputElement => {
         inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
         });
      });
      this._toggleButtonState();
   }

   _toggleButtonState() {
      if (this._hasInvalidInput()) {
         this._disableButtonState();
      } else {
         this._enableButtonState();
      }
   }

   _disableButtonState() {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
   }

   _enableButtonState() {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
   }

   _hasInvalidInput() {
      return this._inputElements.some(inputElement => inputElement.validity.valid === false);
   }

   enableValidation() {
      this._setEventListeners();
   }
}

