import {  useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import Eterumpass from '../artifacts/contracts/eturnumpass/EternumPass.sol/EternumPass.json';
import BuyAsset from "../Components/buyAssetModal";
import Tradhub from "../artifacts/contracts/tradehub/TradeHub.sol/TradeHub.json";
import { Alert, Snackbar } from "@mui/material";
import Layout from "../Components/Layout";
import { Button } from "primereact/button";
import {  useContract, useSigner } from "wagmi";
import { ethers } from "ethers";
const EturnumpassAddress = process.env.NEXT_PUBLIC_ETERNUMPASS_ADDRESS;
const tradhubAddress = process.env.NEXT_PUBLIC_TRADEHUB_ADDRESS;

export default function CreateEternumPassNft() {
  const { data: signerData } = useSigner();
  console.log("signer data", signerData);
  const [toggle, setToggle] = useState(false);
  const [toggleinput, setToggleInput] = useState(false);
  const [auctionToggle, setAuctionToggle] = useState(false);
  const [model, setmodel] = useState(false);
  const [modelmsg, setmodelmsg] = useState("Transaction in progress!");
  const [formInput, updateFormInput] = useState({
    price: 0,
    name: "",
    description: "",
    alternettext: "",
    royalties: 5,
    auctionTime: 2,
  });

  const instagenContarct = useContract({
    addressOrName: EturnumpassAddress,
    contractInterface: Eterumpass.abi,
    signerOrProvider: signerData,
  });
  const tradhubContract = useContract({
    addressOrName: tradhubAddress,
    contractInterface: Tradhub.abi,
    signerOrProvider: signerData,
  });
  const mintEternumpass = async () => {
    try {
      const transaction = await instagenContarct.subscribe( {
        gasLimit: "173281",
      });
      let tx = await transaction.wait();
      console.log("transaction", transaction);
      setmodelmsg("Transaction 1 Complete");
      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();
      const price = ethers.utils.parseUnits(formInput.price, "ether");
      const forAuction = false,
        endTime = 0;

      await listItem(tokenId, price, forAuction, endTime); //Putting item to sale
    } catch (e) {
      console.log(e);
      setmodelmsg("Transaction 1 failed");
      return;
    }
    }
  
    const listItem = async (tokenId, price, forAuction, endTime) => {
      try {
        setmodelmsg("Transaction 2 in progress");
        const transaction = await tradhubContract.listItem(
          EturnumpassAddress,
          tokenId,
          price,
          1,
          forAuction,
          endTime,
          { gasLimit: "2099999" }
        );
        // await transaction.wait();
        console.log("transaction 2 is completed", transaction);
        setmodelmsg("Transaction 2 Complete !!");
      } catch (e) {
        console.log(e);
        setmodelmsg("Transaction 2 failed");
      } 
    };
  async function createMarket(e) {
    e.preventDefault();
    e.stopPropagation();
    const { name, description, price, auctionTime } = formInput;
    let assetData = {};
    if (!name || !description || !price) {
      setAlertMsg("Please Fill All Fields");
      setOpen(true);
      return;
    }
    assetData = {
      name,
      description,
      price,
      auctionTime,
    };

    setmodelmsg("Transaction 1 in  progress");
    setmodel(true);
    const data = JSON.stringify({ ...assetData });
    mintEternumpass(data);
    try {  
      
    } catch (error) {
      setmodelmsg("Transaction failed");
    }
  }

  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Layout title="Assets" description="This is used to create NFTs">
      <div className="body-back back-image-fus-nft">
        <div className="dark:bg-gray-800 kumbh text-center">
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {alertMsg}
            </Alert>
          </Snackbar>
          {model && (
            <BuyAsset open={model} setOpen={setmodel} message={modelmsg} />
          )}

          <div className="font-bold text-4xl easy-way ">
            <div>Effective Efficient Easy Way To create NFT</div>
          </div>
          <div className="flex justify-content-evenly mt-5">
            <div>
              <h3 className="text-3xl py-4 font-bold text-center">
                Create New Eternumpass NFT
              </h3>
            </div>
          </div>
          <div className="flex justify-content-center text-white" style={{ gap: "50px" }}>
            <div className="p-5">
              <div style={{ width: "500px" }}>
                <div>
                  <div className="mt-5">
                    <div style={{ textAlign: "initial" }}>Eternumpass Assets Name</div>
                    <input
                      required="required"
                      placeholder="Asset Name"
                      className="w-full mt-3 p-3 assets-input-back text-white"
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          name: e.target.value,
                        })
                      }
                    />

                    <div className="mt-5">
                      <div style={{ textAlign: "initial" }}>
                      Eternumpass Assets Description
                      </div>

                      <textarea
                        type="text"
                        placeholder="Asset Description"
                        className="w-full assets-input-back p-3 text-white mt-3"
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

               
               
               
                <div className="flex justify-content-between mt-5">
                  <div className="text-left">
                    <div className="font-bold text-3xl">Put on Tradhub</div>
                    <div>
                      Enter price to Allow Users Instantly Buy your NFT{" "}
                    </div>
                  </div>

                  <input
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                    type="checkbox"
                    className="assets-input-back"
                  />
                </div>
                {toggle && (
                  <div className="flex  justify-content-between">
                    <div
                      className="flex mt-3 gap-6 border-[1px] border-[#d5d5d6] rounded-xl p-3 cursor-pointer"
                      onClick={() => {
                        setAuctionToggle(false);
                        setToggleInput(!toggleinput);
                      }}
                    >
                      {" "}
                      Direct Sale
                    </div>
                    <div
                      className="flex mt-3 gap-6 border-[1px] border-[#d5d5d6] rounded-xl p-3 cursor-pointer"
                      onClick={() => {
                        setToggleInput(false);
                        setAuctionToggle(!auctionToggle);
                      }}
                    >
                      Auction
                    </div>
                  </div>
                )}

                {toggleinput && (
                  <div className="flex mt-3 gap-6 ">
                    <input
                      type="number"
                      className="w-full p-2 assets-input-back text-white"
                      placeholder="Asset Price in Matic"
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {auctionToggle && (
                  <div className="flex mt-3 gap-6 ">
                    <input
                      type="number"
                      className="w-full p-2 assets-input-back text-white"
                      placeholder="Asset Price in Matic"
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          price: e.target.value,
                        })
                      }
                    />

                    <InputNumber
                      className="w-full p-2 assets-input-back text-white"
                      placeholder="Auction Duration"
                      inputId="expiry"
                      suffix=" minutes"
                      onValueChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          auctionTime: e.target.value,
                        })
                      }
                      mode="decimal"
                      showButtons
                      min={0}
                      max={100}
                    />
                  </div>
                )}

                <div className="flex justify-content-between p-5">
                  <div>
                    <Button onClick={(e) => createMarket(e)}>
                      Create Eternumpass NFTs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
