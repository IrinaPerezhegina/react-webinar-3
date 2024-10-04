import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      userInfo: {},
      userName: "",
      waiting: false // признак ожидания загрузки
    }
  }



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
        "Загружена информация об профиле"
      );
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

}

export default ProfileState;