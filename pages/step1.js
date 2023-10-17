import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useContext, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import axios from "axios";
import { Toast } from "primereact/toast";
import Link from "next/link";
import Layout2 from "../Components/Layout2";
import { LayoutContext } from "../layout/context/layoutcontext";
import { Dialog } from "primereact/dialog";
import { getAccessMasterByStorefrontID } from "../utils/util";
const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
function Step1(props) {
  const [loading, setLoading] = useState(false);
  const [platformFee, setPlatformfee] = useState();
  const [contractName, setContractName] = useState("");
  const [tradhubResponse, settradhubResponse] = useState();
  const { layoutConfig } = useContext(LayoutContext);
  const [visible, setVisible] = useState(false);
  const [accessMasterAddress, setaccessMasterAddress] = useState('');

  const [errors, setErros] = useState({
    platformFeeErrors: "",
    contractNameEror: "",
  });
  const router = useRouter();
  useEffect(() => {
    getAccessMasterByStorefrontID(props.router.query.storefrontId).then((response)=>{
      setaccessMasterAddress(response[0]?.contractAddress);
    })
  },[]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const toast = useRef(null);
  const getAllContarctData = async () => {
    const token = localStorage.getItem("platform_token");
    const { data } = await axios.get(
      `${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  };

  const tradHubContarctData = async () => {

    const token = localStorage.getItem("platform_token");    
    const valid = onClickButton();
    if (valid) {
      const getcontractName = await getAllContarctData();
      if (
        getcontractName?.find(
          (cn) =>
            cn.collectionName?.toLowerCase() === contractName?.toLowerCase()
        )
      ) {
        const showSuccessPro = () => {
          toast.current.show({
            severity: "warn",
            detail:  `Contract name' ${contractName}' is already exist please Enter another name`,
            life: 10000,
          });
        };
       showSuccessPro();
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        return;
      }
      axios
        .post(
          `${BASE_URL_LAUNCH}api/v1.0/launchpad/contract`,
          {
            contractName: "TradeHub",
            constructorParams: {
              param1: platformFee,
              param2: contractName,
              param3: accessMasterAddress,
            },
            network: "maticmum",
            storefrontId: props?.router?.query?.storefrontId,
            collectionName: contractName,
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
            setVisible(true);
          }, 2000);
          settradhubResponse(response.data.contractAddress);
          router.push({
            pathname: "/launchSignatureseries",
            query: { storefrontId: props?.router?.query?.storefrontId},
          });
        })
        .catch(() => {
          const showError = () => {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail:`Tradhub with id ${props?.router?.query?.storefrontId}'  is already exist Please continue to deploy Next contract`,
              life: 2000,
            });
          };
          showError();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleInputFee = (e) => {
    setPlatformfee(e.target.value);
  };
  const handleInputName = (e) => {
    setContractName(e.target.value);
  };

  const onClickButton = () => {
    if (!platformFee) {
      setErros({ platformFeeErrors: "Please Enter Platform Fees" });
      return false;
    } else if (!contractName) {
      setErros({ contractNameEror: "Please Enter Contarct Name" });
      return false;
    } else if (platformFee && contractName) {
      setSubmitClicked(true);
      setLoading(true);
      return true;
    }
  };
  return (
    <Layout2 title="Tradhub Setup" description="First Deploy Tradhub">
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        style={{ width: "30vw", height: "18vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="text-center">
        <div className="font-bold text-2xl">Congrats!</div>
        <div className="mt-5 text-xl">
          Your Tradhub Contract has been sucessfully 
          <div className="text-xl mt-2">Deployed</div>
        </div>
        </div>
       
      </Dialog>
      <div
      
      >
        <div>
          <div className="font-bold p-3 mb-5 text-3xl text-black ml-5 p-heading p-5">
            Step1: Setup TradeHub
          </div>
          <div className="border-bottom-das"></div>

          <div
            className={`${layoutConfig.colorScheme === 'light' ? 'back-color' : 'back-color-black' }  p-5 mt-5`} 
            style={{ width: "60%", margin: "0 auto", height: "350px" }}
          >
            <div className="flex justify-content-between">
              <div style={{ width: "45%" }}>
                <div className=" p-heading">Enter TradeHub Name</div>
                <div className="mt-2">
                  <InputText
                    value={contractName}
                    className="p-2 mt-2 input-back w-full"
                    onChange={handleInputName}
                  />

                  <p style={{ textAlign: "left", color: "red" }}>
                    {!contractName ? errors.contractNameEror : ""}
                  </p>
                </div>
              </div>

              <div style={{ width: "45%" }}>
                <div className="p-heading">Enter TradeHub Fees</div>
                <div className="mt-2">
                  <InputText
                    type="number"
                    className="p-2 mt-2 input-back  w-full"
                    value={platformFee}
                    onChange={handleInputFee}
                  />

                  <p style={{ textAlign: "left", color: "red" }}>
                    {!platformFee ? errors.platformFeeErrors : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                label="Deploy Tradhub"
                onClick={tradHubContarctData}
                severity="Primary"
                className=" mt-7  buy-img deploy-tradhub-conttract"
                style={{ width: "30%" }}
                rounded
                loading={loading}
              />
            </div>
            <div className="flex mt-5 justify-content-between"></div>
          </div>


          <Link 
              href={{
                pathname: "/launchSignatureseries",
                query: { storefrontId: props?.router?.query?.storefrontId },
              }}
          >
            <div className="mt-5 text-center">
              <Button label="Continue"></Button>
            </div>
          </Link>
        </div>
      </div>
    </Layout2>
  );
}
export default withRouter(Step1);
