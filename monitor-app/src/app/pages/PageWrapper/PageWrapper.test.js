import React from "react";
import { shallow } from "enzyme";
import PageWrapper from ".";
import { Typography } from "@material-ui/core";

test("renders correctly", () => {
  const wrapper = shallow(
    <PageWrapper>
      <Typography>learn react</Typography>
    </PageWrapper>
  );
  expect(wrapper).toMatchSnapshot();
});
