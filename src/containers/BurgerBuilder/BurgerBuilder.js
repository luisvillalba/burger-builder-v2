import React from 'react';
import { Grid, Paper, Modal } from '@material-ui/core';
import BurgerRepresentation from '../../components/BurguerRepresentation/BurgerRepresentation';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import axios from 'axios';
import css from './BurgerBuilder.module.css';
import BurgerBuilderSummary from '../../components/BurgerBuilderSummary/BurgerBuilderSummary';

const INGREDIENTS_ENDPOINT = 'https://burger-builder-19b67.firebaseio.com/ingredients.json';
const BASE = 2;

export default class BurgerBuilder extends React.Component {
    state = {
        ingredients: [],
        order: {
            ingredients: {},
            total: BASE
        },
        loadingIngredients: true,
        isCheckingOut: false
    };

    constructor() {
        super();
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        axios.get(INGREDIENTS_ENDPOINT).then((data) => {
            console.log(data.data);
            this.setState({
                ingredients: data.data,
                loadingIngredients: false
            });
        });
    }

    addIngredient(ingredient) {
        let newOrder = {...this.state.order};
        let newIngredients = {...this.state.order.ingredients};
        newIngredients[ingredient] = (newIngredients[ingredient] || 0) + 1;
        newOrder.ingredients = newIngredients;
        this.updateOrder(newOrder);
    }

    removeIngredient(ingredient) {
        let newOrder = {...this.state.order};
        let newIngredients = {...this.state.order.ingredients};
        newIngredients[ingredient] = Math.max((newIngredients[ingredient] || 0) - 1, 0);
        newOrder.ingredients = newIngredients;
        this.updateOrder(newOrder);
    }

    handleOpenModal() {
        this.setState({isCheckingOut: true})
    }

    handleCloseModal() {
        this.setState({isCheckingOut: false})
    }

    updateOrder(newOrder) {
        //debugger;
        newOrder.total = Object.keys(newOrder.ingredients).reduce((ac, cur) => {
            return ac + (this.state.ingredients[cur].price * newOrder.ingredients[cur]);
        }, BASE);

        this.setState({order: newOrder});
    }

    render() {
        return (
            <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Burger Builder</h1>
                    </Grid>
                    <Grid item container
                        xs={12}
                        sm={6}
                        alignContent="center"
                        className={css.representation}
                        direction="row"
                        wrap="wrap">
                        <BurgerRepresentation
                            order={this.state.order}
                            ingredients={this.state.ingredients}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <BurgerControls
                            ingredients={this.state.ingredients}
                            loading={this.state.loading}
                            order={this.state.order}
                            addIngredient={this.addIngredient}
                            removeIngredient={this.removeIngredient}/>  
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <BurgerBuilderSummary
                                order={this.state.order}
                                onCheckout={this.handleOpenModal}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.isCheckingOut}
                    onClose={this.handleCloseModal}>
                        <Grid container
                            className={css.ModalGrid}
                            maxWidth="sm"
                            spacing={5}
                            alignContent="center"
                            justify="center">
                            <Grid item>
                                <Paper className={css.ModalPaper}>
                                    <h2 id="simple-modal-title">Text in a modal</h2>
                                    <p id="simple-modal-description">
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    </p>
                                </Paper>
                            </Grid>
                        </Grid>
                </Modal>
            </React.Fragment>
        );
    }
}