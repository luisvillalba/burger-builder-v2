
import React from 'react';
import { Box, IconButton, Grid } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

export default (props) => {
    return (
        <Box>
            <Grid container>
                <Grid item xs={6} alignContent="center">
                    <p>{props.name}</p>
                </Grid>
                <Grid item xs={6} justify="flex-end">
                    <IconButton onClick={props.removeIngredient}>
                        <RemoveCircle />
                    </IconButton>
                    <span>{props.quantity}</span>
                    <IconButton onClick={props.addIngredient}>
                        <AddCircle />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    ); 
}