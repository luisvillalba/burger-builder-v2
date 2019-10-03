
import React from 'react';
import { Paper, Button } from '@material-ui/core';
import css from './BurgerBuilderSummary.module.css';

export default (props) => {
    return (
        <Paper className={css.Card}>
            <h3>Total:</h3>
            <p>{props.order.total}</p>
            <Button
                variant="contained"
                color="primary"
                onClick={props.onCheckout}>Checkout</Button>
        </Paper>
    ); 
}