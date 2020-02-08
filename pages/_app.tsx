import { AppProps } from "next/app";
import "../css/tailwind.css";
import { FC } from "react";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
