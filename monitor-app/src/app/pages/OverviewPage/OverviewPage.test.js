import React from "react";
import { shallow } from "enzyme";
import OverviewPage from ".";

test("renders correctly", () => {
  const wrapper = shallow(<OverviewPage />);
  expect(wrapper).toMatchSnapshot();
});
