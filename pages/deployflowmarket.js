import React, { useState ,useRef} from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import marketplaceAbi from '../artifacts/contracts/flow-accesscontrol/FlowAccessControl.sol/FlowAccessControl.json';
import Web3 from "web3";

export default function Deployflowmarket() {
    const [visible, setVisible] = useState(false);
    const msgs = useRef(null);

    var web3 = new Web3(Web3.givenProvider);

    const flowAccessMarletContarct = () => {
     const marketplaceContarct = new web3.eth.Contract(marketplaceAbi.abi);
        web3.eth.getAccounts().then((accounts) => {
          marketplaceContarct
            .deploy({
              data: marketplaceAbi.bytecode,
    
            })
            .send({ from: accounts[0], gas: 259773 })
            .on("receipt", (receipt) => {
              console.log("Contract Address:", receipt.contractAddress);
            });
            setVisible(true);
        });
      };
  return (
    <div>
        <div className="text-center">
        <Button label="Deploy Contract"  icon="pi pi-external-link" onClick={flowAccessMarletContarct} />

        </div>
<Dialog  visible={visible} style={{ width: '50vw',textAlign:"center" }} onHide={() => setVisible(false)}>
    <div className="m-0 bg-blue-600 text-white p-5 text-lg">
    <div>Well done !</div>
            <div>you are now the admin, Flow access control</div>
             <div>has been successfully deployed</div>
    </div>
</Dialog>
    </div>
  )
}
