
import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import css from './BurgerRepresentation.module.css';

export default (props) => {
    let ingredients = props.order.ingredients;

    function getIngredients(name, quantity) {
        let ingredients = []
        for (let i = 0; i < quantity; i++) {
            ingredients.push(<BurgerIngredient key={name + i} itype={name}/>);
        }
        return ingredients;
    }
    
    return (
        <React.Fragment>
            <BurgerIngredient itype="breadTop" />
                {Object.keys(ingredients).reduce((ac,ing) => ac.concat(getIngredients(ing, ingredients[ing])), [])}
            <BurgerIngredient itype="breadBottom"/>
        </React.Fragment>
    );
}