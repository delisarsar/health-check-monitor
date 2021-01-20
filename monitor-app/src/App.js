import React from "react";
import { IntlProvider } from "react-intl";
import locale_en from "./translations/en.json";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import ApplicationEditPage from "./app/pages/ApplicationEditPage";
import OverviewPage from "./app/pages/OverviewPage";

const graphQlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: process.env.REACT_APP_API_URL }),
});

const translations = {
  en: locale_en,
};
const language = "en";

const App = () => {
  return (
    <ApolloProvider client={graphQlClient}>
      <IntlProvider locale={language} messages={translations[language]}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={OverviewPage} />
            <Route exact path="/edit" component={ApplicationEditPage} />
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    </ApolloProvider>
  );
};

export default App;
