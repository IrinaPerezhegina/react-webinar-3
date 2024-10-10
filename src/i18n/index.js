import translate from "./translate";

//  сервис мультиязычности
class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.state = { lang: config?.lang };
    this.listeners = [];
  }
 
  setState(newState) {
    this.state = newState;
    
    for (const listener of this.listeners) listener(this.state);
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }
  getState() {
    return this.state;
  }

// При смене языка изменяются данные сервиса АПИ ,так кажется быстрее, нет запутанности в коде, функция изменяет данные АПИ, откуда берутся все запросы на сервер
  setLang(lang) {
    this.services.api.setHeader("X-Lang", lang);
    this.setState({
      lang: lang,
    });
  }

//   Функция замыкает в себе данные языка, извне получает только текст для перевода
 t = ( text, plural ) => (lang=this.state.lang) => translate(lang, text, plural);
}

export default I18nService;
