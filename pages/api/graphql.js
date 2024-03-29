import { request, gql } from "graphql-request";

// pages/api/graphql.js
import axios from "axios";

export default async function handler(req, res) {
  //   const { subgraphUrl } = req.query;
  const endPoint =
    "https://mumbai.testgraph.myriadflow.com/subgraphs/name/v1/u123/graphql";
  const headers = {
    "Content-Type": "application/json",
  };

  const AllBuildingQuery = `{
    assetIssueds(orderBy: id) {
        id
        tokenID
        creator
        blockNumber
        blockTimestamp
        metaDataURI
      }
    }`;

  const graphqlQuery = {
    operationName: "assetIssueds",
    query: `query assetIssueds ${AllBuildingQuery}`,
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
