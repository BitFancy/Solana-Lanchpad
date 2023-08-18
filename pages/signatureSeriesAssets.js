import { useRef, useState } from "react";
import  { useRouter } from "next/router";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Multiselect from "multiselect-react-dropdown";
import { Messages } from "primereact/messages";
import { InputNumber } from "primereact/inputnumber";
const YOUR_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw";
const client = new NFTStorage({ token: YOUR_API_KEY });
import Tradhub from "../artifacts/contracts/tradehub/TradeHub.sol/TradeHub.json";
import SignatureSeries from "../artifacts/contracts/signatureseries/SignatureSeries.sol/SignatureSeries.json";
import AccessMaster from "../artifacts/contracts/accessmaster/AccessMaster.sol/AccessMaster.json";
import BuyAsset from "../Components/buyAssetModal";
import { Alert, Snackbar, Typography, Modal } from "@mui/material";
import Layout from "../Components/Layout";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { NFTStorage } from "nft.storage";
import Image from "next/image";
import { Button } from "primereact/button";
import { useContract, useSigner } from "wagmi";

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
const signatureSeriesAddress = process.env.NEXT_PUBLIC_SIGNATURESERIES_ADDRESS;
const AccessMasterAddress = process.env.NEXT_PUBLIC_FLOW_ACCESS_Master_ADDRESS;

export default function CreateItem() {
  const msgs = useRef(null);

  const { data: signerData } = useSigner();

  const [toggle, setToggle] = useState(false);
  const [toggleinput, setToggleInput] = useState(false);
  const [auctionToggle, setAuctionToggle] = useState(false);
  const [show, setShow] = useState(false);
  const handleClos = () => setShow(false);
  const handleShow = () => setShow(true);
  const [model, setmodel] = useState(false);
  const [modelmsg, setmodelmsg] = useState("Transaction in progress!");
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [mediaHash, setMediaHash] = useState({
    image: "",
    audio: "",
    video: "",
    animation_url: "",
    doctype: "",
  });
  const [previewMedia, setpreviewMedia] = useState("");
  const [addImage, setAddImage] = useState(false);
  const [formInput, updateFormInput] = useState({
    price: 0,
    name: "",
    description: "",
    alternettext: "",
    royalties: 5,
    auctionTime: 2,
  });

  const router = useRouter();
  async function uploadBlobGetHash(file) {
    try {
      const blobDataImage = new Blob([file]);
      const metaHash = await client.storeBlob(blobDataImage);
      return metaHash;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  const getMetaHashURI = (metaHash) => `ipfs://${metaHash}`;
  async function onChangeThumbnail(e) {
    const file = e.target.files[0];
    const thumbnail = new File([file], file.name, {
      type: file.type,
    });
    try {
      const metaHash = await uploadBlobGetHash(thumbnail);
      const metaHashURI = getMetaHashURI(metaHash);
      setMediaHash({ ...mediaHash, image: metaHashURI });
      setPreviewThumbnail(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function onChangeMediaType(e) {
    const file = e.target.files[0];
    const { name, type } = file;
    const fileType = type.split("/")[0];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    const fileData = new File([file], name, {
      type: type,
    });
    if (addImage && fileType == "image") {
      setAddImage(false);
    }
    if (!validImageTypes.includes(type)) {
      setAddImage(true);
    }
    try {
      const metaHash = await uploadBlobGetHash(fileData);
      const metaHashURI = getMetaHashURI(metaHash);
      if (fileType == "audio" || fileType == "video" || fileType == "doctype") {
        setMediaHash({
          ...mediaHash,
          [fileType]: metaHashURI,
          animation_url: metaHashURI,
        });
      } else {
        setMediaHash({ ...mediaHash, [fileType]: metaHashURI });
      }
      console.log("file data", fileData);
      setpreviewMedia(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.log("Error uploading vedio: ", error);
    }
  }
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
      attributes,
      categories,
      tags,
      auctionTime,
    };

    if (!mediaHash?.image) {
      setAlertMsg("Image is required to create asset");
      setOpen(true);
      return;
    }
    setmodelmsg("Transaction 1 in  progress");
    setmodel(true);
    const data = JSON.stringify({ ...assetData, ...mediaHash });
    console.log("Asset Data before create", data);
    console.log("auction time", assetData, data, assetData.auctionTime);
    const blobData = new Blob([data]);
    try {
      client.storeBlob(blobData).then(async (metaHash) => {
        const ipfsHash = metaHash;
        const url = `ipfs://${metaHash}`;
        console.log("doc ipfs", ipfsHash, url);
        await createItem(ipfsHash, url);
      });
    } catch (error) {
      setmodelmsg("Transaction failed");
      console.log("Error uploading file: ", error);
    }finally{
      
    }
  }

  const signatureSeriesContract = useContract({
    addressOrName: signatureSeriesAddress,
    contractInterface: SignatureSeries.abi,
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

  async function createItem(ipfsHash, url) {
    console.log("ipfs://" + ipfsHash);
    try {
      console.log("assets crete ", url, formInput.royalties * 100);
      let transaction = await signatureSeriesContract.createAsset( 
        url,
        formInput.royalties * 100,
        { gasLimit: "2099999" }
      ); //500 - royalites dynamic
      let tx = await transaction.wait();
      console.log("transaction", transaction);
      setmodelmsg("Transaction 1 Complete");
      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();
      const price = 1;
      const forAuction = false,
        endTime = 0;

      await listItem(tokenId, price, forAuction, endTime); //Putting item to sale
    } catch (e) {
      console.log(e);
      setmodelmsg("Transaction 1 failed");
      return;
    }
    /* then list the item for sale on the marketplace */
    // router.push("/explore");
  }
  const listItem = async (tokenId, price, forAuction, endTime) => {
    try {
      setmodelmsg("Transaction 2 in progress");
      const transaction = await tradhubContract.listItem(
        signatureSeriesAddress,
        tokenId,
        price,
        1,
        forAuction,
        endTime,
        { gasLimit: "2099999" }
      );
      // await transaction.wait();
      console.log("transaction completed", transaction);
      router.push('/createInstagenNft')
      setmodelmsg("Transaction 2 Complete !!");
    } catch (e) {
      console.log(e);
      setmodelmsg("Transaction 2 failed");
    } finally {
      setpreviewMedia("");
      setAddImage("");
      setPreviewThumbnail("");
    }
  };
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

  const walletAddr = useSelector(selectUser);
  var wallet = walletAddr ? walletAddr[0] : "";

  const [hasRole, setHasRole] = useState(false);

  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const hasCreatorRole = await accessMasterContarct.hasRole(
  //       await accessMasterContarct.FLOW_CREATOR_ROLE(),
  //       address
  //     );
  //     console.log("hasCreatorRole", hasCreatorRole);
  //     if (hasCreatorRole) {
  //       router.push("/assets");
  //     } else {
  //       router.push("/notSubscribe");
  //     }
  //   };
  //   asyncFn();
  // }, []);

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
  const [tags, setTags] = useState([]);

  // if (!hasRole) {
  //    setTimeout(() => {
  //     router.push("/profile");
  //   }, 1000);
  // }

  return (
    <Layout title="Assets" description="This is used to create NFTs">
      <div className="body-back back-image-sig-nft">
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
                Create New SignatureSeries NFTs
              </h3>
            </div>
            <div className="text-3xl py-4 font-bold text-center">preview</div>
          </div>

          <div className="flex justify-content-center text-white" style={{ gap: "50px" }}>
            <div className="p-5 overflow-y-scroll ...">
              <div style={{ width: "500px" }}>
                <div>
                  <div className="mt-5">
                    <div style={{ textAlign: "initial" }}>
                      {" "}
                      SignatureSeries Assets Name
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
                        SignatureSeries Assets Description
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
                      className="mt-2 p-3 w-full assets-input-back text-white"
                      showButtons
                      onChange={(e) => {
                        updateFormInput({
                          ...formInput,
                          royalties: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex">
                    <div className="mt-5" style={{ textAlign: "initial" }}>
                      Upload File
                    </div>
                  </div>
                  <div className="flex gap-6 mt-3">
                    <div className=" rounded-lg text-center p-3 border-2 border-indigo-600 ...mt-20 text-white-500 w-full">
                      <h1 className="text-lg font-semibold">
                        Drag File Here to Upload
                      </h1>
                      <div className="text-white">
                        PNG,GIF,WEBP,MP4,or MP3
                        <br />
                        <div className="flex text-black mt-3 cursor-pointer rounded-lg bg-slate-300 p-2.5 m-auto w-full">
                          <input
                            type="file"
                            accept="image/png, image/jpeg,.txt,.doc,video/mp4,audio/mpeg,.pdf"
                            onChange={(e) => onChangeMediaType(e)}
                            className="assets-input-back text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {addImage && (
                    <>
                      <div className="flex justify-content-between">
                        <div className="font-bold  mt-5 text-left text-gray-500 dark:text-white">
                          Upload Preview Image
                        </div>
                        <div className="font-bold  mt-5 text-left text-gray-500 dark:text-white">
                          Priview
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="   rounded-xl border-dashed border-2 border-indigo-600 ... text-center p-3 w-96 ... mt-3">
                          <h1 className="text-lg font-semibold text-gray-500 dark:text-white">
                            Drag File Here to Upload
                          </h1>
                          <div className="text-gray-500 dark:text-white">
                            PNG, JPG, or GIF
                            <br />
                            <div className=" text-black mt-3 cursor-pointer rounded-xl p-2.5 m-auto w-full bg-slate-300">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => onChangeThumbnail(e)}
                                className="assets-input-back text-white"
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
                          <Button>Save</Button>
                        </div>
                        <Messages ref={msgs} />

                        {/* </Box> */}
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
                    className="mt-2 p-3 w-full assets-input-back  text-white"
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
                    className="assets-input-back mt-3"
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
                  className="assets-input-back mt-3"
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
                    <Button onClick={(e) => createMarket(e)}>
                      Create SignatureSeries NFTs
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className=" rounded-lg text-center p-3 border-2 border-indigo-600 ..."
              style={{ height: "500px", width: "250px", marginTop: "80px" }}
            >
              <div className="flex text-black mt-3 cursor-pointer rounded-lg  p-2.5 m-auto w-full">
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
    </Layout>
  );
}
