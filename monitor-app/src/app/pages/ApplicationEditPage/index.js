import React from "react";
import { useLocation } from "react-router-dom";
import ApplicationEditor from "../../components/ApplicationEditor";
import { EDIT_PAGE_APPLICATION_ID_PARAM } from "../../pages/constants";
import PageWrapper from "../PageWrapper";

const ApplicationEditPage = () => {
  const { search } = useLocation();
  return (
    <PageWrapper>
      <ApplicationEditor
        appId={new URLSearchParams(search).get(EDIT_PAGE_APPLICATION_ID_PARAM)}
      />
    </PageWrapper>
  );
};

export default ApplicationEditPage;
