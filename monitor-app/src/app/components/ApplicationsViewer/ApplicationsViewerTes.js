import React from "react";
import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { GET_APPLICATIONS_LIKE_NAME } from "./constants";
import ApplicationsViewer from ".";
import { Typography } from "@material-ui/core";

const applicationMock = [
  {
    request: {
      query: GET_APPLICATIONS_LIKE_NAME,
      variables: {
        name: "",
      },
    },
    result: {
      data: {
        getApplicationsLikeName: [
          {
            id: 11,
            name: "Test App",
            healthCheck: {
              endpoint: "https://google.com",
            },
          },
        ],
      },
    },
  },
];
test("renders without error", async () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={[applicationMock]} addTypename={false}>
      <ApplicationsViewer />
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0));

  const tree = component.toJSON();
  expect(tree.children).toContain("Loading...");
});

test("renders no applications", async () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={[]} addTypename={false}>
      <ApplicationsViewer />
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0));

  const tree = component.toJSON();
  expect(tree.children).toContain("Loading...");
});
