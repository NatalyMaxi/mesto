function enableValidation(config) {
   const forms = Array.from(document.querySelectorAll(config.formSelector));
   forms.forEach((form) => {
      form.addEventListener('submit', (evt) => handleFormSubmit(evt));
      form.addEventListener('input', (evt) => handleFormInput(evt, form, config));
      toggleButton(form, config);
   })
}

function toggleButton(form, config) {
   const buttons = Array.from(form.querySelectorAll(config.submitButtonSelector));
   buttons.forEach((button) => {
      button.classList.toggle('form__button_type_disabled', !form.checkValidity());
      button.disabled = !form.checkValidity();
   })
}

function handleFormSubmit(evt, form) {
   evt.preventDefault();
}

function handleFormInput(event, form, config) {
   const input = event.target;
   const errorNode = document.querySelector(`#${input.id}-error`);
   console.log(errorNode);

   if (input.validity.valid) {
      errorNode.textContent = '';
      input.classList.remove('form__item_type_error')
   } else {
      errorNode.textContent = input.validationMessage;
      input.classList.add('form__item_type_error')
   }
   toggleButton(form, config);
}

enableValidation({
   formSelector: '.form',
   inputSelector: '.form__item',
   submitButtonSelector: '.form__button',
   inactiveButtonClass: 'form__button_type_disabled',
   inputErrorClass: 'form__item_type_error',
   errorClass: 'form__error_visible'
});

