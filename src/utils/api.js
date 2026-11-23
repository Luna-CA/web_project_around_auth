class Api {
  constructor(URL, token) {
    this.URL = URL;
    this.token = token;
  }
  getUserInfo() {
    return fetch(this.URL + "/users/me", {
      method: "GET",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }
  getCards() {
    return fetch(this.URL + "/cards", {
      method: "GET",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  addCard(name, link) {
    return fetch(this.URL + "/cards", {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  updateUserAvatar(avatar) {
    return fetch(this.URL + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  updateUserInfo(name, about) {
    return fetch(this.URL + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  changeLikeCardStatus(cardID, isLiked) {
    return fetch(`${this.URL}/cards/${cardID}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  deleteCard(cardID) {
    return fetch(`${this.URL}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }
}

const api = new Api(
  "https://around-api.pt-br.tripleten-services.com/v1",

  "166c673d-fa71-49aa-97f3-b5490e5739af",
);

export default api;
