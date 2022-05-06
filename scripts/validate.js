const showInputError = (formElement, inputElement, errorMessage, config) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(config.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(config.inputErrorClass);
   errorElement.classList.remove(config.errorClass);
   errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
   } else {
      hideInputError(formElement, inputElement, config);
   }
};

const setEventListeners = (formElement, config) => {
   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
   const buttonElement = formElement.querySelector(config.submitButtonSelector);

   toggleButton(inputList, buttonElement, config);

   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         checkInputValidity(formElement, inputElement, config);
         toggleButton(inputList, buttonElement, config);
      });
   });
};

// функция убирает костыль, по поводу добавления пустой карточки при повторном открытии, 
// псоле добавления карточки при первом открытии.

function disabledButton(formElement, config) {
   const buttonElement = formElement.querySelector(config.submitButtonSelector)
   buttonElement.classList.add(config.inactiveButtonClass)
   buttonElement.setAttribute('disabled', 'disabled');
}

const enableValidation = (config) => {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         //блокирование кнопки после дорбавления карточки и новом открытии попап
         disabledButton(formElement, config);
      });
      setEventListeners(formElement, config);
   });
};

const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
   });
}

function toggleButton(inputList, buttonElement, config) {
   if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass)
      buttonElement.setAttribute('disabled', 'disabled');
   } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
   }
}

enableValidation({
   formSelector: '.form',
   inputSelector: '.form__item',
   submitButtonSelector: '.form__button',
   inactiveButtonClass: 'form__button_type_disabled',
   inputErrorClass: 'form__item_type_error',
   errorClass: 'form__error_visible'
});


