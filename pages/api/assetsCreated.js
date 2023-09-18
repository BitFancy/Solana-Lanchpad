
import axios from "axios";
 const handler=async(req, res)=> {
    const endPoint = "http://18.119.142.140:8000/subgraphs/name/kek";
    
    const headers = {
      "Content-Type": "application/json",
    };
    const AllBuildingQuery = `{
        assetCreateds(orderBy: id) {
            id
            tokenID
            creator
            blockNumber
            blockTimestamp
            metaDataURI
            transactionHash
        }
      }
    `
      ;
    const graphqlQuery = {
      operationName: "assetCreateds",
      query:`query assetCreateds ${AllBuildingQuery}`,
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
    }
}
export default handler