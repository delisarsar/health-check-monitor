import React from "react";
import { FormattedMessage } from "react-intl";
import { gql } from "apollo-boost";

export const CREATE_APPLICATION_LABEL = (
  <FormattedMessage
    id="features.home.create-application"
    defaultMessage={"+ Create"}
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
