import '@/styles/globals.css'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";     
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
