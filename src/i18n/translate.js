import * as translations from './translations';

// Функция для перевода
export default function translate(lang, text, plural) {
  let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;

  if (typeof plural !== 'undefined') {
    const key = new Intl.PluralRules(lang).select(plural);
    if (key in result) {
      result = result[key];
    }
  }

  return result;
}
