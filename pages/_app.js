import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import { Provider } from "react-redux";
import store from "../store";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function MyApp({ Component, pageProps }) {
  const desiredChainId = 80001;

  if (Component.getLayout) {
    return (
      <ThirdwebProvider desiredChainId={desiredChainId}>
      <LayoutProvider>
        {Component.getLayout(<Component {...pageProps} />)}
      </LayoutProvider>
      </ThirdwebProvider>
    );
  } else {
    return (
      <ThirdwebProvider desiredChainId={desiredChainId}>
      <LayoutProvider>
        <Layout>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </LayoutProvider>
      </ThirdwebProvider>
    );
  }
}
