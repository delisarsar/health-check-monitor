import React from "react";
import { gql } from "apollo-boost";
import { FormattedMessage } from "react-intl";

export const APP_NAME_CHARACTER_LIMIT = 255;
export const APP_ENDPOINT_CHARACTER_LIMIT = 255;

export const HEALTH_CHECK_LABEL = (
  <FormattedMessage
    id="overview.health-check"
    defaultMessage={"Health Check"}
  />
);

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const CREATE_LABEL = (
  <FormattedMessage id="overview.create" defaultMessage={"Create"} />
);

export const SAVE_LABEL = (
  <FormattedMessage id="overview.save" defaultMessage={"Save"} />
);

export const DELETE_LABEL = (
  <FormattedMessage id="overview.delete" defaultMessage={"Save"} />
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
