import * as dictionary from "./dictionary/dictionary.json"


export default function translate(lang, word) {
    return dictionary[lang][word] ||''
}