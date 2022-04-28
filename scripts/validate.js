

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




// function enableValidation(config) {
//    const forms = Array.from(document.querySelectorAll(config.formSelector));
//    forms.forEach((form) => {
//       form.addEventListener('submit', (evt) => handleFormSubmit(evt));
//       form.addEventListener('input', (evt) => handleFormInput(evt, form, config));
//       toggleButton(form, config);
//    })
// }

// function toggleButton(form, config) {
//    const buttons = Array.from(form.querySelectorAll(config.submitButtonSelector));
//    buttons.forEach((button) => {
//       button.classList.toggle('form__button_type_disabled', !form.checkValidity());
//       button.disabled = !form.checkValidity();
//    })
// }

// function handleFormSubmit(evt, form) {
//    evt.preventDefault();
// }

// function handleFormInput(event, form, config) {
//    const input = event.target;
//    const errorNode = document.querySelector(`#${input.id}-error`);
//    console.log(errorNode);

//    if (input.validity.valid) {
//       errorNode.textContent = '';
//       input.classList.remove('form__item_type_error')
//    } else {
//       errorNode.textContent = input.validationMessage;
//       input.classList.add('form__item_type_error')
//    }
//    toggleButton(form, config);
// }


// enableValidation({
//    formSelector: '.form',
//    inputSelector: '.form__item',
//    submitButtonSelector: '.form__button',
//    inactiveButtonClass: 'form__button_type_disabled',
//    inputErrorClass: 'form__item_type_error',
//    errorClass: 'form__error_visible'
// });

