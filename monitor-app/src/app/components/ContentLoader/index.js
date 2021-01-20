import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

const ContentLoader = (props) => {
  const { loading, error, children } = props;
  if (loading) {
    return <CircularProgress data-testid="progressLoader" />;
  }
  if (error) {
    return <Typography data-testid="errorMessage">Error happened</Typography>;
  }
  return children;
};

export default ContentLoader;

ContentLoader.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.object,
};
