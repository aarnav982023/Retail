import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { SwipeableDrawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const NavBar = props => {
  const classes = useStyles();
  const [drawerOpen, setDrawer] = React.useState(false);
  const [login, setlogin] = React.useState(false);
  const [registration, setRegistration] = React.useState(false);
  const drawer = (
    <div className={classes.list}>
      <List>
        {props.sections.map(category => (
          <Link to={`/${category.toLowerCase()}`} key={category}>
            <ListItem button>
              <ListItemText primary={category} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            edge="start"
            onClick={() => {
              setDrawer(true);
            }}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Retail</Link>
          </Typography>
          <Button color="inherit" onClick={() => setlogin(true)}>
            Sign in
          </Button>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={drawerOpen}
        onOpen={() => {
          setDrawer(true);
        }}
        onClose={() => {
          setDrawer(false);
        }}
      >
        {drawer}
      </SwipeableDrawer>
      <Login
        open={login}
        handleClose={() => {
          setlogin(false);
        }}
        startRegistration={() => {
          setlogin(false);
          setRegistration(true);
        }}
      />
      <Registration
        open={registration}
        handleClose={() => {
          setRegistration(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(NavBar);
