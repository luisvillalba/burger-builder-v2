import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Orders from "./containers/Orders/Orders";
import About from "./containers/About/About";
import Layout from "./components/Layout/Layout";
import "./App.css";
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from "@material-ui/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#2f498f",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" exact element={<BurgerBuilder />} />
            <Route path="/orders/" exact element={<Orders />} />
            <Route path="/about/" exact element={<About />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
