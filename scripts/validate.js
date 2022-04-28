const showInputError = (formElement, inputElement, errorMessage) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add('form__item_type_error');
   errorElement.textContent = errorMessage;
   errorElement.classList.add('form__error_visible');
};

const hideInputError = (formElement, inputElement) => {
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

const enableValidation = () => {
   const formList = Array.from(document.querySelectorAll('.form'));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      setEventListeners(formElement);
   });
};

const setEventListeners = (formElement) => {
   const inputList = Array.from(formElement.querySelectorAll('.form__item'));
   const buttonElement = formElement.querySelector('.form__button');

   toggleButton(inputList, buttonElement);

   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         checkInputValidity(formElement, inputElement);
         toggleButton(inputList, buttonElement);
      });
   });
};

const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
   });
}

function toggleButton(inputList, buttonElement) {
   if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('form__button_type_disabled')
      buttonElement.setAttribute('disabled', 'disabled');
   } else {
      buttonElement.classList.remove('form__button_type_disabled');
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

// function disabledButton(buttonElement) {
//    buttonElement.classList.add('form__button_type_disabled')
//    buttonElement.setAttribute('disabled', 'disabled');  
// }
