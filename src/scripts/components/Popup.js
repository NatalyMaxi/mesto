export default class Popup {
   constructor(popupSelector) {

      this._popup = document.querySelector(popupSelector);
      this._closeBtn = this._popup.querySelector('popup__close')
      this._escClose = this._handleEscClose.bind(this)
   }

   // функция закрытия попапа на крестик и на оверлей
   setEventListeners() {
      this._closeBtn.addEventListener('click', () => {
         this.close();
      })
      this._popup.addEventListener('mousedown', (evt) => {
         if (evt.target.classList.contains('popup')) {
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
      this._popup.classList.add('popup_is-active')
      document.addEventListener('keydown', this._escClose);
   }

   close() {
      this._popup.classList.remove('popup_is-active')
      document.removeEventListener('keydown', this._escClose);
   }
}