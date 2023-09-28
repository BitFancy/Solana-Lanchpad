
import axios from "axios";
 const handler=async(req, res)=> {
    const endPoint = "http://3.15.54.199:8000/subgraphs/name/v1/sdssss";
    const headers = {
      "Content-Type": "application/json",
    };
    const AllBuildingQuery = `{
      fusionSeriesAssetCreateds() {
        id
        creator
        metaDataURI
        transactionHash
        blockNumber
        tokenID
        }
      }
    `
      ;
    const graphqlQuery = {
      operationName: "fusionSeriesAssetCreateds",
      query:`query fusionSeriesAssetCreateds ${AllBuildingQuery}`,
      variables: {},
    };
  
    try {
      const response = await axios({
        url: endPoint,
        method: "post",
        data: graphqlQuery,
        headers: headers,
      });
      res.status(200).json(response.data.data);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log('error',err)
    }
}
export default handler