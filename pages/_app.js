import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "../styles/demo/LoadingSpinner.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { polygonMumbai } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
// const token = localStorage.getItem("platform_token");
const client = new ApolloClient({
  uri: "https://mumbai.testgraph.myriadflow.com/subgraphs/name/v1/u123/graphql",
  // uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
  headers: {
    // Authorization: `Bearer ${token}`,
    // Add any other required headers
  },
});

export default function MyApp({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [polygonMumbai],
    [
      alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_MUMBAI_RPC_URL }),
      publicProvider(),
    ],
    jsonRpcProvider({
      rpcUrl:
        "https://rpc-mumbai.maticvigil.com/v1/f336dfba703440ee198bf937d5c065b8fe04891c",
    })
  );
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  if (Component.getLayout) {
    return (
      // <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <LayoutProvider>
            {Component.getLayout(<Component {...pageProps} />)}
          </LayoutProvider>
          ={" "}
        </RainbowKitProvider>
      </WagmiConfig>
      // </ApolloProvider>
    );
  } else {
    return (
      // <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
        </RainbowKitProvider>
      </WagmiConfig>
      // </ApolloProvider>
    );
  }
}
