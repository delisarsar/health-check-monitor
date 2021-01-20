import React, { memo } from "react";
import AppBar from "@material-ui/core/AppBar";
import logo from "./logo.png";
import useStyles from "./styles";
import { Box } from "@material-ui/core";

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Box display="flex" p={1} m={1}>
          <img src={logo} alt="Logo" width="108" height="49" />;
        </Box>
      </AppBar>
    </div>
  );
};

export default memo(Header);
