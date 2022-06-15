'use strict'

export default class Section {
   constructor({ renderer }, containerSelector) {
      
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
   }


   addCardAppend(element) {
      this._container.append(element);
   }
   renderItems(items) {
      items.forEach(item => {this._renderer(item)});
   };

   addItem(element) {
      this._container.prepend(element);
   }
}


// этот класс берет разметку с других классов и вставляет ее в DOM