import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { IntlProvider } from "react-intl";
import messages from "../../../translations/en.json";
import OverviewPage from ".";

describe("<OverviewPage />", () => {
  test("renders correctly", () => {
    const { container } = render(
      <IntlProvider locale="en-US" messages={messages}>
        <MockedProvider>
          <OverviewPage />
        </MockedProvider>
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
