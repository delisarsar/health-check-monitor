import React from "react";
import { render } from "@testing-library/react";
import Header from ".";

describe("<Header />", () => {
  test("renders correctly", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
