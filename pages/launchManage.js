import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

export default function LunchManage() {
  return (
    <div>
      <div>
        <div className="font-bold ml-5 mt-10">Manage your collection</div>
        <div className="flex justify-content-around">
        <div className="font-bold p-5" style={{borderRight:"1px solid"}}>
            <div className="mt-5">Edition</div>
            <div className="mt-5">Collection</div>
            <div className="mt-5">Roles</div>
            <div className="mt-5">Marketplace</div>
          </div>
          <div className=" p-5 card" style={{width:"40%",marginBottom:"0px"}}>
            <div> 1 . Grantrole</div>
            <div className="mt-3">Role</div>
            <span className="mt-2">
                <InputText id="role"  placeholder="role" type="text"style={{width:"100%"}}/>
            </span>
            <div className="mt-5">Account (address)</div>
            <div className="mt-2">
                <InputText  type="text" placeholder="Account (address)" style={{width:"100%"}}/>
            </div>
            <div className="mt-5 text-center">
                <Button label="Assign" severity="Primary" rounded />


            </div>
          </div>
          <div className=" p-5 card" style={{width:"40%"}}>
            <div> 2. Revokrole</div>
            <div className="mt-3">Role</div>
            <div className="mt-2">
                <InputText  placeholder="role" type="text"style={{width:"100%"}}/>
            </div>
            <div className="mt-5">Account (address)</div>
            <div className="mt-2">
                <InputText  type="text" placeholder="Account (address)"style={{width:"100%"}}/>
            </div>
            <div className="mt-5 text-center">
                <Button label="Revoke/remove" severity="Primary" rounded />

            </div>
          </div>
        </div>
       
          
      </div>
      </div>
  )
}
