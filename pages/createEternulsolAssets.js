import { useContext, useEffect, useRef, useState } from "react";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { InputNumber } from "primereact/inputnumber";
import EternalSoul from "../artifacts/contracts/eternalsoul/EternalSoul.sol/EternalSoul.json";
import BuyAsset from "../Components/buyAssetModal";
import { Alert, Snackbar, Typography, Modal, Box } from "@mui/material";
import { Button } from "primereact/button";
import { useContract, useSigner } from "wagmi";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
import axios from "axios";
import { LayoutContext } from "../layout/context/layoutcontext";
import { ethers } from "ethers";
import LayoutDashbord from "../Components/LayoutDashbord";
import { Dropdown } from "primereact/dropdown";
import { Messages } from "primereact/messages";
import Multiselect from "multiselect-react-dropdown";
import Image from "next/image";
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
const EternulsoleContractAddress = process.env.NEXT_PUBLIC_ETERNUMPASS_ADDRESS;
export default function CreateEternumpassNft() {
  const msgs = useRef(null);
  const { data: signerData } = useSigner();
  const [toggle, setToggle] = useState(false);
  const [toggleinput, setToggleInput] = useState(false);
  const [auctionToggle, setAuctionToggle] = useState(false);
  const [show, setShow] = useState(false);
  const handleClos = () => setShow(false);
  const handleShow = () => setShow(true);
  const [contractEternulsoleAddress, setContarctEternulsoleAddress] = useState([]);
  const [model, setmodel] = useState(false);
  const [modelmsg, setmodelmsg] = useState("Transaction in progress!");
  const { layoutConfig } = useContext(LayoutContext);
  const [selecteBlockchaine, setselectedBlockchaine] = useState(null);
  const [addImage, setAddImage] = useState(false);
  const [previewMedia, setpreviewMedia] = useState("");

  const blockchain = [
    { name: "Polygon", value: "Polygon" },
    { name: "Ethereum", value: "Ethereum" },
  ];

  const [formInput, updateFormInput] = useState({
    price: 0,
    name: "",
    description: "",
    alternettext: "",
    royalties: 5,
    auctionTime: 2,
  });
  const buyTokens = useContract({
    addressOrName: EternulsoleContractAddress,
    contractInterface: EternalSoul.abi,
    signerOrProvider: signerData,
  });


  
  function createMarket(e) {
    e.preventDefault();
    e.stopPropagation();
    const { name, description, price, alternettext, auctionTime } = formInput;
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
    const price = ethers.utils.parseUnits(formInput.price, "ether");
        try {
          const tx = await buyTokens.issue(price);
          //metadataURI input
          tx.wait().then(async (transaction) => {
            console.log('response while eturnulsole nft creation',transaction)
          });
        } catch (error) {
            console.log('error while eturnulsole nft creation',error)
        } 
        setmodelmsg("Transaction 1 is  failed");
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
  return (
    <LayoutDashbord
    title="Create EternalSoul Assets"
    description="This is used to create EternalSoul Nfts"
    
  >
    <div
      className={`${
        layoutConfig.colorScheme === "light"
          ? "body-back back-image-sig-nft"
          : "dark"
      }`}
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

        <div className="effective-nft-color font-bold text-5xl">
          Effective Efficient Easy
        </div>

        <div className="flex mt-5" style={{ marginLeft: "230px" }}>
          <div className="text-5xl font-bold text-center">Create New NFT</div>
        </div>
        <div className="border-bottom-das"></div>
        <div
          className="flex justify-content-center p-heading"
          style={{ gap: "50px" }}
        >
          <div className="p-5">
            <div style={{ width: "700px" }}>
              <div>
                <div className="flex justify-content-between">
                <div className="font-bold text-4xl text-left">
                EternalSoul  &gt;  EternalSoul 1
                </div>
              
                <div style={{width:'225px'}}>
                <Dropdown
              value={selecteBlockchaine}
              onChange={(e) => setselectedBlockchaine(e.value)}
              options={blockchain}
              optionLabel="name"
              placeholder="Chains "
              className="w-full font-bold"
              style={{borderRadius:'5px'}}
            />
                </div>
                </div>
                <div style={{marginTop:'65px'}}>
                  <div className="font-bold text-left">
                  EternalSoul Assets Name
                  </div>
                  <div>
                    <input
                      required="required"
                      placeholder="Asset Name"
                      className="w-full mt-3 p-3 assets-input-back "
                      onChange={(e) =>
                        updateFormInput({
                          ...formInput,
                          name: e.target.value,
                        })
                      }
                      style={{ borderRadius: "5px", border: "none" }}
                    />
                  </div>

                  <div className="mt-5">
                    <div className="font-bold text-left">
                    EternalSoul Assets Description
                    </div>
                    <div>
                      <textarea
                        type="text"
                        placeholder="Asset Description"
                        className="w-full assets-input-back p-3  mt-3"
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            description: e.target.value,
                          })
                        }
                        style={{ borderRadius: "5px", border: "none" }}
                      />
                    </div>
                  </div>
                  <div className="mt-5 font-bold text-left" >
                    Royalties
                    <span className="text-gray-400 text-gray-500 ml-2">
                      *
                    </span>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={formInput.royalties} // value * 100
                      suffix="%"
                      mode="decimal"
                      className="mt-2 p-3 w-full assets-input-back "
                      showButtons
                      onChange={(e) => {
                        updateFormInput({
                          ...formInput,
                          royalties: e.target.value,
                        });
                      }}
                      style={{ borderRadius: "5px", border: "none" }}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="mt-5 font-bold text-left">
                    Upload File
                  </div>
                </div>
                <div className="flex gap-6 mt-3">
                  <div
                    className=" rounded-lg text-center p-3  ...mt-20  w-full"
                    style={{ borderStyle: "dashed" }}
                  >
                    <h1 className="text-lg font-semibold">
                      Drag File Here to Upload PNG,GIF,WEBP,MP4,or MP3
                    </h1>
                    <div>
                      <br />
                      <div className="flex text-black mt-3 cursor-pointer rounded-lg bg-slate-300 p-2.5 m-auto w-full">
                        <input
                          type="file"
                          accept="image/png, image/jpeg,.txt,.doc,video/mp4,audio/mpeg,.pdf"
                          onChange={(e) => onChangeMediaType(e)}
                          className="assets-input-back "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {addImage && (
                  <>
                    <div className="flex justify-content-between">
                      <div className="font-bold  mt-5 text-left text-gray-500 ">
                        Upload Preview Image
                      </div>
                      <div className="font-bold  mt-5 text-left text-gray-500 ">
                        Priview
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="   rounded-xl border-dashed border-2 border-indigo-600 ... text-center p-3 w-96 ... mt-3">
                        <h1 className="text-lg font-semibold text-gray-500 ">
                          Drag File Here to Upload
                        </h1>
                        <div className="text-gray-500 ">
                          PNG, JPG, or GIF
                          <br />
                          <div className=" text-black mt-3 cursor-pointer rounded-xl p-2.5 m-auto w-full bg-slate-300">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => onChangeThumbnail(e)}
                              className="assets-input-back "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="   rounded-xl border-dashed border-2 border-indigo-600 ... text-center p-3 w-96 ... mt-3">
                        <div className="text-[#6a6b76]">
                          <div className=" text-black mt-3 cursor-pointer rounded-xl p-2.5 m-auto w-full ">
                            {previewThumbnail && (
                              <Image
                                alt="alt"
                                width="200"
                                height="200"
                                src={previewThumbnail}
                              />
                            )}
                            <div />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="w-full py-3">
                <div className="flex justify-content-between ">
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
                        <div className="text-gray-500 ">
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
                      <Messages ref={msgs} />

                    </div>
                  </Modal>
                </div>
                <div className="flex mt-5 font-bold">
                  <div className="text-left" >
                    NFT description in detail
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
                  style={{ borderRadius: "5px", border: "none" }}
                />
              </div>
              <div className="mt-5 flex justify-content-between font-bold">
                <div  >Category</div>
                <div >Tags</div>
              </div>
              <div className="flex justify-content-between">
                <div style={{width:'300px'}}>
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
                    className="assets-input-back mt-3"
                  />
                </div>
                <div style={{width:'300px'}}>
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
                    className="assets-input-back mt-3"
                  />
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
                    className="w-full p-2 assets-input-back "
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
                    className="w-full p-2 assets-input-back "
                    placeholder="Asset Price in Matic"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        price: e.target.value,
                      })
                    }
                  />

                  <InputNumber
                    className="w-full p-2 assets-input-back"
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
                    min={0}
                    max={100}
                  />
                </div>
              )}

              <div className="flex justify-content-between p-5 mt-5">
                <div>
                  <Button
                    className="buy-img"
                    onClick={(e) => createMarket(e)}
                  >
                    Create EternalSoul NFTs
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            className=" rounded-lg text-center p-3" style={{marginTop:'125px'}}
          >
            <div className="font-bold">Preview</div>
            <div className="flex text-black mt-3 cursor-pointer rounded-lg  p-2.5 m-auto border-2 border-indigo-600 ..."
                          style={{ height: "500px", width: "300px", marginTop: "80px" }}

            >
              {previewMedia ? (
                mediaHash?.image && addImage == false ? (
                  <Image
                    src={previewMedia}
                    alt="assets2"
                    className="w-full object-cover h-72 flex justify-content-center"
                    width="200"
                    height="200"
                  />
                ) : mediaHash?.video ? (
                  <video autoPlay controls>
                    <source src={previewMedia}></source>
                  </video>
                ) : mediaHash?.audio ? (
                  <audio autoPlay controls>
                    <source src={previewMedia}></source>
                  </audio>
                ) : mediaHash?.doctype ? (
                  <input file={previewMedia} alt="" />
                ) : null
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutDashbord>
  );
}
