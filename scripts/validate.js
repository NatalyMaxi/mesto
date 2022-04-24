// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
   formSelector: '.form',
   inputSelector: '.form__item',
   submitButtonSelector: '.form__button',
   inactiveButtonClass: 'form__button_disabled',
   inputErrorClass: 'popup__item_type_error',
   errorClass: 'form__error_visible'
});