import StoreModule from "../module";

class Dictionary extends StoreModule {
  initState() {
    return {
      lang: "ru",
    };
  }
  removeStatus(lang) {
    this.setState(
      {
        ...this.getState(),
        lang: lang,
      },
      "Изменился статус"
    );
  }
}

export default Dictionary;
