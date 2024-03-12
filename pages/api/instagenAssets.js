import axios from "axios";
export const getAllInstagenNfts = async (props) => {
  console.log(props);
  const { endPoint } = props;
  const headers = {
    "Content-Type": "application/json",
  };
  const AllBuildingQuery = `{
    instaGenAssetCreateds(orderBy: id) {
    id
    transactionHash
    blockNumber
    tokenID
    metadataUri
    }
  }
`;
  const graphqlQuery = {
    operationName: "instaGenAssetCreateds",
    query: `query instaGenAssetCreateds ${AllBuildingQuery}`,
    variables: {},
  };

  try {
    const { data } = await axios({
      url: endPoint,
      method: "post",
      data: graphqlQuery,
      headers: headers,
    });
    console.log("Response", data);
    return data?.data;
  } catch (err) {
    console.log("error", err);
  }
};
