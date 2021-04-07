import React from "react";
import PropTypes from "prop-types";
import QtyInputStyles from "./QtyInput.module.scss";

const QtyInput = ({ value, onPlus, onMinus }) => {
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
      <i className={`${QtyInputStyles.plus} mdi mdi-plus`} onClick={onPlus}></i>
    </div>
  );
};

QtyInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPlus: PropTypes.func.isRequired,
  onMinus: PropTypes.func.isRequired,
};

export default QtyInput;
