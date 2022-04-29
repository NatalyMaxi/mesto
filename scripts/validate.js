const showInputError = (formElement, inputElement, errorMessage) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add('form__item_type_error');
   errorElement.textContent = errorMessage;
   errorElement.classList.add('form__error_visible');
};

const hideInputError = (formElement, inputElement,) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove('form__item_type_error');
   errorElement.classList.remove('form__error_visible');
   errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
   } else {
      hideInputError(formElement, inputElement);
   }
};

const setEventListeners = (formElement, config) => {
   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
   const buttonElement = formElement.querySelector(config.submitButtonSelector);

   toggleButton(inputList, buttonElement, config);

   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         checkInputValidity(formElement, inputElement);
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


