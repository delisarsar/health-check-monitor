import React from "react";
import { shallow } from "enzyme";
import ApplicationCard from ".";

test("renders correctly", () => {
  const wrapper = shallow(
    <ApplicationCard
      id={1}
      appName="name"
      healthCheckEndpoint="endpoint"
      onEditApplication={() => jest.fn()}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
