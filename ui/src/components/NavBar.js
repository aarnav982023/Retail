import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { SwipeableDrawer } from "@material-ui/core";
import { Link } from "react-router-dom";

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
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const categories = [
    "Electronics",
    "Appliances",
    "Fashion",
    "Furniture",
    "Sports",
    "Books"
  ];
  const drawer = (
    <div className={classes.list}>
      <List>
        {categories.map(category => (
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
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              setDrawerOpen(true);
            }}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography variant="h6" className={classes.title}>
              Retail
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={drawerOpen}
        onOpen={() => {
          setDrawerOpen(true);
        }}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        {drawer}
      </SwipeableDrawer>
    </div>
  );
};

export default NavBar;
