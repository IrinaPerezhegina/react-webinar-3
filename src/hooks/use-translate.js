import { useEffect, useMemo, useState } from "react";
import useServices from "./use-services";
import shallowEqual from "shallowequal";

export default function useTranslate() {
  const i18n = useServices().i18n;
  const [state, setState] = useState(() => i18n.getState());
  const t=(text, num) => i18n.t(text, num)()

  const unsubscribe = useMemo(() => {
    return i18n.subscribe(() => {
      const newState = i18n.getState();
      setState((prevState) =>
        shallowEqual(prevState, newState) ? prevState : newState
      );
    });
  }, []);

  useEffect(() => unsubscribe, [unsubscribe]);

  return {
    lang: state.lang,
    setLang: (lang) => i18n.setLang(lang),
    t,
  };
}
