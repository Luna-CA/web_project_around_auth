class Api {
  constructor(URL) {
    this.URL = URL;
  }

  // NOVO: pega o token que foi salvo no login
  _getHeaders() {
    const token = localStorage.getItem("jwt");
    return {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this.URL + "/users/me", {
      method: "GET",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  getCards() {
    return fetch(this.URL + "/cards", {
      method: "GET",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  addCard(name, link) {
    return fetch(this.URL + "/cards", {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResponse(res));
  }

  updateUserAvatar(avatar) {
    return fetch(this.URL + "/users/me/avatar", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkResponse(res));
  }

  updateUserInfo(name, about) {
    return fetch(this.URL + "/users/me", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardID, isLiked) {
    return fetch(`${this.URL}/cards/${cardID}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardID) {
    return fetch(`${this.URL}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api("https://se-register-api.en.tripleten-services.com/v1");

export default api;
