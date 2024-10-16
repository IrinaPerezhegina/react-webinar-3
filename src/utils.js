const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

// Получение окончание слова раз в зависимости от склонения номера 
export const getEnding = (num) => {
	return ['2', '3', '4']
		.some((item) => {
			return item === num
						.toString()
						.slice(num.toString().length - 1);
	}) &&
		!['12', '13', '14']
			.some((item) => {
				return (
					item === num
						.toString()
						.slice(num.toString().length - 2, num.toString().length)
			);
		})
		? `раза`
		: `раз`
};


// Получение последующего числа икрементированием
 const getCode = (num) => {
	var max  = num
	
	function increment() {
		return  ++max
	  }
	return increment;
}

// Получение ключа для каждого item разного 
export const generateCode=getCode(0)


// Функция плюрализации
export function pluralFunc(data, declension = {}) {
	const quantity = new Intl.PluralRules("ru-RU").select(data);
	return declension[quantity];
  }
