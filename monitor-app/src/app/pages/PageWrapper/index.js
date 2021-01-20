import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header";
import { Box } from "@material-ui/core";

const PageWrapper = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <Box pt={3} pl={3}>
        {children}
      </Box>
    </>
  );
};

export default PageWrapper;

PageWrapper.propTypes = {
  children: PropTypes.node,
};
