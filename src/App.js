import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import About from './containers/About/About';
import Layout from './components/Layout/Layout';
import { createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121'
    },
    secondary: {
      main: '#2f498f',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/orders/' exact component={Orders} />
          <Route path='/about/' exact component={About} />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
