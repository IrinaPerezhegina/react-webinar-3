import useSelector from "../store/use-selector";
import translate from "./translate";
import { useCallback } from "react";

export default function useTranslation() {
    const lang = useSelector(state => state.dictionary.lang);
    const t = useCallback((word) => translate(lang, word), [lang]);
      
    return { t };
}