import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { FC } from "react";
import client from "../graphql/client";
import "../css/tailwind.css";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
