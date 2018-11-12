
import ApolloClient from "apollo-boost";
import * as React from 'react';
import ApolloProvider from "react-apollo/ApolloProvider";
import * as ReactDOM from 'react-dom';
import './index.css';
import Complaints from './complaints/complaints';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient(
    {
        credentials: 'include',
        uri: "/graphql",
    }
);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Complaints/>
    </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
