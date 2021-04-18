import React, { useMemo } from "react";
import PropTypes from "prop-types";
import QtyInputStyles from "./QtyInput.module.scss";

const QtyInput = ({ stock, value, onPlus, onMinus }) => {
  const disablePlus = useMemo(() => {
    if (parseInt(value) >= stock) {
      return true;
    }

    return false;
  }, [value, stock]);

  return (
    <div className={QtyInputStyles.qtyInput}>
      <i
        className={`${QtyInputStyles.minus} mdi mdi-minus`}
        onClick={onMinus}
      ></i>
      <input
        readOnly
        type='number'
        value={value}
        className={QtyInputStyles.input}
      />
      <i
        className={`${QtyInputStyles.plus} mdi mdi-plus ${
          disablePlus ? QtyInputStyles.disabled : null
        }`}
        onClick={onPlus}
      ></i>
    </div>
  );
};

QtyInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPlus: PropTypes.func.isRequired,
  onMinus: PropTypes.func.isRequired,
  stock: PropTypes.number.isRequired,
};

export default QtyInput;
