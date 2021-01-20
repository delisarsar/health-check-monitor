import React, { memo } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";

const ApplicationCard = ({
  id,
  appName,
  healthCheckEndpoint,
  onEditApplication,
}) => {
  const classes = useStyles();
  return (
    <Card key={id} elevation={2} className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography>{appName}</Typography>
        <Typography>Endpoint: {healthCheckEndpoint}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          onClick={() => onEditApplication(id)}
          className={classes.hintActionButton}
        >
          Edit
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
  onEditApplication: PropTypes.func.isRequired,
};
