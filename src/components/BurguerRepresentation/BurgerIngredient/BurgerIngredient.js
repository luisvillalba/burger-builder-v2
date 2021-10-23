import React from "react";
import css from "./BurgerIngredient.module.css";

export default (props) => {
  let className = [css["ingredient--" + props.itype], css["ingredient"]];
  console.log("ingredient--" + props.itype);

  return <div className={className.join(" ")}></div>;
};
