import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { FC } from "react";
import getClient from "../graphql/client";
import "../css/tailwind.css";

const client = getClient();

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </div>
);

export default App;
