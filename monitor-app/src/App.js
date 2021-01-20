import React from "react";
import { IntlProvider } from "react-intl";
import locale_en from "./translations/en.json";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import ApplicationEditPage from "./app/pages/ApplicationEditPage";
import OverviewPage from "./app/pages/OverviewPage";
import { EDIT_PAGE_ROUTE, OVERVIEW_PAGE_ROUTE } from "./app/pages/constants";

const graphQlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: `${process.env.REACT_APP_GRAPHQL_HOST}/graphql` }),
});

const translations = {
  en: locale_en,
};
const language = "en"; //TBD: English is only supported for now

const App = () => {
  return (
    <ApolloProvider client={graphQlClient}>
      <IntlProvider locale={language} messages={translations[language]}>
        <BrowserRouter>
          <Switch>
            <Route exact path={OVERVIEW_PAGE_ROUTE} component={OverviewPage} />
            <Route
              exact
              path={EDIT_PAGE_ROUTE}
              component={ApplicationEditPage}
            />
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    </ApolloProvider>
  );
};

export default App;
