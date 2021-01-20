import React, { memo } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import {
  EDIT_APPLICATION_LABEL,
  ENDPOINT_APPLICATION_LABEL,
} from "./constants";

const ApplicationCard = ({ id, appName, healthCheckEndpoint, onChange }) => {
  const classes = useStyles();
  return (
    <Card
      data-testid={`application-card-${id}`}
      key={id}
      elevation={2}
      className={classes.root}
    >
      <CardContent className={classes.cardContent}>
        <Typography data-testid="card-app-name">{appName}</Typography>
        <Typography data-testid="card-endpoint">
          {ENDPOINT_APPLICATION_LABEL}: {healthCheckEndpoint}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          data-testid="edit-button"
          onClick={() => onChange(id)}
          className={classes.hintActionButton}
        >
          {EDIT_APPLICATION_LABEL}
        </Button>
      </CardActions>
    </Card>
  );
};

export default memo(ApplicationCard);

ApplicationCard.propTypes = {
  id: PropTypes.number.isRequired,
  appName: PropTypes.string.isRequired,
  healthCheckEndpoint: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
