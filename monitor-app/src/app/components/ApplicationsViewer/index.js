import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import isEmpty from "lodash/isEmpty";
import ApplicationCard from "./components/ApplicationCard";
import ContentLoader from "../ContentLoader";
import {
  CREATE_APPLICATION_LABEL,
  GET_APPLICATIONS_LIKE_NAME,
} from "./constants";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";

const ApplicationsViewer = () => {
  const classes = useStyles();
  const history = useHistory();
  const [applicationName, setApplicationName] = useState("");
  const [searchValue] = useDebounce(applicationName, 500);

  useEffect(() => {
    refetch();
  }, [history]);

  const redirectToCreateAppPage = () => {
    history.push("/edit");
  };

  const redirectToEditAppPage = (applicationId) => {
    history.push(`/edit?applicationId=${applicationId}`);
  };

  const { loading, error, data, refetch } = useQuery(
    GET_APPLICATIONS_LIKE_NAME,
    {
      variables: { name: searchValue },
    }
  );

  return (
    <ContentLoader loading={loading} error={error}>
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              className={classes.createButton}
              variant="contained"
              onClick={redirectToCreateAppPage}
            >
              {CREATE_APPLICATION_LABEL}
            </Button>
          </Grid>
          <Grid item>
            <TextField
              label="Application Name"
              variant="outlined"
              size="small"
              value={applicationName}
              onChange={(e) => setApplicationName(e.target.value)}
              placeholder={"Filter by name"}
            />
          </Grid>
        </Grid>
        {isEmpty(data) || isEmpty(data.getApplicationsLikeName) ? (
          <Typography
            data-test-id="noAppFound"
            className={classes.resultsTitle}
            variant="h5"
          >
            No application found
          </Typography>
        ) : (
          <>
            <Typography className={classes.resultsTitle} variant="h5">
              Applications (Health Checks)
            </Typography>
            <Grid container spacing={2} className={classes.appsGrid}>
              {data.getApplicationsLikeName.map((app) => (
                <Grid key={app.id} item>
                  <ApplicationCard
                    id={app.id}
                    appName={app.name}
                    healthCheckEndpoint={app.healthCheck.endpoint}
                    onEditApplication={redirectToEditAppPage}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </ContentLoader>
  );
};

export default ApplicationsViewer;
