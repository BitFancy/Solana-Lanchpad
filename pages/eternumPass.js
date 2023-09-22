import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useContext } from "react";
import { withRouter } from "next/router";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import Link from "next/link";
import Layout2 from "../Components/Layout2";
import { LayoutContext } from "../layout/context/layoutcontext";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
const EternumPass = (props) => {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [contractName, setContractName] = useState("");
  const [contractSymbol, setcontractSymbol] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [platformFeeBasePrice, setplatformFeeBasePrice] = useState("");
  const [subspricePerMonth, setSubspricePerMonth] = useState("");
  const [royltybps, setRoyltybps] = useState("");
  const { layoutConfig } = useContext(LayoutContext);
  const [errors, setErros] = useState({
    contractNameError: "",
    contractSymbolError: "",
    salePriceError: "",
    platformFeeBasePriceError: "",
    subspricePerMonthError: "",
    royltybpsError: "",
  });
  const [selecteBlockchaine, setselectedBlockchaine] = useState(null);
  const blockchain = [
    { name: "Polygon", value: "Polygon" },
    { name: "Ethereum", value: "Ethereum" },
  ];
   
  const [submitClicked, setSubmitClicked] = useState(false);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Your Eternumpass contract has been  successfully deployed",
      life: 10000,
    });
  };
 
  const [eturnumpassResponse, setEturnumpassResponse] = useState();
  const eturnumpassContarctData = () => {
    const token = localStorage.getItem("platform_token");
    const tradhubAddress = props.router.query.tradhubAddress;
        const accessmasterAddress = props.router.query.accessmasterAddress;
    const valid = onClickButton();
    if (valid) {
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
          {
            contractName: "EternumPass",
            constructorParams: {
              param1: contractName,
              param2: contractSymbol,
              param3: "www.xyz.com",
              param4: salePrice,
              param5: platformFeeBasePrice,
              param6: subspricePerMonth,
              param7: royltybps,
              param9: accessmasterAddress,
              param10: tradhubAddress,
            },
            network: "maticmum",
            storefrontId: props.router.query.storefrontId,
            collectionName:contractName

          },
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
          setEturnumpassResponse(response.data.contractAddress);
          showSuccess();
        })

        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false);
        });
    }
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

  const load = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
    }, 2000);
  };
  const load4 = () => {
    setLoading4(true);

    setTimeout(() => {
      setLoading4(false);
    }, 2000);
  };
  const load3 = () => {
    setLoading3(true);

    setTimeout(() => {
      setLoading3(false);
    }, 2000);
  };
  const onClickButton = () => {
    if (!contractName) {
      setErros({ contractNameError: "Please Enter Contarct Name" });
      return false;
    } else if (!contractSymbol) {
      setErros({ contractSymbolError: "Please Enter Symbol description" });
      return false;
    } else if (!salePrice) {
      setErros({ salePriceError: "Please Enter Sale Price" });
      return false;
    } else if (!platformFeeBasePrice) {
      setErros({
        platformFeeBasePriceError: "Please Enter Platform Fee Price",
      });
      return false;
    } else if (!subspricePerMonth) {
      setErros({
        subspricePerMonthError: "Please Enter Subscription Per Months Price",
      });
      return false;
    } else if (!royltybps) {
      setErros({ royltybpsError: "Please Enter Roylty BPS" });
      return false;
    } else if (
      contractName &&
      contractSymbol &&
      salePrice &&
      platformFeeBasePrice &&
      subspricePerMonth &&
      royltybps
    ) {
      setSubmitClicked(true);
      setLoading(true);
      return true;
    }
  };

  return (
    <Layout2  title="Deploy Eternumpass"
    description="This is use to show information of the deploy Eternumpass contract">
    <div
     className={`${layoutConfig.colorScheme === 'light' ? 'buy-back-image' : 'dark'}`}
    >
     
      <Toast ref={toast} />

      <div >
        <div className="flex justify-content-between p-3" style={{ borderBottom: "2px solid" }}>
          <div
            className=" p-5 font-bold text-center p-heading"
            
          >
           Step 2 : Deploy EternumPass
          </div>
          <div className="mt-5">
          <Dropdown
                value={selecteBlockchaine}
                onChange={(e) => setselectedBlockchaine(e.value)}
                options={blockchain}
                optionLabel="name"
                placeholder="Chains "
                className="w-full font-bold"
                style={{borderRadius:'20px'}}
              />
              {/* <span className="blockchain-label">{storefrontData?.blockchain}</span> */}

          </div>
          </div>

        <div className="flex justify-content-center gap-5 mt-5">
          <div className="back-color p-5 buy-img" style={{ width: "50%" }}>
            <div className="p-heading">Enter EternumPass Name</div>
            <div className="mt-3">
              <InputText
                className="p-2 input-back w-full "
                onChange={handleInputName}
                value={contractName}
              />
              <p className="text-left text-red-600 mt-2" >
                {!contractName ? errors.contractNameError : ""}
              </p>
            </div>

            <div className="mt-5 p-heading">Enter EternumPass Symbol</div>

            <div className="  mt-3">
              <InputText
                className="p-2  input-back w-full "
                value={contractSymbol}
                onChange={handleInputSymbol}
              />
              <p className="text-left text-red-600 mt-2">
                {!contractSymbol ? errors.contractSymbolError : ""}
              </p>
            </div>

            <div className="mt-5 p-heading">Enter Public SalePrice</div>

            <div className="  mt-3">
              <InputText
                className="p-2  input-back w-full "
                value={salePrice}
                onChange={handleInputSalePrice}
              />
              <p className="text-left text-red-600 mt-2" >
                {!salePrice ? errors.salePriceError : ""}
              </p>
            </div>

            <div className="mt-5">Enter Platform Fees Base Price</div>

            <div className=" mt-3">
              <InputText
                value={platformFeeBasePrice}
                onChange={handleInputPlatformFee}
                className="p-2 input-back w-full "
              />
              <p className="text-left text-red-600 mt-2" style={{ textAlign: "left", color: "red" }}>
                {!platformFeeBasePrice ? errors.platformFeeBasePriceError : ""}
              </p>
            </div>
            <div className="mt-5 p-heading">Enter Subscription Price Per month</div>

            <div className=" mt-3">
              <InputText
                value={subspricePerMonth}
                onChange={handleInputSubscriptionPrice}
                className="p-2  input-back w-full "
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!subspricePerMonth ? errors.subspricePerMonthError : ""}
              </p>
            </div>

            <div className="mt-5 p-heading">Enter Royalty BPS</div>

            <div className=" mt-3">
              <InputText
                value={royltybps}
                onChange={handleInputRoyelty}
                className="p-2 input-back w-full"
              />
              <p style={{ textAlign: "left", color: "red" }}>
                {!royltybps ? errors.royltybpsError : ""}
              </p>
            </div>

           

            <div className="flex mt-5 justify-content-between">
              <div>
                <Button
                  label="Deploy EternumPass"
                  onClick={eturnumpassContarctData}
                  severity="Primary"
                  className=" mt-7 w-full buy-img"
                  style={{ width: "30%" }}
                  rounded
                  type="submit"
                  loading={loading}
                />
              </div>
              {eturnumpassResponse && (
                <div>
                  <Link href="/eturnalsol">
                    <Button
                      label="Continue"
                      severity="Primary"
                      className=" mt-7 w-full buy-img"
                      style={{ width: "30%" }}
                      rounded
                      loading={loading2}
                      onClick={load}
                    />
                  </Link>
                </div>
              )}
            </div>
           
          </div>
         
         
        </div>
        <div className="flex justify-content-center mt-5" style={{gap:'445px'}}>
              <div className="text-center mt-5">
                <Link 
                
                href={{
                  pathname: "/launchSignatureseries",
                  query: { storefrontId: props?.router?.query?.storefrontId},
                }}>
                  <Button
                    label="Back"
                    severity="Primary"
                    rounded
                    loading={loading3}
                    onClick={load3}
                    className=" buy-img"
                    style={{padding:'10px 60px 10px 60px'}}
                  />
                </Link>
              </div>
              <div className="text-center mt-5">
                <Link 
                  href={{
                    pathname: "/webappForm",
                    query: { storefrontId: props?.router?.query?.storefrontId},
                  }}
                >
                  <Button
                    label="Next"
                    severity="Primary"
                    rounded
                    loading={loading4}
                    onClick={load4}
                    className=" buy-img"
                    style={{padding:'10px 60px 10px 60px'}}
                  />
                </Link>
              </div>
            </div>
      </div>
    </div>
    </Layout2>
  );
};

export default withRouter(EternumPass);
