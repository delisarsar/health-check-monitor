import React from "react";
import { FormattedMessage } from "react-intl";
import { gql } from "apollo-boost";

export const CREATE_APPLICATION_LABEL = (
  <FormattedMessage
    id="features.home.create-application"
    defaultMessage={"+ Create"}
  />
);

export const FILTER_BY_NAME_LABEL = (
  <FormattedMessage
    id="overview.filter-by-name"
    defaultMessage={"Filter by name"}
  />
);

export const NO_APPLICATION_FOUND_LABEL = (
  <FormattedMessage
    id="overview.no-application-found"
    defaultMessage={"No application found"}
  />
);

export const APPLICATIONS_TITLE_LABEL = (
  <FormattedMessage
    id="overview.applications"
    defaultMessage={"Applications (Health Checks)"}
  />
);

export const GET_APPLICATIONS_LIKE_NAME = gql`
  query GetApplicationsLikeName($name: String) {
    getApplicationsLikeName(name: $name) {
      id
      name
      healthCheck {
        endpoint
      }
    }
  }
`;
