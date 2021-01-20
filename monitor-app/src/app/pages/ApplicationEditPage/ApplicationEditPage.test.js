import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { IntlProvider } from "react-intl";
import messages from "../../../translations/en.json";
import { Router } from "react-router-dom";
import { EDIT_PAGE_APPLICATION_ID_PARAM } from "../../pages/constants";
import ApplicationEditPage from ".";

describe("<ApplicationEditPage />", () => {
  test("renders correctly", () => {
    const historyMock = {
      push: jest.fn(),
      location: {},
      listen: jest.fn(),
      search: { EDIT_PAGE_APPLICATION_ID_PARAM: 1 },
    };
    const { container } = render(
      <Router history={historyMock}>
        <IntlProvider locale="en-US" messages={messages}>
          <MockedProvider>
            <ApplicationEditPage />
          </MockedProvider>
        </IntlProvider>
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
