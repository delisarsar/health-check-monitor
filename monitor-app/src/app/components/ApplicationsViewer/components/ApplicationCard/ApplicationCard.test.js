import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import ApplicationCard from ".";
import messages from "../../../../../translations/en.json";

test("renders correctly", () => {
  const { container } = render(
    <IntlProvider locale="en-US" messages={messages}>
      <ApplicationCard
        id={1}
        appName="name"
        healthCheckEndpoint="endpoint"
        onChange={() => jest.fn()}
      />
    </IntlProvider>
  );
  expect(container).toMatchSnapshot();
});

test("navigate call the edit app function on click ", () => {
  const mockCallback = jest.fn();
  const { getByTestId } = render(
    <IntlProvider locale="en-US" messages={messages}>
      <ApplicationCard
        id={1}
        appName="name"
        healthCheckEndpoint="endpoint"
        onChange={mockCallback}
      />
    </IntlProvider>
  );
  const editButton = getByTestId("edit-button");
  userEvent.click(editButton);
  expect(mockCallback).toHaveBeenCalled();
});
