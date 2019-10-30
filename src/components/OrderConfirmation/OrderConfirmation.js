
import React from 'react';
import css from './OrderConfirmation.module.css';

export default (props) => {
    return (
        <React.Fragment>
            <p>{props.order.total}</p>
        </React.Fragment>
    );
}