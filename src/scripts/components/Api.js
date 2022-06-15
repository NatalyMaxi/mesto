'use strict'

export default class Api {
   constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
   }

   //проверим ответ 
   _checkResponse(res) {
      {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`)
      }
   }

   //получим информацию о пользователе
   getUserInfo() {
      return fetch(`${this._url}/users/me`, {
         headers: this._headers
      })
         .then(this._checkResponse);
   }

   //обновим информацию пользователя
   updateUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            name: data.username,
            about: data.job
         })
      })
         .then(this._checkResponse)
   }
   
   //обновим аватар пользователя
   updateAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            avatar: data.avatar
         })
      })
         .then(this._checkResponse)
   }

   //получим карточки
   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         headers: this._headers
      })
         .then(this._checkResponse)
   }
   
   //добавим новую карточку
   addNewCard(data) {
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            link: data.link
         })
      })
         .then(this._checkResponse)
   }

   //удалим карточку
   deleteCard(_id) {
      return fetch(`${this._url}/cards/${_id}`, {
         method: 'DELETE',
         headers: this._headers
      })
         .then(this._checkResponse)
   }

   // поставим лайк карточке
   addLike(_id) {
      return fetch(`${this._url}/cards/${_id}/likes`, {
         method: 'PUT',
         headers: this._headers
      })
         .then(this._checkResponse)
   }

   // удалим лайк с карточки
   deleteLike(_id) {
      return fetch(`${this._url}/cards/${_id}/likes`, {
         method: 'DELETE',
         headers: this._headers
      })
         .then(this._checkResponse)
   }
}

