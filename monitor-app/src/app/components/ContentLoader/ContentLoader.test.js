import React from "react";
import { render } from "@testing-library/react";
import ContentLoader from ".";

describe("<ContentLoader />", () => {
  test("renders children", () => {
    const { getByText } = render(
      <ContentLoader>
        <p>hello</p>
      </ContentLoader>
    );
    expect(getByText("hello")).toBeInTheDocument();
  });

  test("renders a circular progress when loading is true", () => {
    const { getByTestId } = render(<ContentLoader loading={true} />);
    expect(getByTestId("progressLoader")).toBeInTheDocument();
  });

  test("renders an error message when it's true", () => {
    const { getByTestId } = render(
      <ContentLoader error={{ error: "something" }} />
    );
    expect(getByTestId("errorMessage")).toBeInTheDocument();
  });
});
