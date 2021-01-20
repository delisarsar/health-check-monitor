import React from "react";
import { render } from "@testing-library/react";
import ContentLoader from ".";
import { Typography } from "@material-ui/core";

test("renders correctly the children", () => {
  const { getByText } = render(
    <ContentLoader>
      <Typography>Hello</Typography>
    </ContentLoader>
  );
  expect(getByText("Hello")).toBeInTheDocument();
});

test("renders a circular progress when loading is true", () => {
  const { getByTestId } = render(<ContentLoader loading={true} />);
  expect(getByTestId("progressLoader")).toBeInTheDocument();
});

test("renders an error message when it's true", () => {
  const { getByTestId } = render(<ContentLoader error={true} />);
  expect(getByTestId("errorMessage")).toBeInTheDocument();
});
