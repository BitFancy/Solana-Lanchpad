import React, { useEffect, useState } from "react";
import accessMasterAbi from "../artifacts/contracts/accessmaster/AccessMaster.sol/AccessMaster.json";
import { InputText } from "primereact/inputtext";
import { useAccount, useEnsName } from "wagmi";
import { Button } from "primereact/button";
import Sidemenu from "./sidemenu";
import MarketplaceProfileDetails from "./marketplaceProfileDetails";
import { ethers } from "ethers";
import LayoutDashbord from "../Components/LayoutDashbord";
import { withRouter } from "next/router";
import { getAccessMasterByStorefrontID } from "../utils/util";
function AccessMasterRole(props) {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [role, setRole] = useState("");
  const [accessMasterAddress, setAccessMasterAddress] = useState("");
  const [userAdddress, setuserAdddress] = useState(
    "0x83AD8ddAdb013fbA80DE0d802FD4fB1a949AD79f"
  );

  useEffect(() => {
    getAccessMasterByStorefrontID(props.router.query.storefrontId).then(
      (response) => {
        setAccessMasterAddress(response[0]?.contractAddress);
      }
    );
  }, []);
  const revokeRoleData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const accessmasterContarct = new ethers.Contract(
      accessMasterAddress,
      accessMasterAbi.abi,
      signer
    );
    setLoading1(true);
    const revokerole = await accessmasterContarct.revokeRole(
      await accessmasterContarct.FLOW_ADMIN_ROLE(),
      address
    );
    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  };
  const grantRoleData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const accessmasterContarct = new ethers.Contract(
      accessMasterAddress,
      accessMasterAbi.abi,
      signer
    );
    setLoading(true);

    const grantrole = await accessmasterContarct.grantRole(
      await accessmasterContarct.FLOW_CREATOR_ROLE(),
      "0x83AD8ddAdb013fbA80DE0d802FD4fB1a949AD79f"
    );

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const handleInputRole = (e) => {
    setRole(e.target.value);
  };
  const handleInputAddress = (e) => {
    setuserAdddress(e.target.value);
  };

  return (
    <LayoutDashbord
      title="Access Master Role"
      description="Used to Show Access Master Role Information Details"
    >
      <div>
        <MarketplaceProfileDetails id={props.router.query.storefrontId} />

        <div className="flex justify-content-between">
          <div>
            <Sidemenu />
          </div>
          <div className="w-full">
            <div className="flex justify-content-between">
              <div style={{ width: "80%", margin: "0 auto" }}>
                <div className="font-bold text-3xl mt-5">Manage Your Role</div>
                <div className=" p-5 card card-role mt-5">
                  <div className="p-heading font-bold text-1xl">
                    1. Grantrole
                  </div>
                  <div className="mt-5 p-heading">Role</div>
                  <div className="mt-2">
                    <InputText
                      id="role"
                      value={role}
                      onChange={handleInputRole}
                      placeholder="Role"
                      type="text"
                      className="w-full"
                    />
                  </div>
                  <div className="mt-5 p-heading">Account (Address)</div>
                  <div className="mt-2">
                    <InputText
                      type="text"
                      onChange={handleInputAddress}
                      placeholder="Account (Address)"
                      value={userAdddress}
                      className="w-full"
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <Button
                      onClick={grantRoleData}
                      label="Assign"
                      severity="Primary"
                      rounded
                      loading={loading}
                      className="buy-img"
                    />
                  </div>
                </div>
                <div className=" p-5 card card-role">
                  <div className="p-heading font-bold text-1xl">
                    2. Revokrole
                  </div>
                  <div className="mt-5 p-heading">Role</div>
                  <div className="mt-2">
                    <InputText
                      placeholder="Role"
                      type="text"
                      className="w-full"
                    />
                  </div>
                  <div className="mt-5 p-heading">Account (Address)</div>
                  <div className="mt-2">
                    <InputText
                      type="text"
                      placeholder="Account (Address)"
                      value={address}
                      className="w-full"
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <Button
                      onClick={revokeRoleData}
                      label="Revoke/Remove"
                      severity="Primary"
                      rounded
                      loading={loading1}
                      className="buy-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashbord>
  );
}
export default withRouter(AccessMasterRole);
