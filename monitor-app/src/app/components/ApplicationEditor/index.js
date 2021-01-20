import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import { useIntl } from "react-intl";
import isEmpty from "lodash/isEmpty";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import ContentLoader from "../ContentLoader";
import useStyles from "./styles";
import { APPLICATION_NAME_LABEL } from "../../constants";
import {
  APP_NAME_CHARACTER_LIMIT,
  APP_ENDPOINT_CHARACTER_LIMIT,
  GET_APPLICATION_BY_ID,
  CREATE_APPLICATION,
  DELETE_APPLICATION,
  UPDATE_APPLICATION,
  CREATE_LABEL,
  SAVE_LABEL,
  HEALTH_CHECK_LABEL,
  DELETE_LABEL,
  getModalStyle,
} from "./constants";

const ApplicationEditor = ({ appId }) => {
  const intl = useIntl();
  const classes = useStyles();
  const history = useHistory();
  const [appInfo, setAppInfo] = useState({
    appId,
    appName: "",
    endpoint: "",
  });
  const [modalStyle] = useState(getModalStyle);

  const [
    createApplication,
    { createApplicationLoading, createApplicationError },
  ] = useMutation(CREATE_APPLICATION, {
    onCompleted: () => redirectToHomePage(),
    onError: () =>
      console.log("Existing application name conflict/Invalid endpoint format"), //TODO Have a nicer alert view
  });

  const [
    deleteApplication,
    { deleteApplicationLoading, deleteApplicationError },
  ] = useMutation(DELETE_APPLICATION, {
    onCompleted: () => redirectToHomePage(),
    onError: () => console.log("Error occured"), //TODO Have a nicer alert view
  });

  const [
    updateApplication,
    { updateApplicationLoading, updateApplicationError },
  ] = useMutation(UPDATE_APPLICATION, {
    onCompleted: () => redirectToHomePage(),
    onError: () => console.log("Invalid endpoint format"), //TODO Have a nicer alert view
  });

  const [
    getApplicationById,
    {
      loading,
      getApplicationByIdError,
      data: { getApplicationById: appByIdData } = {},
    },
  ] = useLazyQuery(GET_APPLICATION_BY_ID);

  const redirectToHomePage = () => {
    history.push("/");
  };

  useEffect(() => {
    if (appId) {
      getApplicationById({ variables: { appId } });
    }
    // eslint-disable-next-line
  }, [appId]);

  useEffect(() => {
    if (appByIdData) {
      const { id, name, healthCheck } = appByIdData;
      setAppInfo({
        appId: id,
        appName: name,
        endpoint: healthCheck.endpoint,
      });
    }
  }, [appByIdData]);

  const requestProcessing =
    loading ||
    createApplicationLoading ||
    updateApplicationLoading ||
    deleteApplicationLoading;

  const requestErrored =
    createApplicationError ||
    deleteApplicationError ||
    updateApplicationError ||
    getApplicationByIdError;

  return (
    <ContentLoader loading={requestProcessing} error={requestErrored}>
      <div style={modalStyle} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            label={APPLICATION_NAME_LABEL}
            data-testid="application-name-input"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{ maxLength: APP_NAME_CHARACTER_LIMIT }}
            value={appInfo.appName}
            onChange={(e) =>
              setAppInfo({ ...appInfo, appName: e.target.value })
            }
            placeholder={intl.formatMessage({
              id: "overview.name-your-app",
              defaultMessage: "Name your application",
            })}
          />
          <Box pt={2}>
            <TextField
              label={HEALTH_CHECK_LABEL}
              data-testid="endpoint-input"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{ maxLength: APP_ENDPOINT_CHARACTER_LIMIT }}
              value={appInfo.endpoint}
              onChange={(e) =>
                setAppInfo({ ...appInfo, endpoint: e.target.value })
              }
              placeholder={intl.formatMessage({
                id: "overview.health-check-endpoint",
                defaultMessage: "Health Check Endpoint URL",
              })}
            />
          </Box>
          <Grid container spacing={3} className={classes.actionButtonsGrid}>
            <Grid item>
              <Button
                variant="contained"
                data-testid="save-button"
                className={classes.actionButton}
                onClick={
                  isNil(appInfo.appId)
                    ? () =>
                        createApplication({
                          variables: {
                            name: appInfo.appName,
                            endpoint: appInfo.endpoint,
                          },
                        })
                    : () =>
                        updateApplication({
                          variables: {
                            name: appInfo.appName,
                            appId: appInfo.appId,
                            endpoint: appInfo.endpoint,
                          },
                        })
                }
                disabled={isEmpty(appInfo.appName) || isEmpty(appInfo.endpoint)}
              >
                {isNil(appInfo.appId) ? CREATE_LABEL : SAVE_LABEL}
              </Button>
            </Grid>
            {!isNil(appInfo.appId) && (
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  data-testid="delete-button"
                  onClick={() =>
                    deleteApplication({
                      variables: {
                        applicationId: appInfo.appId,
                      },
                    })
                  }
                  className={classes.actionButton}
                >
                  {DELETE_LABEL}
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
    </ContentLoader>
  );
};

ApplicationEditor.propTypes = {
  appId: PropTypes.string,
};

ApplicationEditor.defaultPropTypes = {
  appId: undefined,
};

export default ApplicationEditor;
