import { memo, useCallback, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";
import debounce from "lodash.debounce";

function Textarea(props) {
  const {
    t=(data)=>{},
    label = t("new comment"),
    _id,
    value,
    setValue= () => {},
    rows="5",
    cols="33",
    onChangeValue = () => {}
  } = props

  const onChangeDebounce = useCallback(
    debounce((value) => onChangeValue(value), 600),
    [onChangeValue]
  );
  const onChange = ({ target }) => {
    setValue(target.value);
    onChangeDebounce(target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(value), [value]);

  return (
    <>
      <label htmlFor={_id}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
      />
    </>
  );
}

Textarea.propTypes = {
  label: PropTypes.string,
  _id: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  rows: PropTypes.string,
  cols: PropTypes.string,
  onChangeValue: PropTypes.func,
};

export default memo(Textarea);
