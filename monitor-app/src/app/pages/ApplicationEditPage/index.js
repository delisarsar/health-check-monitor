import React from "react";
import { useLocation } from "react-router-dom";
import ApplicationEditor from "../../components/ApplicationEditor";
import PageWrapper from "../PageWrapper";

const ApplicationEditPage = () => {
  const { search } = useLocation();
  return (
    <PageWrapper>
      <ApplicationEditor
        appId={new URLSearchParams(search).get("applicationId")}
      />
    </PageWrapper>
  );
};

export default ApplicationEditPage;
