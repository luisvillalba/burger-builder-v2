import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import BurgerControl from "./BurgerControl/BurgerControl";
import { Paper } from "@material-ui/core";
import css from "./BurgerControls.module.css";

export default (props) => {
  let controls;
  if (props.ingredients && Object.keys(props.ingredients)) {
    controls = Object.keys(props.ingredients).map((ingredient) => {
      return (
        <BurgerControl
          key={props.ingredients[ingredient].id}
          name={props.ingredients[ingredient].name}
          quantity={props.order.ingredients[ingredient] || 0}
          addIngredient={() => props.addIngredient(ingredient)}
          removeIngredient={() => props.removeIngredient(ingredient)}
        />
      );
    });
  }

  let content = props.loading ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <h2>Add the ingredients you want:</h2>
      {controls}
    </React.Fragment>
  );

  return <Paper className={css.Card}>{content}</Paper>;
};
