import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import {
  GET_APPLICATION_BY_ID,
  CREATE_APPLICATION,
  UPDATE_APPLICATION,
  DELETE_APPLICATION,
} from "./constants";
import { IntlProvider } from "react-intl";
import messages from "../../../translations/en.json";
import ApplicationEditor from ".";
import { Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

const mocks = [
  {
    request: {
      query: GET_APPLICATION_BY_ID,
      variables: {
        appId: 1,
      },
    },
    result: {
      data: {
        getApplicationById: {
          id: 1,
          name: "Jahia Cloud",
          healthCheck: {
            endpoint: "https://jahia.com",
          },
        },
      },
    },
  },
  {
    request: {
      query: CREATE_APPLICATION,
      variables: {
        name: "name",
        endpoint: "https://jahia.com",
      },
    },
    result: {
      data: {
        createApplication: 1,
      },
    },
  },
  {
    request: {
      query: UPDATE_APPLICATION,
      variables: {
        name: "name-updated",
        endpoint: "https://jahia-updated.com",
      },
    },
    result: {
      data: {
        updateApplication: true,
      },
    },
  },
  {
    request: {
      query: DELETE_APPLICATION,
      variables: {
        applicationId: "1",
      },
    },
    result: {
      data: {
        deleteApplication: true,
      },
    },
  },
];

describe("<ApplicationEditor />", () => {
  test("update an existing application", async () => {
    act(async () => {
      const { getByTestId } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <IntlProvider locale="en-US" messages={messages}>
            <ApplicationEditor appId={"1"} />
          </IntlProvider>
        </MockedProvider>
      );
      const createButton = getByTestId("save-button");
      expect(createButton).toHaveAttribute("disabled", "");

      const applicationNameInput = getByTestId("application-name-input");
      expect(applicationNameInput).toBeTruthy();
      await userEvent.type(applicationNameInput, "name-updated");

      const endpointNameInput = getByTestId("endpoint-input");
      expect(endpointNameInput).toBeTruthy();

      await userEvent.type(endpointNameInput, "https://jahia-updated.com");
      await waitFor(() => expect(createButton).not.toHaveAttribute("disabled"));

      await userEvent.click(createButton);
      expect(getByTestId("endpoint-input")).toBeFalsy();
      expect(historyMock.push).toHaveBeenCalledWith("/");
    });
  });
  test("delete an existing application", async () => {
    act(async () => {
      const { getByTestId } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <IntlProvider locale="en-US" messages={messages}>
            <ApplicationEditor appId={"1"} />
          </IntlProvider>
        </MockedProvider>
      );
      expect(getByTestId("application-name-input")).toHaveTextContent(
        "Jahia Cloud"
      );
      expect(getByTestId("endpoint-input")).toContain("https://jahia.com");

      const deleteButton = getByTestId("delete-button");
      expect(deleteButton).not.toHaveAttribute("disabled", "");
      await userEvent.click(deleteButton);
      expect(historyMock.push).toHaveBeenCalledWith("/");
    });
  });
});
