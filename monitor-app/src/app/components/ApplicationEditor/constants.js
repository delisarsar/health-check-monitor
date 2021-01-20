import React from "react";
import { gql } from "apollo-boost";
import { FormattedMessage } from "react-intl";

export const APP_NAME_CHARACTER_LIMIT = 255;
export const APP_ENDPOINT_CHARACTER_LIMIT = 255;

export const APPLICATION_NAME_LABEL = (
  <FormattedMessage
    id="features.home.edit-application.app-name"
    defaultMessage={"Application name"}
  />
);

export const APPLICATION_HEALTH_CHECK_ENDPOINT_LABEL = (
  <FormattedMessage
    id="features.home.edit-application.app-endpoint"
    defaultMessage={"Health Check Endpoint"}
  />
);

export const SAVE_LABEL = (
  <FormattedMessage
    id="features.home.edit-application.save"
    defaultMessage={"Save"}
  />
);

export const CANCEL_LABEL = (
  <FormattedMessage
    id="features.home.edit-application.save"
    defaultMessage={"Save"}
  />
);

export const DELETE_LABEL = (
  <FormattedMessage
    id="features.home.edit-application.save"
    defaultMessage={"Save"}
  />
);

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($name: String!, $endpoint: String!) {
    createApplication(name: $name, endpoint: $endpoint)
  }
`;

export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($applicationId: Int!) {
    deleteApplication(applicationId: $applicationId)
  }
`;

export const UPDATE_APPLICATION = gql`
  mutation UpdateApplication($name: String!, $endpoint: String!, $appId: Int!) {
    updateApplication(name: $name, endpoint: $endpoint, appId: $appId)
  }
`;

export const GET_APPLICATION_BY_ID = gql`
  query GetApplicationsById($appId: Int) {
    getApplicationById(appId: $appId) {
      id
      name
      healthCheck {
        endpoint
      }
    }
  }
`;
