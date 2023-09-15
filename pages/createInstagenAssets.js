import { useContext, useEffect, useState } from "react";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { InputNumber } from "primereact/inputnumber";
import InstaGen from "../artifacts/contracts/instagen/InstaGen.sol/InstaGen.json";
import BuyAsset from "../Components/buyAssetModal";
import { Alert, Snackbar, Typography, Modal, Box } from "@mui/material";
import { Button } from "primereact/button";
import { useContract, useSigner } from "wagmi";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
import axios from "axios";
import { LayoutContext } from "../layout/context/layoutcontext";
import LayoutDashbord from "../Components/LayoutDashbord";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const InstaGenAddress = process.env.NEXT_PUBLIC_INSTAGEN_ADDRESS;
export default function CreateInstagenNft() {
  const { data: signerData } = useSigner();
  const [toggle, setToggle] = useState(false);
  const [toggleinput, setToggleInput] = useState(false);
  const [auctionToggle, setAuctionToggle] = useState(false);
  const [show, setShow] = useState(false);
  const handleClos = () => setShow(false);
  const handleShow = () => setShow(true);
  const [contractInstagenAddress, setContarctInstagenAddress] = useState([]);
  const [model, setmodel] = useState(false);
  const [modelmsg, setmodelmsg] = useState("Transaction in progress!");
  const { layoutConfig } = useContext(LayoutContext);

  const [formInput, updateFormInput] = useState({
    price: 0,
    name: "",
    description: "",
    alternettext: "",
    royalties: 5,
    auctionTime: 2,
  });
  const buyTokens = useContract({
    addressOrName: InstaGenAddress,
    contractInterface: InstaGen.abi,
    signerOrProvider: signerData,
  });


  useEffect(() => {
    getAllContarctData();
   
  }, []);
  const getAllContarctData = () => {
    const token = localStorage.getItem("platform_token");
    axios
      .get(`${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        if (response?.data?.contractName ==='Instagen') {
            setContarctInstagenAddress(response.data.contractAddress)
        }
      })
      .catch((error) => {
        console.log("error while get contract data", error);
      })
     
  };

  
  function createMarket(e) {
    e.preventDefault();
    e.stopPropagation();
    const { name, description, price, alternettext, auctionTime } = formInput;
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
      alternettext,
      auctionTime,
    };
    setmodelmsg("Transaction 1 in  progress");
    setmodel(true);
    createItem();
  }

  async function createItem() {
    const price = formInput.price
    try {
        const tx = await buyTokens.mint(price, { gasLimit: "2099999" });
        tx.wait().then(async (transaction) => {
          console.log('response in instagen nft',transaction)
        });
      } catch (error) {
      console.log('error while instagen mint nft',error)
      } 
      setmodelmsg("Transaction 1 is  fail");
      setmodel(false);
  }

  
  const [attributes, setInputFields] = useState([
    { id: uuidv4(), display_type: "", trait_type: "", value: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = attributes.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...attributes,
      { id: uuidv4(), display_type: "", trait_type: "", value: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...attributes];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  

  return (
    <LayoutDashbord title="Assets" description="This is used to create NFTs">
      <div 
      className={`${layoutConfig.colorScheme === 'light' ? 'body-back back-image-sig-nft' : 'dark'}`}
      >
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
            <div className="effective-nft-color">Effective Efficient Easy Way To create NFT</div>
          </div>
          <div className="flex justify-content-evenly mt-5">
            <div>
              <h3 className="text-3xl py-4 font-bold text-center">
                Create New InstaGen NFT
              </h3>
            </div>
          </div>
          <div className="border-bottom-das"></div>

          <div
            className="flex justify-content-center text-white"
            style={{ gap: "50px" }}
          >
            <div className="p-5">
              <div style={{ width: "500px" }}>
                <div>
                  <div className="mt-5">
                    <div style={{ textAlign: "initial" }}>
                      InstaGen Assets Name
                    </div>
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
                        {" "}
                        InstaGen Assets Description
                      </div>

                      <textarea
                        type="text"
                        placeholder="Asset Description"
                        className="w-full assets-input-back p-3 mt-3 text-white"
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mt-5" style={{ textAlign: "initial" }}>
                      Creator Royalties
                      <span className="text-gray-400 text-gray-500 dark:text-white">
                        *
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formInput.royalties} // value * 100
                      suffix="%"
                      mode="decimal"
                      className="mt-2 p-3 w-full assets-input-back text-white "
                      showButtons
                      onChange={(e) => {
                        updateFormInput({
                          ...formInput,
                          royalties: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="w-full py-3">
                  <div className="flex justify-content-between">
                    <div>
                      <div className="text-lg font-bold mt-6">Properties</div>
                    </div>
                    <Button
                      onClick={handleShow}
                      label=""
                      severity="info"
                      className="mt-7   h-10 p-1.5 cursor-pointer buy-img"
                    >
                      Add Properties
                    </Button>

                    <Modal
                      open={show}
                      onClose={handleClos}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <div
                        sx={style}
                        className="text-center bg-black border-[1px] bg-white dark:bg-[#13131a] dark:border-[#bf2180] border-[#eff1f6] p-5 add-properties"
                      >
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          className="text-center "
                        >
                          <div className="flex justify-content-between ">
                            <div>Add Properties</div>
                            <div>
                              <i
                                onClose={handleClos}
                                className="pi pi-times"
                              ></i>
                            </div>
                          </div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div className="text-gray-500 dark:text-white">
                            Properties Show Up Underneath Your Item, are
                            Clickable, and Can be Filtered in Your
                            Collection&apos;s Sidebar.
                          </div>
                          <div className="flex justify-content-between ">
                            <div className="font-bold">Type</div>
                            <div className="font-bold">Name</div>
                          </div>
                          <form onSubmit={handleSubmit}>
                            {attributes.map((inputField) => (
                              <div key={inputField.id}>
                                <div className="flex  align-center gap-5">
                                  <input
                                    name="display_type"
                                    label="First Name"
                                    placeholder="Display type"
                                    className="mt-2 p-3 w-full text-sm input_background outline-none rounded-md "
                                    variant="filled"
                                    value={inputField.display_type}
                                    onChange={(event) =>
                                      handleChangeInput(inputField.id, event)
                                    }
                                  />
                                  <input
                                    name="trait_type"
                                    label="Last Name"
                                    placeholder="Trait type"
                                    className="mt-2 p-3 w-full text-sm input_background outline-none rounded-md  "
                                    variant="filled"
                                    value={inputField.trait_type}
                                    onChange={(event) =>
                                      handleChangeInput(inputField.id, event)
                                    }
                                  />
                                  <input
                                    name="value"
                                    type="number"
                                    label="First Name"
                                    placeholder="Value"
                                    className="mt-2 p-3 w-full text-sm input_background outline-none rounded-md  "
                                    variant="filled"
                                    value={inputField.value}
                                    onChange={(event) =>
                                      handleChangeInput(inputField.id, event)
                                    }
                                  />
                                  <div>
                                    <button
                                      disabled={attributes.length === 1}
                                      onClick={() =>
                                        handleRemoveFields(inputField.id)
                                      }
                                      dark
                                      className="text-left mt-5 p-2.5 rounded-lg  bg-slate-300  flex justify-content-center"
                                    >
                                      <FaMinusSquare className="text-red-600" />
                                    </button>
                                  </div>

                                  <div>
                                    <button
                                      className="text-left mt-5 p-2.5 rounded-lg  bg-slate-300  flex justify-content-center"
                                      onClick={handleAddFields}
                                    >
                                      <FaPlusSquare className="text-green-600" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </form>
                        </Typography>
                        <div className="mt-5" onClick={handleSubmit}>
                          <Button className="buy-img">Save</Button>
                        </div>

                      </div>
                    </Modal>
                  </div>
                  <div className="flex mt-5">
                    <div style={{ alignItems: "initial" }}>
                      Alternative Text for NFT(Optipnal)
                    </div>
                  </div>
                  <input
                    placeholder="NFT description in details"
                    className="mt-2 p-3 w-full assets-input-back  "
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        alternettext: e.target.value,
                      })
                    }
                  />

                  
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
                      className="flex mt-3 gap-6 border-[1px] border-[#d5d5d6] rounded-xl p-3"
                      onClick={() => {
                        setAuctionToggle(false);
                        setToggleInput(!toggleinput);
                      }}
                    >
                      {" "}
                      Direct Sale
                    </div>
                    <div
                      className="flex mt-3 gap-6 border-[1px] border-[#d5d5d6] rounded-xl p-3"
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
                      className="w-full p-2 assets-input-back"
                      placeholder="Asset Price in Matic text-white"
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
                    <Button   className="buy-img"onClick={(e) => createMarket(e)}>
                      Create InstaGen NFTs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
