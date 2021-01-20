import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useIntl } from "react-intl";
import isEmpty from "lodash/isEmpty";
import ApplicationCard from "./components/ApplicationCard";
import ContentLoader from "../ContentLoader";
import { APPLICATION_NAME_LABEL } from "../../constants";
import {
  EDIT_PAGE_ROUTE,
  EDIT_PAGE_APPLICATION_ID_PARAM,
} from "../../pages/constants";
import {
  NO_APPLICATION_FOUND_LABEL,
  APPLICATIONS_TITLE_LABEL,
  CREATE_APPLICATION_LABEL,
  GET_APPLICATIONS_LIKE_NAME,
} from "./constants";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";

const ApplicationsViewer = () => {
  const intl = useIntl();
  const classes = useStyles();
  const history = useHistory();
  const [applicationName, setApplicationName] = useState("");
  const [searchValue] = useDebounce(applicationName, 500);

  const redirectToCreateAppPage = () => {
    history.push(EDIT_PAGE_ROUTE);
  };

  const redirectToEditAppPage = (applicationId) => {
    history.push(
      `${EDIT_PAGE_ROUTE}?${EDIT_PAGE_APPLICATION_ID_PARAM}=${applicationId}`
    );
  };

  const { loading, data, refetch } = useQuery(GET_APPLICATIONS_LIKE_NAME, {
    variables: { name: searchValue },
  });

  useEffect(() => {
    refetch();
  }, [history, refetch, data]);

  return (
    <ContentLoader loading={loading}>
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              className={classes.createButton}
              data-testid="create-application"
              variant="contained"
              onClick={redirectToCreateAppPage}
            >
              {CREATE_APPLICATION_LABEL}
            </Button>
          </Grid>
          <Grid item>
            <TextField
              label={APPLICATION_NAME_LABEL}
              variant="outlined"
              size="small"
              value={applicationName}
              onChange={(e) => setApplicationName(e.target.value)}
              placeholder={intl.formatMessage({
                id: "overview.filter-by-name",
                defaultMessage: "Filter by name",
              })}
            />
          </Grid>
        </Grid>
        {isEmpty(data) || isEmpty(data.getApplicationsLikeName) ? (
          <Typography
            data-testid="overview-no-applications-found"
            className={classes.resultsTitle}
            variant="h5"
          >
            {NO_APPLICATION_FOUND_LABEL}
          </Typography>
        ) : (
          <>
            <Typography className={classes.resultsTitle} variant="h5">
              {APPLICATIONS_TITLE_LABEL}
            </Typography>
            <Grid container spacing={2} className={classes.appsGrid}>
              {data.getApplicationsLikeName.map((app) => (
                <Grid key={app.id} item>
                  <ApplicationCard
                    id={app.id}
                    appName={app.name}
                    healthCheckEndpoint={app.healthCheck.endpoint}
                    onChange={redirectToEditAppPage}
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
