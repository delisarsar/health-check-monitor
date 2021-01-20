import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GENERIC_APP_ERROR } from "./constants";
import { Typography } from "@material-ui/core";

const ContentLoader = (props) => {
  const { loading, error, children } = props;
  if (loading) {
    return <CircularProgress data-testid="progress-loader" />;
  }
  if (error) {
    return (
      <Typography data-testid="generic-error-message">
        {GENERIC_APP_ERROR}
      </Typography>
    );
  }
  return children;
};

export default ContentLoader;

ContentLoader.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.object,
};
