/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

// Получение списка категорий
export function getCategories(date) {
  const array = [{ value: "", title: "Все" }];

  const getArray = (parentId, child, index = 1) => {
    date.forEach((item) => {
      if (parentId === item.parent?._id) {
        child.push({
          value: item._id,
          title: `${"- ".repeat(index)}${item.title}`,
        });
        getArray(item._id, child, index + 1);
      }
    });
  };

  date.forEach((el) => {
    if (!el.parent) {
      array.push({ value: el._id, title: el.title });
      getArray(el._id, array);
    }
  });
  return array;
}