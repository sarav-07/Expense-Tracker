import React from "react";

const SelectMenu = ({ label, id, name, value, onChange, error, options, defaultOption }) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select
        name={name}
        className="category"
        id={id}
        value={value}
        onChange={onChange}
      >
       {defaultOption && <option value="" hidden>
          {defaultOption}
        </option>} 
        {options.map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))}
      </select>
      <p className="error">{error}</p>
    </div>
  );
};

export default SelectMenu;
