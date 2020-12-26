import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Navbar() {
  const classes = useStyles();
  const [tabVal, setTabValue] = React.useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Saket Mahajan
          </Typography>
          <Tabs
            value={tabVal}
            indicatorColor="secondary"
            textColor="inherit"
            onChange={handleTabChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Home" component={Link} to="/home" />
            <Tab label="File Manager" component={Link} to="/file" />
          </Tabs>
          <img
            align="center"
            src="https://enc2b38a75kd45p.m.pipedream.net"
            alt="mahajansaket"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));
