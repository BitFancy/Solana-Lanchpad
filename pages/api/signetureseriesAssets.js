import axios from "axios";
export const getAllSignetureseriesNfts = async (props) => {
  console.log(props);
  const { endPoint } = props;
  const headers = {
    "Content-Type": "application/json",
  };
  const AllBuildingQuery = `{
      signatureSeriesAssetCreateds(orderBy: id) {
        id
        transactionHash
        blockNumber
        tokenID
        metaDataURI
        creator
        }
      }
    `;
  const graphqlQuery = {
    operationName: "signatureSeriesAssetCreateds",
    query: `query signatureSeriesAssetCreateds ${AllBuildingQuery}`,
    variables: {},
  };

  try {
    const { data } = await axios({
      url: endPoint,
      method: "post",
      data: graphqlQuery,
      headers: headers,
    });
    return data?.data;
  } catch (err) {
    console.log("error", err);
  }
};
