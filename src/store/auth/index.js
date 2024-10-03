import StoreModule from "../module";

/**
 * Состояние авторизации
 */
class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      auth: localStorage.getItem("TOKEN_KEY") ? true : false,
      waiting: false,
      userName: "",
      errorMessage: [],
    };
  }

  async login(data) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const response = await fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const json = await response.json();
      const { name, phone } = json.result.user.profile;
      const { email } = json.result.user;
      localStorage.setItem("TOKEN_KEY", json.result.token);
      this.setState(
        {
          ...this.getState(),
          userInfo: { email, name, phone },
          userName: name,
          auth: true,
          waiting: false,
          errorMessage: [],
        },
        "Авторизация пользователя"
      );
    } else {
      const json = await response.json();
      const error = json.error.data.issues.map((er) => er.message);
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          errorMessage: error,
        },
        "Ошибка авторизации пользователя"
      );
    }
  }
  // Удаление аккаунта
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const response = await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: {
        "X-Token": localStorage.getItem("TOKEN_KEY"),
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      localStorage.removeItem("TOKEN_KEY");
      this.setState(
        {
          ...this.getState(),
          userName: "",
          auth: false,
          waiting: false,
          errorMessage: "",
        },
        "Удаление пользователя"
      );
    } else {
      const json = await response.json();
      const error = json.error.message;

      this.setState(
        {
          ...this.getState(),
          waiting: false,
          errorMessage: error,
        },
        "Ошибка удаления пользователя"
      );
    }
  }
  // Загрузка авторизованного юзера
  async loadUser() {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: "GET",
        headers: {
          "X-Token": localStorage.getItem("TOKEN_KEY"),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      const {
        email,
        profile: { name, phone },
      } = json.result;
      // User загружен успешно
      this.setState(
        {
          ...this.getState(),
          userInfo: { email, name, phone },
          waiting: false,
          userName: name,
        },
        "Загружена информация об пользователе"
      );
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  // Сброс ошибок при смене локации
  resetErrors() {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      errorMessage: [],
    });
  }
}
export default AuthState;
