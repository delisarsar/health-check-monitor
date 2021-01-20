import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import ContentLoader from "../ContentLoader";
import useStyles from "./styles";
import {
  APP_NAME_CHARACTER_LIMIT,
  APP_ENDPOINT_CHARACTER_LIMIT,
  GET_APPLICATION_BY_ID,
  CREATE_APPLICATION,
  DELETE_APPLICATION,
  UPDATE_APPLICATION,
} from "./constants";
import { getModalStyle } from "./utils";

const ApplicationEditor = ({ appId }) => {
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
    onCompleted: (data) => redirectToHomePage(),
  });

  const [
    deleteApplication,
    { deleteApplicationLoading, deleteApplicationError },
  ] = useMutation(DELETE_APPLICATION, {
    onCompleted: (data) => redirectToHomePage(),
  });

  const [
    updateApplication,
    { updateApplicationLoading, updateApplicationError },
  ] = useMutation(UPDATE_APPLICATION, {
    onCompleted: (data) => redirectToHomePage(),
  });

  const [
    getApplicationById,
    {
      loading,
      getApplicationByError,
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
    getApplicationByError;

  return (
    <ContentLoader loading={requestProcessing} error={requestErrored}>
      <div style={modalStyle} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            label="Application Name"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{ maxLength: APP_NAME_CHARACTER_LIMIT }}
            value={appInfo.appName}
            onChange={(e) =>
              setAppInfo({ ...appInfo, appName: e.target.value })
            }
            placeholder={"Name your applicaion"}
          />
          <Box pt={2}>
            <TextField
              label="Health Check"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{ maxLength: APP_ENDPOINT_CHARACTER_LIMIT }}
              value={appInfo.endpoint}
              onChange={(e) =>
                setAppInfo({ ...appInfo, endpoint: e.target.value })
              }
              placeholder={"Health check endpoint"}
            />
          </Box>
          <Grid container spacing={3} className={classes.actionButtonsGrid}>
            <Grid item>
              <Button
                variant="contained"
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
                {isNil(appInfo.appId) ? "Create" : "Save"}
              </Button>
            </Grid>
            {!isNil(appInfo.appId) && (
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    deleteApplication({
                      variables: {
                        applicationId: appInfo.appId,
                      },
                    })
                  }
                  className={classes.actionButton}
                >
                  Delete
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
  appId: PropTypes.number,
};

ApplicationEditor.defaultPropTypes = {
  appId: undefined,
};

export default ApplicationEditor;
