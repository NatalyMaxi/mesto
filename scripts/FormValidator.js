export default class FormValidator {
  
   constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
   }

   // добавление класса с ошибкой
   _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
   };

   // удаление класса с ошибкой
   _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = '';
   };

//проверка валидности формы
   _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
         this._showInputError(inputElement, inputElement.validationMessage);
      } else {
         this._hideInputError(inputElement);
      }
   };
   // проверка валидности инпута
   _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
         return !inputElement.validity.valid;
      });
   };
  
   _toggleButtonState() {
      if (this._hasInvalidInput()) {
         this._buttonElement.classList.add(this._config.inactiveButtonClass)
         this._buttonElement.setAttribute('disabled', 'disabled');
      } else {
         this._buttonElement.classList.remove(this._config.inactiveButtonClass);
         this._buttonElement.removeAttribute('disabled');
      }
   };
 
   // метод с хэндерами
   _setEventListeners() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
         });
      });
      this._formElement.addEventListener('submit', (event) => {
         event.preventDefault();
      })
   };
   // валидация формы
   enableValidation() {
      this._setEventListeners();
   };
}

















// const setEventListeners = (formElement, config) => {
//    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//    const buttonElement = formElement.querySelector(config.submitButtonSelector);

//    toggleButton(inputList, buttonElement, config);

//    inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', function () {
//          checkInputValidity(formElement, inputElement, config);
//          toggleButton(inputList, buttonElement, config);
//       });
//    });
// };

// функция убирает костыль, по поводу добавления пустой карточки при повторном открытии, 
// псоле добавления карточки при первом открытии.

// function disabledButton(formElement, config) {
//    const buttonElement = formElement.querySelector(config.submitButtonSelector)
//    buttonElement.classList.add(config.inactiveButtonClass)
//    buttonElement.setAttribute('disabled', 'disabled');
// }

// const enableValidation = (config) => {
//    const formList = Array.from(document.querySelectorAll(config.formSelector));
//    formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//          //блокирование кнопки после дорбавления карточки и новом открытии попап
//          disabledButton(formElement, config);
//       });
//       setEventListeners(formElement, config);
//    });
// };






