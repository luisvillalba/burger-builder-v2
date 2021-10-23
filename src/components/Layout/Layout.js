import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import StoreIcon from "@material-ui/icons/Store";
import TopMenu from "../TopMenu/TopMenu";

export default (props) => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <StoreIcon />
          </IconButton>
          <Typography variant="h6">Burger Builder</Typography>
          <TopMenu />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">{props.children}</Container>
    </React.Fragment>
  );
};
