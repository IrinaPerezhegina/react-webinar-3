import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      productById: {},
      count: 0,
      page: 1,
    };
  }
  onChangePage(p) {
    this.setState(
      {
        ...this.getState(),
        page: p,
      },
      "Изменен номер старинцы"
    );
  }
  async load() {
    const response = await fetch("/api/v1/articles");
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      "Загружены товары из АПИ"
    );
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
        productById: {
          _id,
          categoryTitle,
          title,
          description,
          madeTitle,
          edition,
          price,
          code,
        },
        list: [
          {
            _id,
            categoryTitle,
            title,
            description,
            madeTitle,
            edition,
            price: formatPrice,
            code,
          },
        ],
      },
      "Загружен товар по ID"
    );
  }
  // Загрузка товаров по для пагинации
  async loadListPagination(limit = 10, skip) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      `Загружены товары, начиная с ${skip}`
    );
  }
}

export default Catalog;
