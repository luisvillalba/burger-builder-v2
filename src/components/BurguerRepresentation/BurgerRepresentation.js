
import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { Box } from '@material-ui/core';
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
        <Box minWidth={240} width="100%" maxWidth={350}>
            <BurgerIngredient itype="breadTop" />
                {Object.keys(ingredients).reduce((ac,ing) => ac.concat(getIngredients(ing, ingredients[ing])), [])}
            <BurgerIngredient itype="breadBottom"/>
        </Box>
    );
}