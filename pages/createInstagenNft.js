import { useEffect, useState,useRef } from "react";
import { useRouter } from "next/router";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Multiselect from "multiselect-react-dropdown";
import { InputNumber } from "primereact/inputnumber";
import Tradhub from "../artifacts/contracts/tradehub/TradeHub.sol/TradeHub.json";
import Inatagen from "../artifacts/contracts/instagen/InstaGen.sol/InstaGen.json";
import AccessMaster from "../artifacts/contracts/accessmaster/AccessMaster.sol/AccessMaster.json";
import BuyAsset from "../Components/buyAssetModal";
import { Alert, Snackbar, Typography, Modal, Box } from "@mui/material";
import Layout from "../Components/Layout";
import { Button } from "primereact/button";
import { useAccount, useContract, useEnsName, useSigner } from "wagmi";
import { Messages } from "primereact/messages";

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
const tradhubAddress = process.env.NEXT_PUBLIC_TRADEHUB_ADDRESS;
const InstaGenAddress = process.env.NEXT_PUBLIC_INSTAGEN_ADDRESS;
const AccessMasterAddress = process.env.NEXT_PUBLIC_FLOW_ACCESS_Master_ADDRESS;

export default function CreateInstagenNft() {
  const msgs = useRef(null);
  const { data: signerData } = useSigner();
  console.log("signer data", signerData);
  const [toggle, setToggle] = useState(false);
  const [toggleinput, setToggleInput] = useState(false);
  const [auctionToggle, setAuctionToggle] = useState(false);
  const [show, setShow] = useState(false);
  const handleClos = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const router = useRouter();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const instagenContarct = useContract({
    addressOrName: InstaGenAddress,
    contractInterface: Inatagen.abi,
    signerOrProvider: signerData,
  });
  const tradhubContract = useContract({
    addressOrName: tradhubAddress,
    contractInterface: Tradhub.abi,
    signerOrProvider: signerData,
  });

  const accessMasterContarct = useContract({
    addressOrName: AccessMasterAddress,
    contractInterface: AccessMaster.abi,
    signerOrProvider: signerData,
  });

  const mintInstagen = async () => {
    try {
      const transaction = await instagenContarct.mint(1, {
        gasLimit: "2099999",
      });
      // let tx = await transaction.wait();
      console.log("transaction", transaction);
      setmodelmsg("Transaction 1 Complete");
    } catch (e) {
      console.log(e);
      setmodelmsg("Transaction 1 failed");
      return;
    }
  };
 
  async function createMarket(e) {
    //store
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
      attributes,
      categories,
      tags,
      auctionTime,
    };

    setmodelmsg("Transaction 1 in  progress");
    setmodel(true);
    const data = JSON.stringify({ ...assetData });
    console.log("Asset Data before create", data);
    try {
      let transaction = await mintInstagen();
      console.log("transactin 1 ", transaction);
    } catch (error) {
      setmodelmsg("Transaction failed");
      console.log("Error uploading file: ", error);
    }
  }
  const [attributes, setInputFields] = useState([
    { id: uuidv4(), display_type: "", trait_type: "", value: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("attributes", attributes);
    msgs.current.show([
      {
        sticky: true,
        severity: "success",
        detail: "Your Trad Details Added Successfully",
        closable: true,
      },
    ]);
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
  const [options1, setOptions] = useState([
    "Image",
    "Music",
    "Video",
    "Document",
    "Others",
  ]);
  const [options2, setOptions2] = useState([
    "colection of special tags",
    " “lo-fi hip hop”, “texas blues”, “guitar shredding”, “solo piano”, “relaxing music” ",
    "Your video's title, thumbnail, and description are more important pieces of metadata for your video's discovery.",
    "document tags are integrated into text document and they are actually a set of directions which directs a browser what to do and what props to use.",
    "Others",
  ]);
  const [categories, setCategory] = useState([]);
  const [tags, setTags] = useState([])
  return (
    <Layout title="Assets" description="This is used to create NFTs">
      <div className="body-back back-image-instagen-nft">
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
                Create New InstaGen NFT
              </h3>
            </div>
          </div>
          <div className="flex justify-content-center text-white" style={{ gap: "50px" }}>
            <div className="p-5">
              <div style={{ width: "500px" }}>
                <div>
                  <div className="mt-5">
                    <div style={{ textAlign: "initial" }}>InstaGen Assets Name</div>
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
                      InstaGen Assets Description
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

                <div className="w-full py-3">
                  <div className="flex justify-content-between">
                    <div>
                      <div className="text-lg font-bold mt-6">Properties</div>
                    </div>
                    <Button
                      onClick={handleShow}
                      label=""
                      severity="info"
                      className="mt-7   h-10 p-1.5 cursor-pointer "
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
                        className="text-center bg-black border-[1px] bg-white dark:bg-[#13131a] dark:border-[#bf2180] border-[#eff1f6] p-5 add-properties mt-5"
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
                          <div className="flex justify-content-between">
                            <div className="font-bold">Type</div>
                            <div className="font-bold">Name</div>
                          </div>
                          <form onSubmit={handleSubmit}>
                            {attributes.map((inputField) => (
                              <div key={inputField.id}>
                                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 pb-2  align-center gap-5">
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
                          <Button>Save</Button>
                          <Messages ref={msgs} />

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
                    className="mt-3 p-3 w-full assets-input-back text-white "
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        alternettext: e.target.value,
                      })
                    }
                  />

                  <div className="mt-5 flex">
                    <div style={{ alignItems: "initial" }}>Category</div>
                  </div>
                  <Multiselect
                    isObject={false}
                    onRemove={(event) => {
                      setCategory(event);
                    }}
                    onSelect={(event) => {
                      setCategory(event);
                    }}
                    options={options1}
                    selectedValues={[]}
                    showCheckbox
                    className="assets-input-back mt-3 text-white"
                  />
                </div>
                <div className="mt-3 flex">
                  <div style={{ alignItems: "initial" }}>Tags</div>
                </div>
                <Multiselect
                  isObject={false}
                  onRemove={(event) => {
                    setTags(event);
                  }}
                  onSelect={(event) => {
                    setTags(event);
                  }}
                  options={options2}
                  selectedValues={[]}
                  showCheckbox
                  className="assets-input-back mt-3 text-white"
                />
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
                      Create Inatagen NFTs
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