import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { Provider } from "react-redux";
import store from "../store";
import {
  RainbowKitProvider,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains ,createClient} from 'wagmi';
import { publicProvider } from "wagmi/providers/public";
import Layout from "../Components/Layout"; 
import { alchemyProvider } from "wagmi/providers/alchemy";
import {  polygonMumbai } from 'wagmi/chains';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export default function MyApp({ Component, pageProps }) {
  
  const { chains, provider } = configureChains(
    [  polygonMumbai],
    [alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_MUMBAI_RPC_URL }), publicProvider()],
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  );
  
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  });
  if (Component.getLayout) {
    return (
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider  chains={chains}>
      <LayoutProvider>
       
          <Provider store={store}>
          {Component.getLayout(<Component {...pageProps} />)}
          </Provider>
       
      </LayoutProvider>
=      </RainbowKitProvider>
      </WagmiConfig>

    );
  } else {
    return (
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider  chains={chains}>
      <LayoutProvider>
       
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
       
      </LayoutProvider>
      </RainbowKitProvider>
      </WagmiConfig>
    );
  }
}
