import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
   constructor(popupSelector) {

      super(popupSelector)
      this._popupTitle = this._popupSelector.querySelector('.popup__caption');
      this._popupImage = this._popupSelector.querySelector('.popup__img');
   }

   open(data) {
      this._popupImage.src = data.link;
      this._popupTitle.textContent = data.name;
      this._popupImage.alt = data.name;
      super.open();
   }
}