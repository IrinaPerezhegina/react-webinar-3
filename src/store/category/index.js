import { getCategories } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    };
  }

  // Загрузка списка категориев
  async loadCategories() {
    const category = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
    const categories = await category.json();
    console.log(categories.result.items);
    
    this.setState(
      {
        ...this.getState(),
        categories: getCategories(categories.result.items),
      },
      "Загружен список категорий из АПИ"
    );
  }
}

export default CategoryState;
