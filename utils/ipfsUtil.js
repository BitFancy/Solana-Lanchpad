import axios from "axios";

export const removePrefix = (uri) => {
  return uri.substring(7, uri.length);
};

export const getMetaData = async (uri) => {
  try {
    const parsedURI = removePrefix(uri);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}${parsedURI}`
    );
    return data;
  } catch (error) {
    alert("Error While get metadata Info", error)
  }
};
