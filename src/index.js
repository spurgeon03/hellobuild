import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { 
  ApolloClient, 
  ApolloProvider,
  InMemoryCache, 
  HttpLink 
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Auth0Provider } from '@auth0/auth0-react';

const token = "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";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Token ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    new HttpLink({ uri: "https://api.github.com/graphql" })
  ),
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <Auth0Provider 
    domain="dev-642bxt2f.us.auth0.com"
    clientId="hVkH2bbyntgjBFYJca7v7IauqoSqobd8"
    redirectUri={window.location.origin}
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
