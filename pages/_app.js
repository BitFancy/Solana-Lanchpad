import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { Provider } from "react-redux";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "../styles/demo/LoadingSpinner.css";
// import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/react-toastify/dist/ReactToastify.css'


import store from "../store";
import {
  RainbowKitProvider,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import {  polygonMumbai } from 'wagmi/chains';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { WagmiConfig, configureChains, createClient } from "wagmi";

export default function MyApp({ Component, pageProps }) {
  
  const { chains, provider } = configureChains(
    [  polygonMumbai],
    [alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_MUMBAI_RPC_URL }), publicProvider()],
    jsonRpcProvider({
      // rpcUrl:"https://polygon-testnet.public.blastapi.io/"
      rpcUrl:'https://rpc-mumbai.maticvigil.com/v1/f336dfba703440ee198bf937d5c065b8fe04891c'
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
      <LayoutProvider >
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
