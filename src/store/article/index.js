import StoreModule from "../module";


class ArticleState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false 
    }
  }

 // Загрузка товаров по ID
  async loadById(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    const {
      _id,
      title,
      description,
      madeIn: { title: madeTitle, code },
      edition,
      category: { title: categoryTitle },
      price: formatPrice,
    } = json.result;
    const price = formatPrice.toString().replace(".", ",");
    this.setState(
      {
        ...this.getState(),
        data: {
          _id,
          categoryTitle,
          title,
          description,
          madeTitle,
          edition,
          price,
          code,
        },
    },
      "Загружен товар по ID"
    );
  }
}

export default ArticleState;