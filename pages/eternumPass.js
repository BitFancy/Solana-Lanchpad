import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import { useRouter, withRouter } from "next/router";
import { Messages } from "primereact/messages";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import AppTopbar from "../layout/AppTopbar";
import Link from "next/link";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const EternumPass = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [platformFeeBasePrice, setplatformFeeBasePrice] = useState("");
  const [subspricePerMonth, setSubspricePerMonth] = useState("");
  const [royltybps, setRoyltybps] = useState("");
  const [selecteOperatorSubscription, setOperatorSubscription] = useState(null);
  const subscriptions = [
    { name: "YES", value: "YES" },
    { name: "NO", value: "No" },
  ];
  const [supabaseToken, setsupabaseToken] = useState();
  const msgs = useRef(null);
  const instaGenContarctData = () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    axios
      .post(
        `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
        {  contractName: "EternumPass",
        constructorParams: {
          param1: contractName,
          param2: contractSymbol,
          param3: "www.xyz.com",
          param4: salePrice,
          param5: platformFeeBasePrice,
          param6: subspricePerMonth,
          param7: royltybps,
          param8: true,
          param9: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
          param10: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
        }, network: "hardhat" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        setTimeout(() => {
          setLoading(false);
      }, 2000);
        console.log("response EternumPass data", response);
        setsupabaseToken(response.data.contractAddress);
        msgs.current.show([
          {
            sticky: true,
            severity: "success",
            detail: "Your EternumPass contract has been  successfully deployed",
            closable: true,
          },
        ]);
        router.push("/instagen");
      })

      .catch((error) => {
        console.log("err", error);
      });
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };
  const handleInputSymbol = (e) => {
    setcontractSymbol(e.target.value);
  };
  const handleInputSalePrice = (e) => {
    setSalePrice(e.target.value);
  };

  const handleInputPlatformFee = (e) => {
    setplatformFeeBasePrice(e.target.value);
  };
  const handleInputSubscriptionPrice = (e) => {
    setSubspricePerMonth(e.target.value);
  };

  const handleInputRoyelty = (e) => {
    setRoyltybps(e.target.value);
  };

  return (
    <div
      title="Deploy InstaGen"
      description="This is use to show information of the deploy InstaGen contract"
      className="back-img-eternumpass"
    >
      <AppTopbar/>
      <div style={{ marginTop: "85px" }}>
        <div className="p-5 font-bold text-align-center text-center" style={{ borderBottom: "2px solid" }}>Deploy EternumPass</div>

        <div className="flex justify-content-center gap-5 mt-5">
          <div className="card" style={{ width: "50%" }}>
            <div className="text-center mt-5">
              <div className="text-left">Enter EternumPass Name</div>
              <div className="mt-3">
                <InputText
                  value={contractName}
                  onChange={handleInputName}
                  className="p-2 w-full input-back"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">Enter EternumPass Symbol</div>
              <div className="mt-2">
                <InputText
                  value={contractSymbol}
                  onChange={handleInputSymbol}
                  className="p-2 w-full input-back"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">Enter Public SalePrice</div>
              <div className="mt-2">
                <InputText
                  value={salePrice}
                  onChange={handleInputSalePrice}
                  className="p-2 w-full input-back"
                  type="number"
                />
              </div>
              <div className="mt-3 text-left">
                Enter Platform Fee BasisPoint
              </div>
              <div className="mt-2">
                <InputText
                  value={platformFeeBasePrice}
                  onChange={handleInputPlatformFee}
                  className="p-2 w-full input-back"
                  type="number"
                />
              </div>
              <div className="mt-3 text-left">
                Enter Subscription Price Per Month
              </div>
              <div className="mt-2">
                <InputText
                  value={subspricePerMonth}
                  onChange={handleInputSubscriptionPrice}
                  className="p-2 w-full input-back"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">Enter Royalty BPS</div>
              <div className="mt-2">
                <InputText
                  value={royltybps}
                  onChange={handleInputRoyelty}
                  className="p-2 w-full input-back"
                  type="text"
                />
              </div>
              <div className="mt-3 text-left">Enter Operator Suscription</div>
              <div className="mt-2">
                <Dropdown
                  value={selecteOperatorSubscription}
                  onChange={(e) => setOperatorSubscription(e.value)}
                  options={subscriptions}
                  optionLabel="name"
                  placeholder="Select a Operator Suscription "
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-content-between mt-5">
              <div>
              <Button
                onClick={instaGenContarctData}
                label="Deploy EternumPass"
                severity="Primary"
                rounded
                loading={loading}
              />
              </div>
              <div>
                <Link href='/markeplaceDetailsForm'>
              <Button
                label="Continue"
                severity="Primary"
                rounded
                loading={loading}
              />
              </Link>
              </div>
             
            </div>
            <Messages ref={msgs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EternumPass);
