import '@/styles/globals.css'
import { ThirdwebProvider } from "@thirdweb-dev/react";

 function App({ Component, pageProps }) {
  const desiredChainId = 80001;
  return (
    <>
        <ThirdwebProvider desiredChainId={desiredChainId}>
          <Component {...pageProps}/>
        </ThirdwebProvider>
    </>
  )
}
export default App;
