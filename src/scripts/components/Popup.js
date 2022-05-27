export default class Popup {
   constructor(popupSelector) {
      this._popupSelector = popupSelector
      this._closeBtn = this._popupSelector.querySelector('popup__close')
   }

// функция закрытия попапа кликом на оверлей и на крестик
   setEventListeners() {
      this._popupSelector.addEventListener('click', (evt) => {
         if (evt.target.this._popupSelector || evt.target.this._closeBtn) {
            this.close();
         }
      })
   }

   //функция закрытие попапа по нажатию на Esc
   _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
         this.close()
      }
   }

   open() {
      this._popupSelector.classList.add('popup_is-active')
   }

   close() {
      this._popupSelector.classList.remove('popup_is-active')
   }
}