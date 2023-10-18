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
    <div>
      <div>
        <div className="flex gap-5 mt-5">
          <div>
            <img
              alt="home-img"
              className="dash-img-size w-96 h-96"
              src={`https://cloudflare-ipfs.com/ipfs/${removePrefix(preuri)}`}
            ></img>
          </div>
          <div>
            <div className="flex mt-5 gap-5">
              <div className="font-bold text-xl">Asset Name: </div>
              <div className="text-xl"> {response.name}</div>
            </div>
            

            <div className="flex mt-5 gap-5">
              <div className=" text-xl">Description:</div>
              <div className="text-xl">{response.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homecomp;
