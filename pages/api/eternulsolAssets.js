import axios from "axios";

export const getAllEternulsolNfts = async (props) => {
  console.log(props);
  const { endPoint } = props;
  const headers = {
    "Content-Type": "application/json",
  };
  const AllBuildingQuery = `{
      assetIssueds(orderBy: id) {
        id
        transactionHash
        blockNumber
        tokenID
        metaDataURI
        }
      }
    `;
  const graphqlQuery = {
    operationName: "assetIssueds",
    query: `query assetIssueds ${AllBuildingQuery}`,
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
