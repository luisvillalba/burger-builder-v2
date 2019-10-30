import React from 'react';
import { Grid, Paper, Modal, Box, Button } from '@material-ui/core';
import BurgerRepresentation from '../../components/BurguerRepresentation/BurgerRepresentation';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import axios from 'axios';
import css from './BurgerBuilder.module.css';
import BurgerBuilderSummary from '../../components/BurgerBuilderSummary/BurgerBuilderSummary';
import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DoneIcon from '@material-ui/icons/Done';
import PaymentIcon from '@material-ui/icons/Payment';
import TextField from '@material-ui/core/TextField';

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
    isCheckingOut: false,
    checkoutStep: 0
  };

  constructor() {
    super();
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.setCheckoutStep0 = this.setCheckoutStep.bind(this, 0);
    this.setCheckoutStep1 = this.setCheckoutStep.bind(this, 1);
    this.setCheckoutStep2 = this.setCheckoutStep.bind(this, 2);
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

  setCheckoutStep(step) {
    this.setState({checkoutStep: step})
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
            justify="center"
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
              <Grid item width={.8}>
                <Paper className={css.ModalPaper}>
                  <Tabs
                    value={this.state.checkoutStep}
                    variant="scrollable"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example">
                    <Tab onClick={this.setCheckoutStep0} label="Confirm" icon={<AssignmentTurnedInIcon />}/>
                    <Tab  label="Pay" icon={<PaymentIcon />}/>
                    <Tab onClick={this.setCheckoutStep2} label="Enjoy" icon={<DoneIcon />}/>
                  </Tabs>
                  <Box value={0} index={1} marginTop={2} hidden={!(this.state.checkoutStep === 0)}>
                    <BurgerRepresentation
                      order={this.state.order}
                      ingredients={this.state.ingredients}/>
                      <OrderConfirmation order={this.state.order} />
                      <Button onClick={this.setCheckoutStep1} color="primary">Next</Button>
                  </Box>
                  <Box value={1} index={2} marginTop={2} hidden={!(this.state.checkoutStep === 1)}>
                    <form>
                      <TextField id="ch-name" label="Name" margin="normal"/><br />
                      <TextField id="ch-lastname" label="Lastname" margin="normal"/><br />
                      <TextField id="ch-number" label="Card Number" margin="normal"/><br />
                      <TextField id="ch-expires" label="Exp" margin="normal"/><br />
                      <TextField id="ch-cvv" label="CVV" margin="normal"/><br />
                    </form>
                  </Box>
                  <Box value={3} index={4} marginTop={2} hidden={!(this.state.checkoutStep === 2)}>
                    <h2>Yay</h2>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
        </Modal>
      </React.Fragment>
    );
  }
}