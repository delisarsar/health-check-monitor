import React from "react";
import { render } from "@testing-library/react";
import PageWrapper from ".";
import { Typography } from "@material-ui/core";

describe("<PageWrapper />", () => {
  test("renders correctly", () => {
    const { container } = render(
      <PageWrapper>
        <Typography>learn react</Typography>
      </PageWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
