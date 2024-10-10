import { memo,  useMemo, useState } from "react";

import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";

function LocaleSelect() {
  const { lang, setLang } = useTranslate();
  const [date, setDate] = useState(lang);

  const handleChange = (date) => {
    setDate(date);
    setLang(date);
  };

  const options = {
    lang: useMemo(
      () => [
        { value: "ru", title: "Русский" },
        { value: "en", title: "English" },
      ],
      []
    ),
  };

  return <Select onChange={handleChange} value={lang} options={options.lang} />;
}

export default memo(LocaleSelect);
