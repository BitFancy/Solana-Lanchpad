import React, { useEffect, useState } from "react";
import axios from "axios";
const Homecomp = ({ uri }) => {
  const [response, setResponse] = useState([]);
  const [image, setImage] = useState("");
  const removePrefix = (uri) => {
    return uri.substring(7, uri.length);
  };
  const metadata = async () => {
    try {
      const parsedURI = removePrefix(uri);
      const { data } = await axios.get(
        `https://cloudflare-ipfs.com/ipfs/${parsedURI}`
      );
      setResponse(data);
      if (data.image.length > 1) setImage(data.image);
      else setImage(data.thumbnailimage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    metadata();
  }, [uri]);

  let preuri = image;

  return (
    <div
    className="p-3 gap-5 back-contract mt-5"
    style={{
      marginBottom: "0px",
      width: "100%",
      height: "350px",
      borderRadius: "20px",
    }}
  >      <img
        src={`https://cloudflare-ipfs.com/ipfs/${removePrefix(preuri)}`}
        alt="home-img"
        className=" w-full object-fit rounded-lg mb-3  dash-img-size text-center" style={{height:'200px',width:'200px'}}
      />
        <div className="flex justify-content-between font-bold">
        <div>Name</div>
        <div>Description</div>
        </div>
        <div className="flex justify-content-between mt-3 font-bold">

        <div style={{ color: "black" }}>{response.name}</div>
        <div style={{ color: "black" }}>{response.description}</div>
      </div>
    
    </div>
  );
};

export default Homecomp;
