import Link from "next/link";
import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import AppTopbar from "../layout/AppTopbar";
import { LayoutContext } from "../layout/context/layoutcontext";
import { withRouter } from "next/router";
function SuccessNoteContract(props) {
  const { layoutConfig } = useContext(LayoutContext);
  const [graphqlURL, setGraphqlURL] = useState("")
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>",props.router.query.redirectURL);
    setGraphqlURL(props.router.query.redirectURL);
    localStorage.setItem('activeGraphQLURL',props.router.query.redirectURL)
  }, [props.router.query.redirectURL]);
  return (
    <div>
      <AppTopbar />
      <div
        className={`${
          layoutConfig.colorScheme === "light" ? "back-img-sig" : "dark"
        } text-center text-3xl`}
        style={{ marginTop: "100px" }}
      >
        <div className="font-bold">Congratulations</div>
        <div className="mt-3">
          your Storefront has been successfully Settled!
        </div>
        <div style={{ marginTop: "35px" }}>
          <Link href="/storefrontDashboard">
            <Button className="buy-img" rounded>
              Manage StoreFront
            </Button>
          </Link>
        </div>
        <div className="mt-3 p-heading">
          <Link href="/getAllSignatureseriesContract">
            <Button
              className="buy-img"
              rounded
              style={{ border: "1px solid white" }}
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
        <div className="mt-3 p-heading">
          <a target="_blank" href={graphqlURL}>
            <Button
              className="buy-img"
              rounded
              style={{ border: "1px solid white" }}
            >
             Redirect to graphql
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SuccessNoteContract)