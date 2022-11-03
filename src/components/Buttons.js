import React from "react";
import { getClasses } from "../utils/getClasses";

//import buttons custom styling
import Style from "../styles/modules/button.module.scss";

//define button types and change class according based on the variant
const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const Buttons = ({ children, variant, type, ...rest }) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={getClasses([
        Style.button,
        Style[`button--${buttonTypes[variant]}`],
      ])}
      {...rest}
      data-testid="buttoncomponent"
    >
      {children}
    </button>
  );
};

const SelectButtons = ({ children, ...rest }) => {
  return (
    <select
      className={getClasses([Style.button, Style.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export { SelectButtons };

export default Buttons;
