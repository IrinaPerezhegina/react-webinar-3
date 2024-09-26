/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
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
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export const getPagesArray = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result;
};

/**
 *Получение необходимого массива для пагинации
 *
 */
export function getArray(totalPages, page) {
  if (totalPages > 8) {
    if (page < 3) {
      return [1, 2, 3, "...", totalPages];
    }
    if (page == 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (page >= 4 && page <= totalPages - 3) {
      return [1, "...", page - 1, page, page + 1, "...", totalPages];
    }
    if (page >= totalPages - 4 && page <= totalPages - 2) {
      return [1, "...", page - 1, page, page + 1, totalPages];
    }
    if (page == totalPages || page > totalPages - 3) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
  } else return getPagesArray(8);
}

/**
 *Получение слов в зависимости от языка
 *
 */
export function getPlural(status, amount, sum) {
  return status === "ru"
    ? `${amount} ${plural(amount, {
        one: "товар",
        few: "товара",
        many: "товаров",
      })} / ${numberFormat(sum)} ₽`
    : `${amount} ${plural(amount, {
        one: "product",
        few: "products",
        many: "products",
      })} / ${numberFormat(sum)} ₽`;
}
