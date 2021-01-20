import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { GET_APPLICATIONS_LIKE_NAME } from "./constants";
import { IntlProvider } from "react-intl";
import messages from "../../../translations/en.json";
import ApplicationsViewer from ".";
import { Router } from "react-router-dom";

const nonEmptyResponse = [
  {
    request: {
      query: GET_APPLICATIONS_LIKE_NAME,
      variables: {
        name: "",
      },
    },
    result: {
      errors: [],
      data: {
        getApplicationsLikeName: [
          {
            id: 1,
            name: "Jahia Cloud",
            healthCheck: {
              endpoint: "https://jahia.com",
            },
          },
        ],
      },
    },
  },
];

const emptyResponse = [
  {
    request: {
      query: GET_APPLICATIONS_LIKE_NAME,
      variables: {
        name: "",
      },
    },
    result: {
      errors: [],
      data: {
        getApplicationsLikeName: [],
      },
    },
  },
];

describe("<ApplicationsViewer />", () => {
  test("renders correctly with a sample application", async () => {
    const { container, getByTestId } = render(
      <MockedProvider mocks={nonEmptyResponse} addTypename={false}>
        <IntlProvider locale="en-US" messages={messages}>
          <ApplicationsViewer />
        </IntlProvider>
      </MockedProvider>
    );
    expect(getByTestId("progress-loader")).toBeInTheDocument();

    await waitFor(
      () =>
        expect(getByTestId("card-app-name")).toHaveTextContent("Jahia Cloud"),
      () => expect(getByTestId("card-endpoint")).toContain("https://jahia.com")
    );

    expect(container).toMatchSnapshot();
  });

  test("renders a no applications label when it's empty", async () => {
    const { container, getByTestId } = render(
      <MockedProvider mocks={emptyResponse}>
        <IntlProvider locale="en-US" messages={messages}>
          <ApplicationsViewer />
        </IntlProvider>
      </MockedProvider>
    );
    expect(getByTestId("progress-loader")).toBeInTheDocument();

    await waitFor(() =>
      expect(getByTestId("overview-no-applications-found")).toBeInTheDocument()
    );

    expect(container).toMatchSnapshot();
  });

  test("redirect to the create new application page when the button is clicked ", async () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    const { getByTestId } = render(
      <Router history={historyMock}>
        <MockedProvider mocks={nonEmptyResponse}>
          <IntlProvider locale="en-US" messages={messages}>
            <ApplicationsViewer />
          </IntlProvider>
        </MockedProvider>
      </Router>
    );
    expect(getByTestId("progress-loader")).toBeInTheDocument();

    await waitFor(() =>
      expect(getByTestId("create-application")).toBeInTheDocument()
    );

    userEvent.click(getByTestId("create-application"));

    expect(historyMock.push).toHaveBeenCalledWith("/edit");
  });

  test("redirects to the edit page route in order to edit a card ", async () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    const { getByTestId } = render(
      <Router history={historyMock}>
        <MockedProvider mocks={nonEmptyResponse} addTypename={false}>
          <IntlProvider locale="en-US" messages={messages}>
            <ApplicationsViewer />
          </IntlProvider>
        </MockedProvider>
      </Router>
    );

    expect(getByTestId("progress-loader")).toBeInTheDocument();
    await waitFor(() =>
      expect(getByTestId("application-card-1")).toBeInTheDocument()
    );

    userEvent.click(getByTestId("edit-button"));
    expect(historyMock.push).toHaveBeenCalledWith("/edit?applicationId=1");
  });
});
